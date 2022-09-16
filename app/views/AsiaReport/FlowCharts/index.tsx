import React, { useEffect, useState } from 'react';
import { _cs } from '@togglecorp/fujs';

import Tabs from '#components/Tabs';
import TabPanel from '#components/Tabs/TabPanel';
import Tab from '#components/Tabs/Tab';
import Svg from '#components/Svg';

import chartAllRegions from '#resources/img/all_chart.svg';
import chartEa from '#resources/img/ea_chart.svg';
import chartCwa from '#resources/img/cwa_chart.svg';
import chartSa from '#resources/img/sa_chart.svg';
import chartSea from '#resources/img/sea_chart.svg';
import chartTp from '#resources/img/tp_chart.svg';

import {
    regionalBreakdownCaption,
    reportLink,
} from '../data';
import InfographicCaption from '../InfographicCaption';

import styles from './styles.css';

type ChartSelections = 'all' | 'ea' | 'sea' | 'cwa' | 'tp' | 'sa';

const items = [
    {
        key: 'all-floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'all-storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'all-earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'all-volcanic',
        link: `${reportLink}#page=15`,
    },
    {
        key: 'all-droughts',
        link: `${reportLink}#page=16`,
    },
    {
        key: 'all-extreme',
        link: `${reportLink}#page=16`,
    },

    {
        key: 'cwa-floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'cwa-storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'cwa-earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'cwa-volcanic',
        link: `${reportLink}#page=15`,
    },
    {
        key: 'cwa-droughts',
        link: `${reportLink}#page=16`,
    },
    {
        key: 'cwa-extreme',
        link: `${reportLink}#page=16`,
    },

    {
        key: 'sea-floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'sea-storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'sea-earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'sea-volcanic',
        link: `${reportLink}#page=15`,
    },
    {
        key: 'sea-droughts',
        link: `${reportLink}#page=16`,
    },
    {
        key: 'sea-extreme',
        link: `${reportLink}#page=16`,
    },

    {
        key: 'EA-floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'EA-storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'EA-earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'EA-volcanic',
        link: `${reportLink}#page=15`,
    },
    {
        key: 'EA-droughts',
        link: `${reportLink}#page=16`,
    },
    {
        key: 'EA-extreme',
        link: `${reportLink}#page=16`,
    },

    {
        key: 'SouthAsia-Floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'SouthAsia-Storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'SouthAsia-Earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'SouthAsia-Droughts',
        link: `${reportLink}#page=16`,
    },

    {
        key: 'tp-floods',
        link: `${reportLink}#page=12`,
    },
    {
        key: 'tp-storms',
        link: `${reportLink}#page=13`,
    },
    {
        key: 'tp-earthquake',
        link: `${reportLink}#page=14`,
    },
    {
        key: 'tp-volcanic',
        link: `${reportLink}#page=15`,
    },
    {
        key: 'tp-droughts',
        link: `${reportLink}#page=16`,
    },
    {
        key: 'tp-extreme',
        link: `${reportLink}#page=16`,
    },
];

interface Props {
    className?: string;
}

function FlowCharts(props: Props) {
    const {
        className,
    } = props;
    const [selectedChart, setSelectedChart] = useState<ChartSelections>('all');

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                items.forEach((item) => {
                    const itemGroup = document.getElementById(item.key);
                    if (itemGroup) {
                        itemGroup.style.cursor = 'pointer';
                        itemGroup.onclick = () => { window.open(item.link, '_blank'); };
                    }
                });
            },
            500,
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Tabs
            value={selectedChart}
            onChange={setSelectedChart}
            variant="secondary"
        >
            <div className={_cs(className, styles.flowCharts)}>
                <div className={styles.regionalBreakdownTabs}>
                    <Tab
                        className={styles.tab}
                        name="all"
                    >
                        All Regions
                    </Tab>
                    <Tab
                        className={styles.tab}
                        name="cwa"
                    >
                        Central and West Asia
                    </Tab>
                    <Tab
                        className={styles.tab}
                        name="ea"
                    >
                        East Asia
                    </Tab>
                    <Tab
                        className={styles.tab}
                        name="tp"
                    >
                        The Pacific
                    </Tab>
                    <Tab
                        className={styles.tab}
                        name="sea"
                    >
                        Southeast Asia
                    </Tab>
                    <Tab
                        className={styles.tab}
                        name="sa"
                    >
                        South Asia
                    </Tab>
                </div>
                <TabPanel
                    className={styles.tabPanel}
                    name="all"
                >
                    <Svg
                        className={styles.chart}
                        src={chartAllRegions}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdown.jpg"
                        informationShown
                    />
                </TabPanel>
                <TabPanel
                    className={styles.tabPanel}
                    name="ea"
                >
                    <Svg
                        className={styles.chart}
                        src={chartEa}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdownEA.jpg"
                        informationShown
                    />
                </TabPanel>
                <TabPanel
                    className={styles.tabPanel}
                    name="sea"
                >
                    <Svg
                        className={styles.chart}
                        src={chartSea}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdownSEA.jpg"
                        informationShown
                    />
                </TabPanel>
                <TabPanel
                    className={styles.tabPanel}
                    name="cwa"
                >
                    <Svg
                        className={styles.chart}
                        src={chartCwa}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdownCWA.jpg"
                        informationShown
                    />
                </TabPanel>
                <TabPanel
                    className={styles.tabPanel}
                    name="sa"
                >
                    <Svg
                        className={styles.chart}
                        src={chartSa}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdownSA.jpg"
                        informationShown
                    />
                </TabPanel>
                <TabPanel
                    className={styles.tabPanel}
                    name="tp"
                >
                    <Svg
                        className={styles.chart}
                        src={chartTp}
                    />
                    <InfographicCaption
                        caption={regionalBreakdownCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_DisasterBreakdownP.jpg"
                        informationShown
                    />
                </TabPanel>
            </div>
        </Tabs>
    );
}

export default FlowCharts;
