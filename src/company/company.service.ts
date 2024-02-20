import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Types } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findOne(id: string): Promise<Company | null> {
    return this.companyModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company | null> {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Company | null> {
    return this.companyModel.findOneAndDelete({ _id: id }).exec();
  }

  async findAllChildren(
    companyId: string,
    result: string[] = []
  ): Promise<string[]> {
    const children = await this.companyModel
      .find({ parentCompanyId: new Types.ObjectId(companyId) })
      .exec();

    for (const child of children) {
      result.push(child._id.toString());
      await this.findAllChildren(child._id.toString(), result);
    }
    return result;
  }
}
