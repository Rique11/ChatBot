#  Chatbot WhatsApp para Atendimento de Calouros

Este projeto tem como objetivo criar um **chatbot no WhatsApp**, utilizando a **API oficial do WhatsApp Business (Meta)**, para entrar em contato com alunos aprovados na faculdade e responder dúvidas relacionadas ao processo de matrícula.

---

## Objetivo
- Automatizar a comunicação com alunos recém-aprovados.  
- Reduzir a sobrecarga da secretaria da instituição.  
- Oferecer respostas rápidas sobre **documentos, prazos, locais e procedimentos**.  
- Encaminhar casos complexos para **atendentes humanos**.  

---

##  Estrutura do Projeto

### 1. Conta WhatsApp Business API
- Criar e configurar número comercial no **Meta Business Manager**.  
- Habilitar a **Cloud API** ou **On-Premise API**.  
- Criar **Message Templates** (mensagens proativas de boas-vindas ou avisos).  

### 2. Backend (Servidor de Aplicação)
- Desenvolvido em **Node.js (Express ou NestJS)**.  
- Funções principais:
  - Receber mensagens via **Webhook**.  
  - Processar e decidir a resposta com base no fluxo do bot.  
  - Enviar mensagens para os alunos (textos, botões, listas, mídia).  
  - Disparar mensagens proativas (parabéns pela aprovação, lembrete de matrícula).  

### 3. Banco de Dados
- Guardar informações como:
  - Nome e curso do aluno.  
  - Status de matrícula.  
  - Histórico de interações.  
- Sugestões: **PostgreSQL** (relatórios) ou **MongoDB** (flexível).  

### 4. Fluxo do Chatbot
- **Mensagem inicial (template aprovado):**  
  “🎉 Parabéns pela aprovação na UTFPR! Está pronto para iniciar sua matrícula?”  

- **Opções interativas:**  
  - 📑 Documentos necessários  
  - 📍 Local de matrícula  
  - 📆 Datas importantes  
  - 👩‍💻 Falar com atendente  

- **Encaminhamento para humano:**  
  - Quando a dúvida for mais complexa, o bot transfere para a secretaria.  

### 5. Integração com Atendimento Humano
- Possibilidades:
  - WhatsApp Business Inbox.  
  - Zendesk ou outro CRM.  
  - Painel web próprio.  

---

## Fluxo Técnico
```
Aluno no WhatsApp
       |
       v
WhatsApp Business API (Meta)
       |
       v
Servidor Backend (Node.js)
   |                |
   v                v
Banco de Dados   Chatbot: Respostas Automáticas
                      |
                      v
              Atendente Humano (se necessário)
```

