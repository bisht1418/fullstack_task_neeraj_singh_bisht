import mongoose from 'mongoose';
import { environment } from '../config/environment';

export const connect = async ()=> {
  try {
    await mongoose.connect(environment.mongoUri, {
      dbName: 'assignment'
    });
    
    console.log('✅ MongoDB connected via Mongoose');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1); 
  }
};

mongoose.connection.on('connected', () => 
  console.log('Mongoose connection established')
);

mongoose.connection.on('error', (err) => 
  console.error('Mongoose connection error:', err)
);

mongoose.connection.on('disconnected', () => 
  console.log('Mongoose connection disconnected')
);