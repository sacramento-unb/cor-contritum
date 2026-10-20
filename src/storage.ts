import type { Session } from './types'

const DB_NAME = 'cor-contritum-local'
const STORE = 'sessions'

const openDb = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, 1)
  request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' })
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

const bytesToBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))
const base64ToBytes = (value: string) => Uint8Array.from(atob(value), char => char.charCodeAt(0))

export async function saveEncrypted(session: Session, password: string) {
  if (password.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.')
  if (!crypto.subtle) throw new Error('O salvamento criptografado exige HTTPS ou acesso por localhost. Use o modo temporário neste endereço.')
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(session)))
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({ id: session.id, salt: bytesToBase64(salt), iv: bytesToBase64(iv), data: bytesToBase64(new Uint8Array(encrypted)), updatedAt: session.updatedAt })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function loadEncrypted(id: string, password: string): Promise<Session> {
  const db = await openDb()
  const record = await new Promise<any>((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).get(id)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  if (!record) throw new Error('Nenhum exame salvo foi encontrado.')
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: base64ToBytes(record.salt), iterations: 250000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
  try {
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToBytes(record.iv) }, key, base64ToBytes(record.data))
    return JSON.parse(new TextDecoder().decode(plain)) as Session
  } catch {
    throw new Error('Não foi possível abrir o exame. Verifique a senha.')
  }
}

export async function listSaved() {
  const db = await openDb()
  return new Promise<{ id: string; updatedAt: string }[]>((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).getAll()
    request.onsuccess = () => resolve(request.result.map(({ id, updatedAt }) => ({ id, updatedAt })))
    request.onerror = () => reject(request.error)
  })
}

export async function deleteAllSaved() {
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
