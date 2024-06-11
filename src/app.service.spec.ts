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
});
