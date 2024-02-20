import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Company',
    required: false,
    index: true,
  })
  parentCompanyId: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
