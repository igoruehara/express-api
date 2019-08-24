const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: 'logger' }), timestamp(), myFormat),
  transports: [new transports.File({ filename: 'src/storage/log/logger.log' })],
});

console.logger = logger;

module.exports = logger;
