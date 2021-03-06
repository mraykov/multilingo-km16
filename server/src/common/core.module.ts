import { Module, Global } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
  imports: [ConfigModule, AuthModule],
  exports: [ConfigModule, AuthModule],
})
export class CoreModule {}
