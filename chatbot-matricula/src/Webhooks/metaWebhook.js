import axios from "axios";
 import dotenv from "dotenv";
 import { MENSAGENS } from "../Mensagens/mensagens.js";
 import { createTaggedLogger } from "../Utils/logger.js";
 import { decideProximaMensagem } from "../Mensagens/mensagensController.js";
 dotenv.config();
 const logger = createTaggedLogger('metaWebhook.js');
 const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const metaWebhook = ((req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VALIDADO COM SUCESSO!");
      res.status(200).send(challenge);
    } else {
      console.log("TOKEN INVÁLIDO");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

export const escutaMensagem = (async (req, res) => {
  //logger.debug(`Recebido POST /webhook com body: ${JSON.stringify(req.body)}`);
  const body = req.body;

  if (body.object) {
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body;
    logger.debug(`Mensagem recebida de ${from}: ${text}`);

    if (text != undefined) {
      const proxMsg = decideProximaMensagem(text);
      logger.debug(`Próxima mensagem decidida: ${proxMsg}`);
      logger.debug(`Mensagem recebida: ${text}`);
      try {
        logger.debug(`Mensagem enviada: ${MENSAGENS.SAUDACAO_INICIAL}`);
      // Exemplo de resposta automática
      await axios.post(
        `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          type: "text",
          text: { body: proxMsg}
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      logger.info(`Resposta enviada para ${from}`);
      res.sendStatus(200);
    } catch (error) {
      logger.error(`Erro ao enviar mensagem: ${error}`);
      if (error.response) {
        logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
      res.sendStatus(500);
    }
  }
  } else {
    res.sendStatus(404);
  }
});


