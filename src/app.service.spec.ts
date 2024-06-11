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
});
