// NOTE: these may not be used
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTesting = process.env.NODE_ENV === 'test';

export const isDev = process.env.REACT_APP_ENVIRONMENT === 'development';
export const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;
