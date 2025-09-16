import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { CategorieModule } from './categorie/categorie.module';
import { PrestationModule } from './prestation/prestation.module';
import { OffreModule } from './offre/offre.module';
import { AvisModule } from './avis/avis.module';
import { AuthModule } from './auth/auth.module';
import { BrouillonModule } from './brouillon/brouillon.module';

@Module({
  imports: [
    AuthModule,
    UsersModule, 
    CategorieModule, 
    PrestationModule, 
    OffreModule, 
    AvisModule,
    BrouillonModule
  ],
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
