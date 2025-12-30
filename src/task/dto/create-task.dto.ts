import { IsBoolean, IsString } from 'class-validator';
// DTO data tansfer object
export class CreateTaskDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;
}
