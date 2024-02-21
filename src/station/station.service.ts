import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Station, StationDocument } from './station.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class StationService {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<StationDocument>,
    private companyService: CompanyService
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const newStation = new this.stationModel(createStationDto);
    return newStation.save();
  }

  async findAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }

  async findOne(id: string): Promise<Station | null> {
    return this.stationModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStationDto: UpdateStationDto
  ): Promise<Station | null> {
    return this.stationModel
      .findByIdAndUpdate(id, updateStationDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.stationModel.findOneAndDelete({ _id: id }).exec();
  }

  async findStationsWithinRadiusForCompany(
    latitude: number,
    longitude: number,
    radius: number,
    companyId: string
  ): Promise<Station[]> {
    const childCompanyIds = await this.companyService.findAllChildren(
      companyId
    );

    const allRelevantCompanyIds = [companyId, ...childCompanyIds];

    return this.stationModel
      .find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            // Convert km to meters
            $maxDistance: radius * 1000,
          },
        },
        companyId: { $in: allRelevantCompanyIds },
      })
      .exec();
  }
}
