import { MENSAGENS } from "./mensagens.js";

export const getMensagem = (tipo) => {
  return MENSAGENS[tipo] || "Mensagem não encontrada.";
};

export const decideProximaMensagem = (input) => {
    if (!input) return "SAUDACAO_INICIAL";
    const texto = input.toUpperCase();
    switch (texto) {
        case "OLÁ":
        case "OLA":
        case "OI":
        case "INICIAR":
        case "COMEÇAR":
        case "COMEÇAR":
        case "START":
            return MENSAGENS.SAUDACAO_INICIAL.CABECALHO + "\n\n" + MENSAGENS.SAUDACAO_INICIAL.TEXT + "\n\n" +
            MENSAGENS.SAUDACAO_INICIAL.BUTTONS.map(btn => `${btn.id} - ${btn.title}`).join('\n');
        case "OPÇÕES":
        case "1":
        case "DOCS":
        case "DOCUMENTOS":
            return MENSAGENS.DOCS;
        case "2":
        case "LOCAL":
        case "LOCALIZAÇÃO":
            return MENSAGENS.LOCAL;
        case "3":
        case "DATAS":
        case "DATA":
            return MENSAGENS.DATAS;
        case "4":
        case "ATENDENTE":
        case "ATENDIMENTO":
            return MENSAGENS.ATENDENTE;
        default:
            return MENSAGENS.DESCONHECIDO + "\n\n" + MENSAGENS.OPCOES_PRINCIPAIS.TEXT + "\n\n" +
            MENSAGENS.OPCOES_PRINCIPAIS.BUTTONS.map(btn => `${btn.id} - ${btn.title}`).join('\n');
        //return "DESCONHECIDO";
    }
};