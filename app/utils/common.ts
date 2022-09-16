import { memo } from 'react';
import {
    isFalsy,
    isFalsyString,
    listToMap,
    caseInsensitiveSubmatch,
    compareStringSearch,
} from '@togglecorp/fujs';
import {
    formatNumberRaw,
    getAutoPrecision,
} from '#components/Numeral';

const standaloneMode = (window as { standaloneMode?: boolean }).standaloneMode ?? false;

export function rankedSearchOnList<T>(
    list: T[],
    searchString: string | undefined,
    labelSelector: (item: T) => string,
) {
    if (isFalsyString(searchString)) {
        return list;
    }

    return list
        .filter((option) => caseInsensitiveSubmatch(labelSelector(option), searchString))
        .sort((a, b) => compareStringSearch(
            labelSelector(a),
            labelSelector(b),
            searchString,
        ));
}

export const genericMemo: (<T>(c: T) => T) = memo;

export const getHashFromBrowser = () => window.location.hash.substr(2);
export const setHashToBrowser = (hash: string | undefined) => {
    if (hash) {
        window.location.replace(`#/${hash}`);
    } else {
        window.location.hash = '';
    }
};

export function isValidNumber(value: unknown): value is number {
    if (isFalsy(value)) {
        return false;
    }

    if (Number.isNaN(+(value as number))) {
        return false;
    }

    if (value === null) {
        return false;
    }

    return true;
}

export function formatNumber(value: number) {
    const output = formatNumberRaw(
        value,
        ',',
        true,
        getAutoPrecision(value, 100, 2),
        0,
    );

    if (!output) {
        return '';
    }
    const {
        value: number,
        valueSuffix: normalizeSuffix = '',
    } = output;
    return `${number}${normalizeSuffix}`;
}

export function getAsiaReportLink() {
    // NOTE: we need to also add countryName on standaloneMode url
    return standaloneMode
        ? '/?page=asia-report'
        : '/asia-report';
}

export const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const regions = [
    {
        key: 'cwa',
        value: 'Central and West Asia',
        countries: [
            'AFG',
            'ARM',
            'AZE',
            'GEO',
            'KAZ',
            'KGZ',
            'PAK',
            'TJK',
            'TUR',
            'TKM',
            'UZB',
        ],
    },
    {
        key: 'ea',
        value: 'East Asia',
        countries: [
            'PRK',
            'HKG',
            'JPN',
            'MAC',
            'MNG',
            'CHN',
            'KOR',
            'TWN',
        ],
    },
    {
        key: 'sea',
        value: 'South East Asia',
        countries: [
            'BRN',
            'KHM',
            'IDN',
            'LAO',
            'MYS',
            'MMR',
            'PHL',
            'SGP',
            'THA',
            'TLS',
            'VNM',
        ],
    },
    {
        key: 'sa',
        value: 'South Asia',
        countries: [
            'BGD',
            'BTN',
            'IND',
            'MDV',
            'NPL',
            'LKA',
        ],
    },
    {
        key: 'tp',
        value: 'The Pacific',
        countries: [
            'ASM',
            'AUS',
            'CXR',
            'CCK',
            'COK',
            'FSM',
            'FJI',
            'PYF',
            'GUM',
            'HMD',
            'KIR',
            'MHL',
            'NRU',
            'NCL',
            'NZL',
            'NIU',
            'NFK',
            'MNP',
            'PLW',
            'PNG',
            'PCN',
            'WSM',
            'SLB',
            'TKL',
            'TON',
            'TUV',
            'UMI',
            'VUT',
            'WLF',
        ],
    },
];

export const countries = [
    { iso3: 'AFG', name: 'Afghanistan' },
    { iso3: 'ASM', name: 'American Samoa' },
    { iso3: 'ARM', name: 'Armenia' },
    { iso3: 'AUS', name: 'Australia' },
    { iso3: 'AZE', name: 'Azerbaijan' },
    { iso3: 'BGD', name: 'Bangladesh' },
    { iso3: 'BTN', name: 'Bhutan' },
    { iso3: 'BRN', name: 'Brunei Darussalam' },
    { iso3: 'KHM', name: 'Cambodia' },
    { iso3: 'CXR', name: 'Christmas Island' },
    { iso3: 'CCK', name: 'Cocos (Keeling) Islands' },
    { iso3: 'COK', name: 'Cook Islands' },
    { iso3: 'PRK', name: 'Democratic People\'s Republic of Korea' },
    { iso3: 'FSM', name: 'Federated States of Micronesia' },
    { iso3: 'FJI', name: 'Fiji' },
    { iso3: 'PYF', name: 'French Polynesia' },
    { iso3: 'GEO', name: 'Georgia' },
    { iso3: 'GUM', name: 'Guam' },
    { iso3: 'HMD', name: 'Heard Island and McDonald Islands' },
    { iso3: 'HKG', name: 'Hong Kong, China' },
    { iso3: 'IND', name: 'India' },
    { iso3: 'IDN', name: 'Indonesia' },
    { iso3: 'JPN', name: 'Japan' },
    { iso3: 'KAZ', name: 'Kazakhstan' },
    { iso3: 'KIR', name: 'Kiribati' },
    { iso3: 'KGZ', name: 'Kyrgyz Republic' },
    { iso3: 'LAO', name: 'Lao People\'s Democratic Republic' },
    { iso3: 'MAC', name: 'Macau, China' },
    { iso3: 'MYS', name: 'Malaysia' },
    { iso3: 'MDV', name: 'Maldives' },
    { iso3: 'MHL', name: 'Marshall Islands' },
    { iso3: 'MNG', name: 'Mongolia' },
    { iso3: 'MMR', name: 'Myanmar' },
    { iso3: 'NRU', name: 'Nauru' },
    { iso3: 'NPL', name: 'Nepal' },
    { iso3: 'NCL', name: 'New Caledonia' },
    { iso3: 'NZL', name: 'New Zealand' },
    { iso3: 'NIU', name: 'Niue' },
    { iso3: 'NFK', name: 'Norfolk Island' },
    { iso3: 'MNP', name: 'Northern Mariana Islands' },
    { iso3: 'PAK', name: 'Pakistan' },
    { iso3: 'PLW', name: 'Palau' },
    { iso3: 'PNG', name: 'Papua New Guinea' },
    { iso3: 'CHN', name: 'People\'s Republic of China' },
    { iso3: 'PHL', name: 'Philippines' },
    { iso3: 'PCN', name: 'Pitcairn' },
    { iso3: 'KOR', name: 'Republic of Korea' },
    { iso3: 'WSM', name: 'Samoa' },
    { iso3: 'SGP', name: 'Singapore' },
    { iso3: 'SLB', name: 'Solomon Islands' },
    { iso3: 'LKA', name: 'Sri Lanka' },
    { iso3: 'TWN', name: 'Taipei,China' },
    { iso3: 'TJK', name: 'Tajikistan' },
    { iso3: 'THA', name: 'Thailand' },
    { iso3: 'TLS', name: 'Timor-Leste' },
    { iso3: 'TKL', name: 'Tokelau' },
    { iso3: 'TON', name: 'Tonga' },
    { iso3: 'TUR', name: 'Türkiye' },
    { iso3: 'TKM', name: 'Turkmenistan' },
    { iso3: 'TUV', name: 'Tuvalu' },
    { iso3: 'UMI', name: 'United States Minor Outlying Islands' },
    { iso3: 'UZB', name: 'Uzbekistan' },
    { iso3: 'VUT', name: 'Vanuatu' },
    { iso3: 'VNM', name: 'Viet Nam' },
    { iso3: 'WLF', name: 'Wallis and Futuna Islands' },
];

export const countriesByRegion = listToMap(
    regions,
    (region) => region.key,
    (region) => region.countries,
);

export const countryWithRegionMap = Object.entries(countriesByRegion)
    .map(([key, value]) => (
        listToMap(value, (d) => d, () => key)
    )).reduce((acc, item) => ({ ...item, ...acc }), {});

export const countriesNameMap = listToMap(
    countries,
    (country) => country.iso3,
    (country) => country.name,
);

export const regionsNameMap = listToMap(
    regions,
    (country) => country.key,
    (country) => country.value,
);

export const regionCountriesLabel = listToMap(
    regions,
    (region) => region.key,
    (region) => {
        const countriesLabels = region.countries.map((country) => countriesNameMap[country]);
        return `Countries: ${countriesLabels.join(', ')}`;
    },
);
