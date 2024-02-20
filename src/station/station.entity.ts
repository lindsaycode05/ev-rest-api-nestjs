// Update to src/station/station.entity.ts to include GeoJSON for location

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Company', index: true })
  companyId: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  })
  location: {
    type: String;
    coordinates: number[];
  };
}

export const StationSchema = SchemaFactory.createForClass(Station);

StationSchema.index({ location: '2dsphere' });