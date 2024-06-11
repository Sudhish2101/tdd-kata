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

    let delimiter = /[,\n]/; // Default delimiter pattern (comma or newline)
    let customDelimiter = false;

    // Check if there's a custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = new RegExp(numbers.substring(2, delimiterEndIndex));
      numbers = numbers.substring(delimiterEndIndex + 1);
      customDelimiter = true;
    }
    
    // Split the input string by the delimiter(s)
    const numList = numbers.split(delimiter);

    let total = 0;

    // Sum up the numbers
    for (const num of numList) {
      if (num) {
        const n = parseInt(num);
        total += n;
      }
    }
    return total;
  }
}
