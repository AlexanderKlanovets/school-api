import fs from 'fs';
import path from 'path';

type MessageType = 'info' | 'error';

const DATE_ONLY_LENGTH = 10;
const DATE_WITH_TIME_LENGTH = 19;

export default class Logger {
  #stream: fs.WriteStream;

  constructor(logPath: string) {
    const date = new Date().toISOString().substring(0, DATE_ONLY_LENGTH);
    const filePath = path.resolve(path.join(logPath, `${date}.log`));
    this.#stream = fs.createWriteStream(filePath, { flags: 'a' });
  }

  private write(type: MessageType = 'info', message: string): void {
    const now = new Date().toISOString();
    const date = now.substring(0, DATE_WITH_TIME_LENGTH);
    const record = { date, type, message };
    const out = JSON.stringify(record);
    this.#stream.write(`${out}\n`);
  }

  log(message: string): void {
    this.write('info', message);
  }

  error(message: string): void {
    this.write('error', message);
  }

  close(): Promise<void> {
    console.log('Closing the logger...');
    return new Promise((resolve) => this.#stream.end(resolve));
  }
}
