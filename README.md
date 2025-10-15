# blog-app

Bem-vindo ao repositório `blog-app`.

Este projeto é um aplicativo móvel criado com Expo + React Native e usa o roteamento baseado em arquivos (expo-router).

## Visão geral

- Backend (API): o app espera um backend rodando em `http://<host>:3000` com os endpoints usados no projeto. Exemplos:
  - `GET /posts` — lista de postagens
  - `GET /posts/search?q=...` — busca por termo
  - `GET /posts/:id` — (opcional) detalhamento por id
- Frontend: app Expo com rotas em `app/(tabs)` e `app/(postagem)`.

## Instalação (desenvolvimento)

1. Instale dependências:

```bash
npm install
```

2. Inicie o projeto (Expo):

```bash
npm run start
# ou
npm run android
# ou
npm run ios
```

No terminal do Expo você verá opções para abrir no emulador Android, iOS ou no Expo Go.

### Observação sobre `localhost` / emulador

- Android emulator (Android Studio): use `10.0.2.2` para alcançar o `localhost` da sua máquina. O app já detecta isso automaticamente (em `app/(tabs)/index.tsx`).
- iOS simulator e web: `localhost` normalmente funciona.
- Dispositivo físico: substitua `localhost` pelo IP da sua máquina (por exemplo `http://192.168.1.10:3000`) ou use o túnel do Expo.

## Como usar

- Tela inicial: `app/(tabs)/index.tsx` — lista de postagens. Use o campo "Buscar postagens" para pesquisar (chama `/posts/search?q=...`).
- Detalhes: ao tocar numa postagem, o app navega para `/(postagem)/[id]` e mostra o conteúdo detalhado.

## Estrutura principal

- `app/(tabs)` — rotas das abas (Home, Carrinho, Notificações, Perfil)
- `app/(postagem)` — rotas de postagem (detalhes)
- `components/` — componentes compartilhados
- `assets/` — imagens e ícones

## Desenvolvimento e verificações

- Lint: `npm run lint` (usando ESLint configurado pelo Expo)
- Para testes manuais no dispositivo, lembre-se de ajustar o host da API se necessário.

## Boas práticas antes de PR

- Rode `npm install` e certifique-se que o app inicializa no emulador.
- Verifique endpoints do backend e teste listagem/busca/detalhes.

## Suporte

Se precisar de ajuda com configuração de backend, rede (localhost vs device) ou quiser que eu adicione CI/linters, me diga e eu configuro.

---

Commitado e pronto para desenvolvimento.
