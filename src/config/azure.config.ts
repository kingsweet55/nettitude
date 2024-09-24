import { registerAs } from '@nestjs/config';

export default registerAs('azure', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/blog',
  AccountName: 'nettitudeteststorage',
  AccountKey: 'b5gOkDrKxvCHim9twUluv7cguvDn2T1iyGNPHimEQFjsDcWIPKE894WopfQa1tl/5MKfhN8oTHSkntK9ajHa5w',
}));
