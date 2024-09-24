import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { Post } from './post.model';
import { User } from './user.model';

interface Ztest extends Document {
    readonly content: string;
    readonly post?: Partial<Post>;
    readonly createdBy?: Partial<User>;
    readonly updatedBy?: Partial<User>;
}

type ZtestModel = Model<Ztest>;

const ZtestSchema = new Schema<Ztest>(
    {
        content: SchemaTypes.String,
        post: { type: SchemaTypes.ObjectId, ref: 'Post', required: false },
        createdBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
        updatedBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
    },
    { timestamps: true },
);

const createZtestModel: (conn: Connection) => ZtestModel = (
    connection: Connection,
) => connection.model<Ztest>('Ztest', ZtestSchema, 'ztests');

export { Ztest, ZtestModel, createZtestModel };
