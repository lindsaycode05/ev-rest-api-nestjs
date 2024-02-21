import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({
    ref: 'Company',
    required: false,
    index: true,
  })
  parentCompanyId: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
