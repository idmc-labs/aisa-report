import React, { useMemo, useState } from 'react';
import {
    MultiSelectInput,
} from '@togglecorp/toggle-ui';
import {
    _cs,
    compareNumber,
    compareString,
    unique,
} from '@togglecorp/fujs';
import {
    gql,
    useQuery,
} from '@apollo/client';
import {
    IoDownloadOutline,
    IoExitOutline,
} from 'react-icons/io5';

import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

import {
    DisasterDataQuery,
    DisasterDataQueryVariables,
    DisasterCategoriesQuery,
    DisasterCategoriesQueryVariables,
    DisplacementByHazardType,
} from '#generated/types';

import ErrorBoundary from '#components/ErrorBoundary';
import ButtonLikeLink from '#components/ButtonLikeLink';
import Header from '#components/Header';
import Infographic from '#components/Infographic';
import SliderInput from '#components/SliderInput';
import Container from '#components/Container';
import TooltipIcon from '#components/TooltipIcon';

import {
    formatNumber,
    countryWithRegionMap,
    countriesNameMap,
    regionsNameMap,
    countries,
    regions,
    prepareUrl,
    getHazardTypeLabel,
} from '#utils/common';

import useDebouncedValue from '../../../hooks/useDebouncedValue';

import { countryMetadata } from './data';

import styles from './styles.css';

const DRUPAL_ENDPOINT = process.env.REACT_APP_DRUPAL_ENDPOINT as string || '';
const HELIX_REST_ENDPOINT = process.env.REACT_APP_HELIX_REST_ENDPOINT as string;
const HELIX_CLIENT_ID = process.env.REACT_APP_HELIX_CLIENT_ID as string || '';
const DATA_RELEASE = process.env.REACT_APP_DATA_RELEASE as string || '';

function suffixDrupalEndpoint(path: string) {
    return `${DRUPAL_ENDPOINT}${path}`;
}

export function suffixHelixRestEndpoint(path: string) {
    if (path.includes('?')) {
        return `${HELIX_REST_ENDPOINT}/${path}&client_id=${HELIX_CLIENT_ID}&release_environment=${DATA_RELEASE}`;
    }
    return `${HELIX_REST_ENDPOINT}/${path}?cliend_id=${HELIX_CLIENT_ID}&release_environment=${DATA_RELEASE}`;
}

const disasterCategoryKeySelector = (d: DisplacementByHazardType) => d.id;
const disasterCategoryLabelSelector = (d: { id: string, label: string }) => getHazardTypeLabel(d);
const regionKeySelector = (region: { key: string }) => region.key;
const regionLabelSelector = (region: { value: string }) => region.value;

const countryKeySelector = (country: { iso3: string }) => country.iso3;
const countryLabelSelector = (country: { name: string }) => country.name;

const START_YEAR = 2010;
const END_YEAR = 2021;

const giddLink = suffixDrupalEndpoint('/database/displacement-data');

const disasterColorSchemes = [
    // 'rgb(6, 23, 158)',
    // 'rgb(8, 56, 201)',
    // 'rgb(8, 116, 226)',
    'rgb(1, 142, 202)',
    'rgb(45, 183, 226)',
    'rgb(94, 217, 238)',
];

const categoricalColorScheme = [
    'rgb(6, 23, 158)',
    'rgb(8, 56, 201)',
    'rgb(8, 116, 226)',
    'rgb(1, 142, 202)',
    'rgb(45, 183, 226)',
    'rgb(94, 217, 238)',
];

const chartMargins = { top: 16, left: 5, right: 5, bottom: 5 };

const DISASTER_DATA = gql`
    query DisasterData(
        $countryIso3: [String!],
        $startYear: Float,
        $endYear: Float,
        $categories: [ID!],
        $releaseEnvironment: String!,
        $clientId: String!,
    ) {
        giddPublicDisasterStatistics(
            countriesIso3: $countryIso3,
            endYear: $endYear,
            startYear: $startYear,
            hazardTypes: $categories,
            releaseEnvironment: $releaseEnvironment,
            clientId: $clientId,
        ) {
            newDisplacementsRounded
            totalEvents
            displacementsByHazardType {
                id
                label
                newDisplacementsRounded
            }
            newDisplacementTimeseriesByCountry {
                country {
                    id
                    iso3
                    countryName
                }
                totalRounded
                year
            }
        }
    }
`;

const DISASTER_CATEGORIES = gql`
    query DisasterCategories(
        $countryIso3: [String!],
        $releaseEnvironment: String!,
        $clientId: String!,
    ) {
        giddPublicDisasterStatistics(
            countriesIso3: $countryIso3,
            releaseEnvironment: $releaseEnvironment,
            clientId: $clientId,
        ) {
            displacementsByHazardType {
                id
                label
                newDisplacementsRounded
            }
        }
    }
`;

interface Props {
    className?: string;
}

function CountryProfile(props: Props) {
    const {
        className,
    } = props;

    // Disaster section
    const [disasterCategories, setDisasterCategories] = useState<string[]>([]);
    const [regionValues, setRegionValues] = useState<string[]>([]);
    const [countriesValues, setCountriesValues] = useState<string[]>([]);
    const [disasterTimeRangeActual, setDisasterTimeRange] = useState([START_YEAR, END_YEAR]);
    const disasterTimeRange = useDebouncedValue(disasterTimeRangeActual);

    const selectedCountries = useMemo(() => {
        if (regionValues.length === 0 && countriesValues.length === 0) {
            return countries.map((country) => country.iso3);
        }
        const countriesFromRegions = regions
            .filter((region) => regionValues.includes(region.key))
            .map((region) => region.countries).flat();

        return (unique([
            ...countriesFromRegions,
            ...countriesValues,
        ], (d) => d));
    }, [
        regionValues,
        countriesValues,
    ]);

    const {
        data: disasterCategoryOptions,
    } = useQuery<DisasterCategoriesQuery, DisasterCategoriesQueryVariables>(
        DISASTER_CATEGORIES,
        {
            variables: {
                countryIso3: selectedCountries,
                releaseEnvironment: DATA_RELEASE,
                clientId: HELIX_CLIENT_ID,
            },
        },
    );

    const categories = useMemo(() => (
        [...(disasterCategoryOptions?.giddPublicDisasterStatistics.displacementsByHazardType ?? [])]
            .sort((a, b) => compareString(a.label, b.label))
    ), [disasterCategoryOptions?.giddPublicDisasterStatistics.displacementsByHazardType]);

    const {
        previousData: previousDisasterData,
        data: disasterData = previousDisasterData,
        // FIXME: handle loading and error
        // loading: disasterDataLoading,
        // error: disasterDataError,
    } = useQuery<DisasterDataQuery, DisasterDataQueryVariables>(
        DISASTER_DATA,
        {
            variables: {
                countryIso3: selectedCountries,
                startYear: disasterTimeRange[0],
                endYear: disasterTimeRange[1],
                categories: disasterCategories,
                releaseEnvironment: DATA_RELEASE,
                clientId: HELIX_CLIENT_ID,
            },
        },
    );

    const noOfSelections = useMemo(() => ([
        ...regionValues,
        ...countriesValues,
    ]), [regionValues, countriesValues]);

    const isMultiline = noOfSelections.length > 1 && noOfSelections.length < 5;

    const lineChartData = useMemo(() => {
        const data = disasterData?.giddPublicDisasterStatistics?.newDisplacementTimeseriesByCountry;
        if (!data) {
            return undefined;
        }
        if (isMultiline) {
            const countriesChartData = data
                .filter((item) => countriesValues.includes(item.country.iso3))
                .map((item) => ({
                    [item.country.iso3]: item.totalRounded,
                    year: item.year,
                    type: 'country',
                    total: item.totalRounded,
                }));

            const regionChartData = data
                .map((item) => ({ ...item, regionKey: countryWithRegionMap[item.country.iso3] }))
                .filter((item) => regionValues.includes(item.regionKey))
                .reduce((acc, item) => {
                    const itemInAccIndex = acc.findIndex(
                        (accItem) => (
                            accItem.year === item.year
                            && accItem.regionKey === item.regionKey
                        ),
                    );
                    if (itemInAccIndex === -1) {
                        return [
                            ...acc,
                            {
                                [item.regionKey]: item.totalRounded ?? 0,
                                year: item.year,
                                totalRounded: item.totalRounded ?? 0,
                                regionKey: item.regionKey,
                            },
                        ];
                    }
                    const newItem = {
                        [item.regionKey]: (item?.totalRounded ?? 0)
                            + acc[itemInAccIndex].totalRounded,
                        year: item.year,
                        totalRounded: (item?.totalRounded ?? 0) + acc[itemInAccIndex].totalRounded,
                        regionKey: item.regionKey,
                    };
                    acc.splice(itemInAccIndex, 1);
                    return ([
                        ...acc,
                        newItem,
                    ]);
                }, [] as { year: number; totalRounded: number; regionKey: string; }[]);

            return [
                ...countriesChartData,
                ...regionChartData,
            ];
        }
        return data.reduce(
            (acc, item) => {
                const itemInAccIndex = acc.findIndex(
                    (accItem) => (
                        accItem.year === item.year
                    ),
                );
                if (itemInAccIndex === -1) {
                    return [
                        ...acc,
                        {
                            year: item.year,
                            totalRounded: item.totalRounded ?? 0,
                        },
                    ];
                }
                const newItem = {
                    year: item.year,
                    totalRounded: (item.totalRounded ?? 0) + acc[itemInAccIndex].totalRounded,
                };
                acc.splice(itemInAccIndex, 1);
                return ([
                    ...acc,
                    newItem,
                ]);
            },
            [] as { year: number; totalRounded: number}[],
        );
    }, [disasterData, isMultiline, countriesValues, regionValues]);

    const dataDownloadLink = suffixHelixRestEndpoint(
        prepareUrl(
            'gidd/disasters/disaster-export/',
            {
                iso3__in: selectedCountries.join(','),
                start_year: disasterTimeRange[0],
                end_year: disasterTimeRange[1],
                hazard_type__in: disasterCategories.join(','),
            },
        ),
    );

    const displacementsByHazardType = useMemo(() => (
        disasterData?.giddPublicDisasterStatistics.displacementsByHazardType?.map((hazard) => ({
            ...hazard,
            label: getHazardTypeLabel(hazard),
        }))
    ), [
        disasterData?.giddPublicDisasterStatistics.displacementsByHazardType,
    ]);

    const pieChartData = useMemo(() => (
        [...(displacementsByHazardType ?? [])]?.sort(
            (a, b) => compareNumber(a.newDisplacementsRounded, b.newDisplacementsRounded),
        )
    ), [
        displacementsByHazardType,
    ]);

    return (
        <Container
            className={_cs(className, styles.displacementData)}
            heading={countryMetadata.disasterHeader}
            headingSize="small"
            headerClassName={styles.disasterHeader}
            headingClassName={styles.disasterHeading}
            headingInfo={(
                <TooltipIcon>
                    {countryMetadata.disasterTooltip}
                </TooltipIcon>
            )}
            footerActions={(
                <>
                    <ButtonLikeLink
                        href={dataDownloadLink}
                        target="_blank"
                        className={styles.disasterButton}
                        rel="noopener noreferrer"
                        icons={(
                            <IoDownloadOutline />
                        )}
                    >
                        Download Disaster Data
                    </ButtonLikeLink>
                    <ButtonLikeLink
                        href={giddLink}
                        className={styles.disasterButton}
                        target="_blank"
                        rel="noopener noreferrer"
                        icons={(
                            <IoExitOutline />
                        )}
                    >
                        View Full Database
                    </ButtonLikeLink>
                </>
            )}
            filters={(
                <>
                    <Header
                        heading="Subregions"
                        headingSize="extraSmall"
                        description={(
                            <MultiSelectInput
                                className={styles.selectInput}
                                inputSectionClassName={styles.inputSection}
                                placeholder="Subregions"
                                name="regions"
                                value={regionValues}
                                options={regions}
                                keySelector={regionKeySelector}
                                labelSelector={regionLabelSelector}
                                onChange={setRegionValues}
                            />
                        )}
                    />
                    <Header
                        heading="Countries"
                        headingSize="extraSmall"
                        description={(
                            <MultiSelectInput
                                className={styles.selectInput}
                                inputSectionClassName={styles.inputSection}
                                placeholder="Countries"
                                name="countries"
                                value={countriesValues}
                                options={countries}
                                keySelector={countryKeySelector}
                                labelSelector={countryLabelSelector}
                                onChange={setCountriesValues}
                            />
                        )}
                    />
                    <Header
                        heading="Disaster Category"
                        headingSize="extraSmall"
                        description={(
                            <MultiSelectInput
                                className={styles.selectInput}
                                inputSectionClassName={styles.inputSection}
                                placeholder="Disaster Category"
                                name="disasterCategory"
                                value={disasterCategories}
                                options={categories}
                                keySelector={disasterCategoryKeySelector}
                                labelSelector={disasterCategoryLabelSelector}
                                onChange={setDisasterCategories}
                            />
                        )}
                    />
                    <SliderInput
                        className={styles.timeRangeContainer}
                        hideValues
                        min={START_YEAR}
                        max={END_YEAR}
                        labelDescription={`${disasterTimeRangeActual[0]} - ${disasterTimeRangeActual[1]}`}
                        step={1}
                        minDistance={0}
                        value={disasterTimeRangeActual}
                        onChange={setDisasterTimeRange}
                    />
                </>
            )}
        >
            <div className={styles.infographicList}>
                <Infographic
                    className={styles.disasterInfographic}
                    totalValue={disasterData
                        ?.giddPublicDisasterStatistics.newDisplacementsRounded || 0}
                    description={(
                        <div>
                            <Header
                                headingClassName={styles.heading}
                                heading="Internal Displacements"
                                headingSize="extraSmall"
                                headingInfo={(
                                    <TooltipIcon>
                                        {countryMetadata?.disasterInternalDisplacementTooltip}
                                    </TooltipIcon>
                                )}
                            />
                        </div>
                    )}
                    date={`${disasterTimeRangeActual[0]} - ${disasterTimeRangeActual[1]}`}
                    chart={lineChartData && (
                        <ErrorBoundary>
                            <ResponsiveContainer>
                                <LineChart
                                    data={lineChartData}
                                    margin={chartMargins}
                                >
                                    <CartesianGrid
                                        vertical={false}
                                        strokeDasharray="3 3"
                                    />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        type="number"
                                        allowDecimals={false}
                                        domain={disasterTimeRange}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickFormatter={formatNumber}
                                    />
                                    <Tooltip
                                        formatter={formatNumber}
                                    />
                                    <Legend />
                                    {isMultiline ? (
                                        noOfSelections.map((item, i) => (
                                            <Line
                                                key={item}
                                                dataKey={item}
                                                name={
                                                    selectedCountries.length > 1
                                                        ? (
                                                            countriesNameMap[item]
                                                                ?? regionsNameMap[item]
                                                                ?? item
                                                        ) : 'Disaster internal displacements'
                                                }
                                                strokeWidth={2}
                                                connectNulls
                                                dot
                                                stroke={disasterColorSchemes[
                                                    i % disasterColorSchemes.length
                                                ]}
                                            />
                                        ))
                                    ) : (
                                        <Line
                                            dataKey="totalRounded"
                                            key="totalRounded"
                                            stroke="var(--color-disaster)"
                                            name="Internal Displacements"
                                            strokeWidth={2}
                                            connectNulls
                                            dot
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </ErrorBoundary>
                    )}
                />
                <Infographic
                    className={styles.disasterInfographic}
                    totalValue={disasterData
                        ?.giddPublicDisasterStatistics.totalEvents || 0}
                    description={(
                        <Header
                            headingClassName={styles.heading}
                            heading="Disaster Events Reported"
                            headingSize="extraSmall"
                            headingInfo={(
                                <TooltipIcon>
                                    {countryMetadata?.disasterEventTooltip}
                                </TooltipIcon>
                            )}
                        />
                    )}
                    date={`${disasterTimeRangeActual[0]} - ${disasterTimeRangeActual[1]}`}
                    chart={pieChartData && (
                        <ErrorBoundary>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Tooltip
                                        formatter={formatNumber}
                                    />
                                    <Legend />
                                    <Pie
                                        data={pieChartData}
                                        dataKey="newDisplacementsRounded"
                                        nameKey="label"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {disasterData
                                            ?.giddPublicDisasterStatistics
                                            ?.displacementsByHazardType
                                            ?.map(({ label }, index) => (
                                                <Cell
                                                    key={label}
                                                    fill={categoricalColorScheme[
                                                        index % categoricalColorScheme.length
                                                    ]}
                                                />
                                            ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ErrorBoundary>
                    )}
                />
            </div>
        </Container>
    );
}

export default CountryProfile;
