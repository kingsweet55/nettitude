import { MongoClient } from 'mongodb';
// import { configs } from '../config/configuration';

const MONGO_URL = "mongodb://localhost/blog";

export const getDb = async () => {
  const client: any = await MongoClient.connect(
    MONGO_URL,
    // { useUnifiedTopology: true }
  );
  return client.db();
};
