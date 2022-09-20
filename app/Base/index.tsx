import React from 'react';
// import { Router } from 'react-router-dom';
import { init, ErrorBoundary } from '@sentry/react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import ReactGA from 'react-ga';
import { listToMap } from '@togglecorp/fujs';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@togglecorp/toggle-ui/build/index.css';

import { setMapboxToken } from '@togglecorp/re-map';

import AsiaReport from '#views/AsiaReport';

import PreloadMessage from '#base/components/PreloadMessage';
import sentryConfig from '#base/configs/sentry';
import apolloConfig from '#base/configs/apollo';
import { trackingId } from '#base/configs/googleAnalytics';
import { mapboxToken } from '#base/configs/env';

import styles from './styles.css';

setMapboxToken(mapboxToken);

if (sentryConfig) {
    init(sentryConfig);
}

if (trackingId) {
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname);
}

const apolloClient = new ApolloClient(apolloConfig);

export function parseQueryString(value: string) {
    const val = value.substring(1);
    return listToMap(
        val.split('&').map((token) => token.split('=')),
        (item) => item[0],
        (item) => item[1],
    );
}

function Base() {
    return (
        <div className={styles.base}>
            <ErrorBoundary
                showDialog
                fallback={(
                    <PreloadMessage
                        heading="Oh no!"
                        content="Some error occurred!"
                    />
                )}
            >
                <ApolloProvider client={apolloClient}>
                    <AsiaReport className={styles.view} />
                </ApolloProvider>
            </ErrorBoundary>
        </div>
    );
}

export default Base;
