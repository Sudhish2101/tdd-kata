import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CalculateStringDto } from './dto/sum-numbers.dto';

@Controller('/api/')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sum')
  async calculateString(@Body() calculateStringDto: CalculateStringDto, @Res() res: Response) {
    try {
      let sum = await this.appService.calculateString(calculateStringDto.numbers);
      console.log(sum)
      return res.status(HttpStatus.OK).json({
        success: true, result: sum
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.OK).json({
        success: true, result: err.message
      });
    }
  }
}
