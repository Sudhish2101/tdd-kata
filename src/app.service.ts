import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async calculateString(numbers: string): Promise<number> {
    // If the input string is empty, return 0
    if (!numbers) {
      return 0;
    }
  }
}
