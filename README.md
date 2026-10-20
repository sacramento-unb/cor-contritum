# Cor Contritum

PWA local-first para preparação pessoal ao Sacramento da Reconciliação. O projeto é um instrumento de exame de consciência e não substitui a confissão, o sacerdote ou a direção espiritual.

## Executar localmente

```bash
npm install
npm run dev
```

Para validar a entrega:

```bash
npm run build
npm test
npm run lint
npm run preview
```

O `dist/` gerado pode ser hospedado como site estático. O service worker faz cache progressivo dos recursos carregados, permitindo a continuidade offline após o primeiro carregamento.

## Docker

A configuração usa Nginx para servir o build estático. A porta externa `8081` foi escolhida porque não estava ocupada pelos containers ou serviços verificados durante a configuração.

```bash
docker compose up -d --build
```

A aplicação ficará disponível em [http://localhost:8081](http://localhost:8081). Para encerrar somente este serviço:

```bash
docker compose down
```

## Arquitetura

- `src/data.ts`: catálogo doutrinário e regras determinísticas de adaptação por modalidade e contexto; cada pergunta possui identificador e referência.
- `src/types.ts`: entidades da sessão, respostas e catálogo.
- `src/App.tsx`: fluxo visual completo: acolhimento, contexto, oração, Mandamentos, exame complementar, discernimento, revisão, contrição, guia e roteiro.
- `src/storage.ts`: persistência opcional em IndexedDB. A sessão é serializada e protegida com PBKDF2 + AES-256-GCM usando `crypto.subtle`; salt e nonce são aleatórios, e a senha/chave não são persistidos.
- `public/sw.js`: cache offline progressivo.

## Privacidade

O modo temporário é o padrão e mantém respostas somente na memória da aba. Nenhum backend, cadastro, analytics, telemetria de conteúdo ou integração externa é usado. O modo salvo é explicitamente opt-in e exige uma senha que não pode ser recuperada pela aplicação. O botão de exclusão limpa o IndexedDB deste navegador, sem alegar remover eventuais backups do dispositivo.

O roteiro é renderizado localmente e a impressão/exportação é uma ação manual do usuário. O navegador pode oferecer seus próprios mecanismos de impressão; o conteúdo não é enviado a servidores pelo aplicativo.

## Fontes doutrinárias

As referências exibidas na aplicação apontam para o Catecismo da Igreja Católica e o Código de Direito Canônico no Vatican.va. A interface também distingue orientação pastoral e funcionalidade pedagógica da doutrina oficial, e não faz classificação automática de pecado mortal, estado de graça ou validade da confissão.
