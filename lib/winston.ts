import { createLogger, format, transports } from 'winston'
import  DailyRotateFile from 'winston-daily-rotate-file'

const transport: DailyRotateFile = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`;
})

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
	transports: [
	   transport
	]
})

export default logger