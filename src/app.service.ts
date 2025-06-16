import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
  async transcodeAudio(fileId: string) {
    await this.audioQueue.add('transcode', { fileId });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
