import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { MasterModule } from './master/master.module';
import { ServerModule } from './server/server.module';
import V1Module from './v1/v1.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'v1', module: V1Module },
      { path: 'auth', module: AuthModule },
      { path: 'server', module: ServerModule },
      { path: 'master', module: MasterModule }
    ]
  }
];

@Module({
  imports: [RouterModule.register(routes), V1Module, AuthModule, ServerModule, MasterModule],
  providers: []
})
export default class ApiModule {}
