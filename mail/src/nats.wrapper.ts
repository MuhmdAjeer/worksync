import { Logger } from '@nestjs/common';
import { connect, Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;
  private readonly logger = new Logger('Nats Wrapper');

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS mail');
        resolve();
      });
      this.client.on('error', (err) => {
        this.logger.error(err);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
