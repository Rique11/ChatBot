import winston from 'winston';
import 'winston-daily-rotate-file';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const SHOW_LOGS = process.env.TESTE_MODE === 'true' || process.env.NODE_ENV !== 'production';
const LOG_TO_FILE = process.env.LOG_TO_FILE === 'true';

// Cores personalizadas para os níveis de log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

// Adicionar esquema de cores ao winston
winston.addColors(colors);

// Formato personalizado para o console
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.tag ? `[${info.tag}] ` : ''}${info.message}`
  )
);

// Formato para logs em arquivo (sem cores)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

// Transports (destinos dos logs)
const transports = [];

// Transport para console - só adiciona se SHOW_LOGS for true
if (SHOW_LOGS) {
  transports.push(
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: consoleFormat,
    })
  );
}

// Transport para arquivo - só adiciona se LOG_TO_FILE for true
if (LOG_TO_FILE) {
  transports.push(
    new winston.transports.DailyRotateFile({
      level: LOG_LEVEL,
      format: fileFormat,
      dirname: path.join(__dirname, '../logs'),
      filename: 'golfc-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    })
  );
}

// Cria o logger
const logger = winston.createLogger({
  level: LOG_LEVEL,
  levels: winston.config.npm.levels,
  transports,
});

// Função para criar loggers com tags específicas
export const createTaggedLogger = (tag) => {
  return {
    error: (message, ...meta) => logger.error({ tag, message, ...meta }),
    warn: (message, ...meta) => logger.warn({ tag, message, ...meta }),
    info: (message, ...meta) => logger.info({ tag, message, ...meta }),
    http: (message, ...meta) => logger.http({ tag, message, ...meta }),
    debug: (message, ...meta) => logger.debug({ tag, message, ...meta }),
  };
};

// Logger padrão sem tag
export default {
  error: (message, ...meta) => logger.error({ message, ...meta }),
  warn: (message, ...meta) => logger.warn({ message, ...meta }),
  info: (message, ...meta) => logger.info({ message, ...meta }),
  http: (message, ...meta) => logger.http({ message, ...meta }),
  debug: (message, ...meta) => logger.debug({ message, ...meta }),
};