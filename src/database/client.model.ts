import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { RegionType } from 'shared/enum/region-type.enum';
import { User } from './user.model';

interface Client extends Document {
  readonly revision: number;
  readonly legalName: string;
  readonly shortName: string;
  readonly region: RegionType;
  readonly accountManager: Partial<User>;
}

type ClientModel = Model<Client>;

const ClientSchema = new Schema<Client>(
  {
    revision: SchemaTypes.Number,
    legalName: SchemaTypes.String,
    shortName: SchemaTypes.String,
    region: [
      { type: SchemaTypes.String, enum: ['region1', 'region2', 'region3'], required: false },
    ],
    accountManager: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true },
);

const createClientModel: (conn: Connection) => ClientModel = (
  connection: Connection,
) => connection.model<Client>('Client', ClientSchema, 'clients');

export { Client, ClientModel, createClientModel };
