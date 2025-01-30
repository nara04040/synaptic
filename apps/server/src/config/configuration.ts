import { registerAs } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'development';

export default registerAs('app', () => ({
  environment,
  isProduction: environment === 'production',
  port: parseInt(process.env.PORT || '3001', 10),
  clientUrl: process.env.CLIENT_URL,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  cors: {
    origin: environment === 'production' 
      ? [process.env.CLIENT_URL]
      : ['http://localhost:3000'],
    credentials: true,
  }
}));