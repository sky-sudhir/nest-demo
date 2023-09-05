import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "task-management",
      autoLoadEntities: true,
      synchronize: true,
      // entities: ["dist/src/**/*.entity{.ts,.js}"],
      // entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
