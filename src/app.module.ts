import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import configuration from 'src/utilities/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { MediaModule } from './media/media.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { PermissionsGuard } from './guard/permission.guard';
import { AuthModule } from './users/auth/auth.module';
import { JwtStrategy } from './users/auth/jwt/jwt.strategy';
import { RolesModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { UniversityModule } from './university/university.module';
import { CareerModule } from './career/career.module';
import { CategoriesModule } from './categories/categories.module';
import { CareerEduCategoryModule } from './career-edu-category/career-edu-category.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { FavoriteSubjectsModule } from './favorite-subjects/favorite-subjects.module';
import { IntrestedIndustriesModule } from './intrested-industries/intrested-industries.module';
import { IndustriesModule } from './industries/industries.module';
import { SubjectsModule } from './subjects/subjects.module';
import { CareerLikesModule } from './career-likes/career-likes.module';
import { InspirationalPeopleModule } from './inspirational-people/inspirational-people.module';
import { IndustyCareerDiagraphModule } from './industy-career-diagraph/industy-career-diagraph.module';
import { SubjectCareerDiagraphModule } from './subject-career-diagraph/subject-career-diagraph.module';
import { DiagraphModule } from './diagraph/diagraph.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
        synchronize: Boolean(process.env.SYNCHRONIZE),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      cache: true,
      load: [configuration],
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    MulterModule.register({
      dest: "./public/files",
    }),
    AuthModule,
    MailModule,
    UsersModule,
    RolesModule,
    UserDetailsModule,
    MediaModule,
    UniversityModule,
    CareerModule,
    CategoriesModule,
    CareerEduCategoryModule,
    SendMailModule,
    IndustriesModule,
    SubjectsModule,
    CareerLikesModule,
    InspirationalPeopleModule,
    IndustyCareerDiagraphModule,
    SubjectCareerDiagraphModule,
    DiagraphModule,
  ],
  controllers: [AppController],
  providers: [   
    JwtStrategy,
    AppService,
  ],
})
export class AppModule {}
