import { isDev } from './env';

export const trackingId = process.env.REACT_APP_GA_TRACKING_ID || '';

export const gaConfig = {
    debug: isDev,
    testMode: isDev,
    gaOptions: {
        userId: undefined,
    },
};
