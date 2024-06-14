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

        it('should return the sum for a string of a number', async () => {
            const numbers = '1';
            expect(await appService.calculateString(numbers)).toBe(1);
        });

        it('should return the sum for a string of comma-separated numbers', async () => {
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

    describe('printComments function', () => {
        it('should print comments with correct indentation', () => {
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

            const comments = [
                {
                    id: 1,
                    userid: 1,
                    parent_comment_id: null,
                    content: "This is the first comment",
                    children: [
                        {
                            id: 2,
                            userid: 2,
                            parent_comment_id: 1,
                            content: "This is a reply to the first comment",
                            children: [
                                {
                                    id: 3,
                                    userid: 3,
                                    parent_comment_id: 2,
                                    content: "This is a reply to the reply",
                                    children: []
                                },
                                {
                                    id: 4,
                                    userid: 4,
                                    parent_comment_id: 3,
                                    content: "This is a reply to the reply to the reply",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 4,
                            userid: 4,
                            parent_comment_id: 1,
                            content: "This is another reply to the first comment",
                            children: []
                        }
                    ]
                },
                {
                    id: 5,
                    userid: 5,
                    parent_comment_id: null,
                    content: "This is a second top-level comment",
                    children: []
                }
            ];

            appService.printComments(comments);

            const expectedOutput = [
                "This is the first comment",
                "  This is a reply to the first comment",
                "    This is a reply to the reply",
                "    This is a reply to the reply to the reply",
                "  This is another reply to the first comment",
                "This is a second top-level comment"
            ];

            const actualOutput = logSpy.mock.calls.map(call => call[0]);
            expect(actualOutput).toEqual(expectedOutput);
            logSpy.mockRestore();
        });
    });
});
