import { createLogger, format, transports } from 'winston'

export const logger = import.meta.env.DEV
  ? console
  : createLogger({
    transports: [
      new transports.File({
        filename: 'logs/server.log',
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          format.printf(
            info =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`,
          ),
        ),
      }),
    ],
  })
