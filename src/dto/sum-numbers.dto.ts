import { IsNotEmpty, IsString } from "class-validator";

export class CalculateStringDto {
    @IsString()
    @IsNotEmpty()
    numbers: string;
}