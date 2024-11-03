import * as fs from "fs"
import * as path from 'path'

enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

class Logger {
    private static instance: Logger;
    private logFilePath: string;

    private constructor() {
        this.logFilePath = path.join("logs.txt", "../src/util/log/logs.txt");

        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private logToFile(message: string): void {
        fs.appendFileSync(this.logFilePath, message + '\n');
    }

    public log(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${level.toUpperCase()}] - ${timestamp}: ${message}`;

        this.logToFile(logMessage);
    }

    public info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    public warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    public error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }
}

export default Logger;