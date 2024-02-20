export class CreateStationDto {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly companyId: string;
  readonly address: string;
  readonly location: {
    type: string;
    coordinates: number[];
  };
}
