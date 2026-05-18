# 📱 IBCaminho App

Aplicativo mobile da Igreja Batista do Caminho, desenvolvido para aproximar a comunidade, facilitar o acesso a conteúdos e fortalecer a vida em comunhão.

---

## ✨ Sobre o projeto

O app foi criado com foco em **simplicidade, acolhimento e autonomia**, permitindo que membros da igreja:

- 📅 acompanhem eventos
- 🙏 enviem pedidos de oração
- 🎧 acessem conteúdos e playlists
- 📺 assistam cultos
- 👤 gerenciem seu perfil

---

## 🚀 Tecnologias

- React Native (Expo)
- Expo Router
- Supabase (Auth + Database)
- Sanity (CMS)
- TypeScript

---

## 📱 Funcionalidades

### 🔐 Autenticação
- Cadastro de usuário
- Login com e-mail e senha
- Sessão persistente

### 👤 Perfil
- Visualização de dados
- Edição de nome e telefone
- Logout

### 🙏 Oração
- Envio de pedidos de oração
- Opção de envio anônimo
- Histórico de pedidos

### 📅 Conteúdo dinâmico
- Eventos da igreja (via CMS)
- Palavra da semana
- Informações institucionais

### 🎧 Integrações
- Playlist do Spotify
- Vídeos do YouTube

---

## 🧱 Estrutura

O projeto é organizado com **Expo Router**, separando rotas, componentes reutilizáveis, contextos e integrações externas.

- `app/` — telas e rotas do aplicativo
- `src/components/` — componentes reutilizáveis de UI
- `src/contexts/` — contextos globais, como autenticação
- `src/services/` — integrações com Supabase, Sanity, Spotify e YouTube

---

## ⚙️ Rodando localmente

```bash
npm install
npx expo start
```
---

## 🌐 Variáveis de ambiente
Crie um .env com:

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_SANITY_PROJECT_ID=
EXPO_PUBLIC_SANITY_DATASET=
```
---

## 🌍 Deploy Web
Para gerar versão web:

```bash
npx expo export -p web
```
Deploy recomendado via Vercel.

---

## 💛 Propósito

Este projeto foi desenvolvido como uma forma de servir a igreja, criando uma experiência digital acessível, bonita e funcional para todos os membros.

## 🚀 Próximos passos
- Notificações push

- Upload de foto de perfil

- Confirmação de presença em eventos

- Publicação nas lojas (App Store / Play Store)

## 🤝 Contribuição
Projeto privado / institucional. Para contribuições, entre em contato com o responsável pelo desenvolvimento.