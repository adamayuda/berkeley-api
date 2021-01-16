import { config } from '../config';
import mongoose from 'mongoose';

export const connectDB = (): void => {
  mongoose.connect(`mongodb://${config.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:'),
  );

  mongoose.connection.once('open', () => {
    console.log(`✅  Mongo successfully connected`);
  });

  return;
};
