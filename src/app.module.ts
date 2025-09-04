import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
  configure(consumer: MiddlewareConsumer) {
    const protectedRoutes = [
      { path: 'users', method: RequestMethod.GET }
    ];
    consumer
      .apply(AuthMiddleware)
      .forRoutes(...protectedRoutes);
  }
}
