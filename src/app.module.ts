import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { RestaurantsModule } from './restaurants/restaurants.module';
// import { MenuItemsModule } from './menu-items/menu-items.module';
// import { OrdersModule } from './orders/orders.module';
// import { OrderItemsModule } from './order-items/order-items.module';
// import { ReviewsModule } from './reviews/reviews.module';
// import { PaymentsModule } from './payments/payments.module';
// import { PromotionsModule } from './promotions/promotions.module';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/HttpExceptionFilter';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    // RestaurantsModule,
    // MenuItemsModule,
    // OrdersModule,
    // OrderItemsModule,
    // ReviewsModule,
    // PaymentsModule,
    // PromotionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
