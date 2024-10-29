# Prometheus Business Copilot Interface - Arquitetura 🏛️

## Visão Geral 🗺️

Este documento descreve a arquitetura do Prometheus Business Copilot Interface, focando nos principais componentes e suas interações. A aplicação utiliza uma arquitetura de componentes baseada em React ⚛️, com gerenciamento de estado utilizando Zustand 🔄 e hooks customizados 🎣.  O objetivo é fornecer uma visão detalhada da estrutura do sistema, facilitando a compreensão e manutenção do código.

## Componentes Principais 🧱

- **`App.tsx`**: 👑 O componente principal, o rei do reino! Coordena todos os outros componentes e é responsável pela renderização da interface principal. Inclui o cabeçalho HeaderComponent, o rodapé FooterComponent, a lista de conversas ChatListComponent, a entrada de texto ChatInputComponent e o gerenciamento de temas.  Ele é o maestro da orquestra, garantindo a harmonia entre todos os elementos.

- **`useChat.ts`**: 🗣️ Este hook customizado é o coração da comunicação com a API de IA. Ele envia mensagens 🚀, recebe respostas 💬 e gerencia o estado de processamento 🔄, garantindo uma experiência fluida e eficiente.

- **`useChatStore.ts`**: 🗄️  O guardião do estado das sessões de chat!  Utilizando Zustand, ele permite adicionar ➕, remover ➖, renomear ✏️ e limpar 🧹 sessões de chat, mantendo tudo organizado e sob controle.

- **`api.ts`**: 🌐 O elo de ligação com a API de IA.  Abstrai a lógica de requisições HTTP ➡️ e tratamento de erros 🚫, garantindo uma comunicação robusta e confiável.

- **Componentes UI**: ✨ Os blocos de construção da interface do usuário!  Cada um desempenha um papel crucial na experiência do usuário:

    - `Header`: ⬆️ O topo da aplicação, com opções de tema ☀️/🌙 e exportação ⬇️.
    - `Footer`: ⬇️ A base da aplicação, com informações de copyright ©.
    - `ChatInput`: ⌨️ A entrada de texto para enviar mensagens.
    - `ChatMessage`: 💬  Renderiza cada mensagem individualmente.
    - `EmptyState`: 😴  Exibe uma mensagem quando não há mensagens.
    - `Modal`: 🪟 Um componente modal genérico para exibir informações adicionais.
    - `ComingSoonModal`: ⏳ Um modal específico para funcionalidades em desenvolvimento.
    - `FloatingChatList`: 🎈 Uma lista flutuante de sessões de chat.
    - `FloatingNewChat`: ➕ Um botão flutuante para iniciar uma nova conversa.
    - `Sidebar`: ☰ Barra lateral (futura implementação).


## Diagrama de Componentes 📊

```
                                    +-----------------+
                                    |       App       |👑
                                    +--------+--------+
                                            |
                                            |
                    +---------------------+---------------------+
                    |                     |                     |
          +---------+---------+     +---------+---------+     +---------+---------+
          |     Header      |⬆️    | ChatInput       |⌨️    |    Footer      |⬇️
          +---------+---------+     +---------+---------+     +---------+---------+
                    |                     |
                    |                     |
                    +---------------------+---------------------+
                                            |
                                            |
                                    +---------+---------+
                                    | ChatMessage     |💬
                                    +---------+---------+
                                            |
                                            |
                                    +---------+---------+
                                    |   EmptyState    |😴
                                    +---------+---------+

```

## Fluxos de Dados ➡️

O fluxo de dados principal segue o padrão unidirecional, com o `App` como componente raiz, gerenciando o estado através do `useChatStore` 🔄 e `useChat` 🗣️.  As mudanças de estado são propagadas para os componentes filhos através de props.  Isso garante uma atualização eficiente e previsível da interface.  Imagine um rio 🌊 fluindo suavemente, levando informações de um componente para outro.

**Exemplo:** Quando o usuário envia uma mensagem através do `ChatInput`, o estado é atualizado no `useChatStore`, que notifica o `App`, que por sua vez atualiza o `ChatList` para exibir a nova mensagem.

## Tecnologias 🛠️

- **React 18**: ⚛️ Framework JavaScript para construção de interfaces de usuário.
- **TypeScript**: 🇹ypescript para tipagem estática e segurança.
- **Tailwind CSS**: 🎨 Framework CSS utilitário para estilização rápida e eficiente.
- **Zustand**: 🔄 Biblioteca de gerenciamento de estado simples e eficiente.
- **Framer Motion**: ✨ Biblioteca para criação de animações suaves e interações.


[Assinado]
Elias Andrade
Arquiteto de Produto
29/10/2024 07:42
v0.0.2 Replika AI Solutions - Prometheus Business Copilot Interface Beta MVP
Maringá, Paraná - estamos na versao v 0.0.2
