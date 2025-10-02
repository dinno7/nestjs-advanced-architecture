import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { ok: boolean; message: string } {
    return {
      ok: true,
      message: 'The app is healthy',
    };
  }
}
