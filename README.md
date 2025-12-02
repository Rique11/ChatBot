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
- Habilitar a **Cloud API** 
- Criar **Message Templates** (mensagens proativas de boas-vindas ou avisos) (Não Obrigatorio).  

#### Criando conta no Wpp Business
- Acessar https://developers.facebook.com/
- Criar conta de desenvolvedor 
- Criar App do WhatsApp Bussiness 
- Gerar Token de API 

##### Configurando números 

- Na dashboard do Wpp Bussiness inserir o numero para enviar e mensagem Hello Word (Apenas assim o numero +55 sera liberado para receber msg do número de teste)

##### Configurando Webhook 
```js
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  logger.debug(`Recebido GET /webhook com mode: ${mode}, token: ${token}, challenge: ${challenge}`);
  logger.debug(`VERIFY_TOKEN esperado: ${VERIFY_TOKEN}`);
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      logger.info("WEBHOOK VALIDADO COM SUCESSO!");
      res.status(200).send(challenge);
    } else {
      logger.warn("TOKEN INVÁLIDO"); 
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});
```
- O Webhook Get será o que vai configurar e estabelecer a comunicação com o Wpp, esse VERIFY_TOKEN é uma chave criada que deve estar no env e deve ser inserida na hora de colocar a URL do webhook na dashboard do Wpp Bussiness

```js
app.post("/webhook", escutaMensagem);
```
- A rota webhook Post é a que recebe as mensagens que são enviadas ao número de teste (ou Cadastrado oficial) e que faz a analise para ver qual a resposta que se encaixa ao contexto. 

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

## Implementado

1. Conta + Telefone de teste da Meta criados

2. Webhooks configurados rodando em maquina local (ngrok)

3. Fluxo de mensagens + respostas baseadas na interação do usuario

4. Controle de middleware com chaves aleatorias e configuradas na dashboard da Meta API

5. Feature de logs personalizados e com controle com variavel de ambiente (TESTE_MODE) 

##  Proximos passos 

 - Criar Dockerfile para conseguir compor 3 diferentes numeros 

 - Conteudo melhor de mensagens com informações a serem passadas pela direção 

 - Controle de respostas duplicadas por chamadas atrasadas no servidor

 - Testar em ambiente de produção, como rerender, vercel, etc. 










