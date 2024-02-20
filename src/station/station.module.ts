import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, StationSchema } from './station.entity';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }]),
    CompanyModule,
  ],
  providers: [StationService],
  controllers: [StationController],
})
export class StationModule {}
