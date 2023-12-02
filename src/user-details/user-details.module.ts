import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsRepository } from './user-details.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetailsRepository])
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [UserDetailsService,TypeOrmModule.forFeature([UserDetailsRepository]),UserDetailsModule]

})
export class UserDetailsModule {}
