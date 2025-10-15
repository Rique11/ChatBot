import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createTaggedLogger } from "./src/Utils/logger.js";
import { escutaMensagem } from "./src/Webhooks/metaWebhook.js";
dotenv.config();
const logger = createTaggedLogger('index.js');
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const app = express();
app.use(bodyParser.json()); 


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
app.post("/webhook", escutaMensagem);

app.listen(process.env.PORT, () =>
  logger.info(`Servidor rodando na porta ${process.env.PORT}`)
);
