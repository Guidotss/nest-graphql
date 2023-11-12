import { Field, Int, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, IsOptional, IsNumber, IsBoolean, IsInt  } from "class-validator";

@InputType()
export class UpdateTodoInput { 
    @Field(() => Int, { description: 'Id of the todo' })
    @IsNumber()
    @IsInt()
    id: number;

    @Field(() => String, { description: 'Description of the todo', nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    description?: string;

    @Field(() => Boolean, { description: 'Is the todo done?', nullable: true })
    @IsOptional()
    @IsBoolean()
    done?: boolean;
}