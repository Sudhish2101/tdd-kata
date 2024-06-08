import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CalculateStringDto } from './dto/sum-numbers.dto';

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    describe('calculateString', () => {
        it('should return 0 for an empty string', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '' };
            expect(await appService.calculateString(calculateStringDto)).toBe(0);
        });

        it('should return the sum for a string of comma-separated numbers', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '1,2,3' };
            expect(await appService.calculateString(calculateStringDto)).toBe(6);
        });

        it('should handle new lines between numbers', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '1\n2,3' };
            expect(await appService.calculateString(calculateStringDto)).toBe(6);
        });

        it('should support custom delimiters', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '//;\n1;2' };
            expect(await appService.calculateString(calculateStringDto)).toBe(3);
        });

        it('should throw an error for negative numbers', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '1,-2,3' };
            await expect(appService.calculateString(calculateStringDto)).rejects.toThrow('Negative numbers not allowed: -2');
        });

        it('should throw an error listing all negative numbers', async () => {
            const calculateStringDto: CalculateStringDto = { numbers: '1,-2,-3,4' };
            await expect(appService.calculateString(calculateStringDto)).rejects.toThrow('Negative numbers not allowed: -2, -3');
        });

        it('should return the correct sum for large input strings', async () => {
            const largeInput = Array(1000).fill("1").join(",");
            const calculateStringDto: CalculateStringDto = { numbers: largeInput };
            expect(await appService.calculateString(calculateStringDto)).toBe(1000);
        });
    });
});
