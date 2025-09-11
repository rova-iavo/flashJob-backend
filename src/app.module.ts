import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { CategorieModule } from './categorie/categorie.module';
import { PrestationModule } from './prestation/prestation.module';
import { OffreModule } from './offre/offre.module';

@Module({
  imports: [UsersModule, CategorieModule, PrestationModule, OffreModule],
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
