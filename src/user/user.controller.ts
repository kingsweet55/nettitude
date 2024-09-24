import { Controller, DefaultValuePipe, Get, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'database/user.model';
import { Observable } from 'rxjs';
import { ParseObjectIdPipe } from '../shared/pipe/parse-object-id.pipe';
import { UserService } from './user.service';

@Controller({ path: "/users" })
export class UserController {

  constructor(private userService: UserService) { }

  @Get(':id')
  getUser(
    @Req() req:Request,
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('withPosts', new DefaultValuePipe(false)) withPosts?: boolean
  ): Observable<Partial<User>> {
    console.log('-----UserControl:req.params-----', req.params);
    console.log('-----UserControl:req.query-----', req.query);
    return this.userService.findById(id, withPosts);
  }
}
