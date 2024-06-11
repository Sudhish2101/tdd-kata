import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

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
            const numbers = '';
            expect(await appService.calculateString(numbers)).toBe(0);
        });
    });

    it('should return the sum for a string of a number', async () => {
        const numbers = '1';
        expect(await appService.calculateString(numbers)).toBe(1);
    });

    it('should return the sum for a string of a number', async () => {
        const numbers = '1, 2';
        expect(await appService.calculateString(numbers)).toBe(3);
    });

    it('should handle new lines between numbers', async () => {
        const numbers = '1\n2,3';
        expect(await appService.calculateString(numbers)).toBe(6);
    });

    it('should support custom delimiters', async () => {
        const numbers = '//;\n1;2';
        expect(await appService.calculateString(numbers)).toBe(3);
    });

    it('should throw an error for negative numbers', async () => {
        const numbers = '1,-2,3';
        await expect(appService.calculateString(numbers)).rejects.toThrow('Negative numbers not allowed: -2');
    });

    it('should throw an error listing all negative numbers', async () => {
        const numbers = '1,-2,-3,4';
        await expect(appService.calculateString(numbers)).rejects.toThrow('Negative numbers not allowed: -2, -3');
    });

    it('should return the correct sum for large input strings', async () => {
        const largeInput = Array(1000).fill("1").join("\n");
        const numbers = largeInput;
        expect(await appService.calculateString(numbers)).toBe(1000);
    });
});
