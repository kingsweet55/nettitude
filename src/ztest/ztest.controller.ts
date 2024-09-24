import {
    Controller,
    Get,
    Query,
    Scope,
    Request,
    Body
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTestDto } from './create-test.dto';

@Controller({ path: 'test', scope: Scope.REQUEST })
export class ZtestController {
    constructor() { }

    @Get('mytestget')
    mytestget(
        @Request() req,
        @Query('q1') firstname?: string,
        @Query('q2') lastname?: string,
    ): any {
        // console.log('###################:::::  ', req);
        // console.log('w:w:w:::  ', www);
        return { firstname, lastname };
    }

    @Get('mytestpost')
    mytestpost(
        @Request() req,
        @Body() createCatDto: CreateTestDto
    ): any {
        return;
    }

}
