import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../../src/company/company.service';
import { getModelToken } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../../src/company/company.entity';
import { Model } from 'mongoose';
import { UpdateCompanyDto } from '../../src/company/dto/update-company.dto';

// Mock company data
const mockCompany = {
  _id: '62b9f571e705fa8c6f22b9b2',
  name: 'Mock Company',
  parentCompanyId: null,
};
const mockCompanies = [
  mockCompany,
  {
    _id: '62b9f571e705fa8c6f22b9b8',
    name: 'Another Mock Company',
    parentCompanyId: '62b9f571e705fa8c6f22b9b5',
  },
];

describe('CompanyService', () => {
  let service: CompanyService;
  let model: Model<CompanyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockCompany),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCompanies),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCompany),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCompany),
            }),
            findOneAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCompany),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    model = module.get<Model<CompanyDocument>>(getModelToken(Company.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockCompanies);
    });
  });

  describe('findOne', () => {
    it('should return a single company', async () => {
      const result = await service.findOne('a-fake-id');
      expect(result).toEqual(mockCompany);
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateCompanyDto: UpdateCompanyDto = { name: 'Updated Company' };
      const result = await service.update('a-fake-id', updateCompanyDto);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('remove', () => {
    it('should delete a company', async () => {
      const result = await service.remove('a-fake-id');
      expect(result).toEqual(mockCompany);
    });
  });
});
