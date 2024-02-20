import { Test, TestingModule } from '@nestjs/testing';
import { StationService } from '../../src/station/station.service';
import { getModelToken } from '@nestjs/mongoose';
import { Station, StationDocument } from '../../src/station/station.entity';
import { Model } from 'mongoose';
import { CreateStationDto } from '../../src/station/dto/create-station.dto';
import { UpdateStationDto } from '../../src/station/dto/update-station.dto';
import { CompanyService } from '../../src/company/company.service';

// Mock station data
const mockStation = {
  _id: '630bef2a1234567890123457',
  name: 'Station 1',
  latitude: 40.712776,
  longitude: -74.005974,
  companyId: '62b9f571e705fa8c6f22b9a1',
  address: 'Address 1',
  location: { type: 'Point', coordinates: [-74.005974, 40.712776] },
};

const mockStations = [mockStation];

describe('StationService', () => {
  let service: StationService;
  let model: Model<StationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationService,
        {
          provide: getModelToken(Station.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockStation),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockStations),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockStation),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockStation),
            }),
            findOneAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockStation),
            }),
          },
        },
        {
          provide: CompanyService,
          useValue: {
            findAllChildren: jest
              .fn()
              .mockResolvedValue(['62b9f571e705fa8c6f22b9a1']),
          },
        },
      ],
    }).compile();

    service = module.get<StationService>(StationService);
    model = module.get<Model<StationDocument>>(getModelToken(Station.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stations', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockStations);
    });
  });

  describe('findOne', () => {
    it('should return a single station', async () => {
      const result = await service.findOne('630bef2a1234567890123457');
      expect(result).toEqual(mockStation);
    });
  });

  describe('update', () => {
    it('should update a station', async () => {
      const updateStationDto: UpdateStationDto = {
        name: 'Updated Station',
        latitude: 40.7128,
        longitude: -74.006,
        companyId: '62b9f571e705fa8c6f22b9a1',
        address: 'Updated Address',
        location: {
          type: 'Point',
          coordinates: [-74.006, 40.7128],
        },
      };
      const result = await service.update(
        '630bef2a1234567890123457',
        updateStationDto
      );
      expect(result).toEqual(mockStation);
    });
  });

  describe('remove', () => {
    it('should delete a station', async () => {
      const result = await service.remove('630bef2a1234567890123457');
      expect(result).toEqual(mockStation);
    });
  });

  describe('findStationsWithinRadiusForCompany', () => {
    it('should find stations within radius for a company', async () => {
      const latitude = 40.7128;
      const longitude = -74.006;
      const radius = 1; // in kilometers
      const companyId = '62b9f571e705fa8c6f22b9a1';

      model.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockStations),
      });

      const result = await service.findStationsWithinRadiusForCompany(
        latitude,
        longitude,
        radius,
        companyId
      );
      expect(result).toEqual(mockStations);
      expect(model.find).toHaveBeenCalled();
    });
  });
});
