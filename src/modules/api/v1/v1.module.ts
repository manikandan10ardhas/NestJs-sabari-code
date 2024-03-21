import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [{ path: 'user', module: UserModule }]
  }
];

@Module({
  imports: [RouterModule.register(routes), UserModule]
})
export default class V1Module {}
