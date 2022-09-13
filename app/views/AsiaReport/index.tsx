import React, { useCallback, useState, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    MdPictureAsPdf,
    MdArrowRightAlt,
    MdArrowLeft,
    MdMenu,
} from 'react-icons/md';
import { SelectInput } from '@togglecorp/toggle-ui';

import Button from '#components/Button';
import Header from '#components/Header';
import TextOutput from '#components/TextOutput';
import Tabs from '#components/Tabs';
import TabPanel from '#components/Tabs/TabPanel';
import Tab from '#components/Tabs/Tab';
import ButtonLikeLink from '#components/ButtonLikeLink';
import Svg from '#components/Svg';
import Carousel from '#components/Carousel';
import CarouselItem from '#components/Carousel/CarouselItem';
import CarouselButton from '#components/Carousel/CarouselButton';
import useBooleanState from '#hooks/useBooleanState';

import idmcLogo from '#resources/img/idmc.svg';
import nrcLogo from '#resources/img/nrc.png';
import adbLogo from '#resources/img/adb.png';
import bubbles from '#resources/img/bubbles.png';
import pieEa from '#resources/img/pie_ea.png';
import pieCwa from '#resources/img/pie_cwa.png';
import pieSa from '#resources/img/pie_sa.png';
import pieSea from '#resources/img/pie_sea.png';
import pieTp from '#resources/img/pie_tp.png';

import chartAllRegions from '#resources/img/all_chart.svg';
import chartEa from '#resources/img/ea_chart.svg';
import chartCwa from '#resources/img/cwa_chart.svg';
import chartSa from '#resources/img/sa_chart.svg';
import chartSea from '#resources/img/sea_chart.svg';
import chartTp from '#resources/img/tp_chart.svg';

import china from '#resources/img/china.jpg';
import indonesia from '#resources/img/indonesia.jpg';
import japan from '#resources/img/japan.jpg';
import nepal from '#resources/img/nepal.jpg';
import pakistan from '#resources/img/pakistan.jpg';
import philippines from '#resources/img/philippines.jpg';
import philippines2 from '#resources/img/philippines-2.jpg';
import tent from '#resources/img/tent.jpg';
import vanautu from '#resources/img/vanautu.jpg';
import vietnam from '#resources/img/vietnam.jpg';
import bookCover from '#resources/img/book-cover.png';
import { regionCountriesLabel } from '#utils/common';

import {
    heroParagraph1,
    heroParagraph2,
    heroParagraph3,
    pieChartCaption,
    pieChartCaptionSource,
    costOfDisasterParagraph1,
    costOfDisasterParagraph2,
    wayForwardParagraph1,
    wayForwardParagraph2,
    contactParagraph,
    copyrightParagraph,
    tentCaption,
    tentSubCaption,
    vietnamCaption,
    vietnamSubCaption,
    chinaCaption,
    chinaSubCaption,
    regionalBreakdownCaption,
    regionalBreakdownDescription,
} from './data';
import CostOfDisasterImage from './CostOfDisasterImage';

import DisasterDashboard from './DisasterDashboard';
import KeyMessagesContent from './KeyMessagesContent';
import KeyFindingsContent from './KeyFindingsContent';
import WayForwardContent from './WayForwardContent';

import styles from './styles.css';

const sectionOptions = [
    {
        key: '1st-section',
        label: '1st section',
        startPage: '12',
    },
    {
        key: '2nd-section',
        label: '2nd section',
        startPage: '25',
    },
    {
        key: '3rd-section',
        label: '3rd section',
        startPage: '50',
    },
];

type ChartSelections = 'all' | 'ea' | 'sea' | 'cwa' | 'tp' | 'sa';

const sectionKeySelector = (section: { key: string }) => section.key;
const sectionLabelSelector = (section: { label: string }) => section.label;

interface Props {
    className?: string;
}

function AsiaReport(props: Props) {
    const {
        className,
    } = props;

    const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
    const [selectedChart, setSelectedChart] = useState<ChartSelections>('all');
    const [isNavShown, , , , toggleNavVisibility] = useBooleanState(false);

    const pageSuffix = useMemo(() => {
        const selectedSectionObj = sectionOptions.find(
            (section) => section.key === selectedSection,
        );
        if (!selectedSectionObj) {
            return '';
        }
        return `#page=${selectedSectionObj.startPage}`;
    }, [selectedSection]);

    const handleNavClick = useCallback((itemHash) => {
        const elementToScrollTo = document.getElementById(itemHash);

        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);
    const [visibleItems, setVisibleItems] = useState(2);
    const debounceTimeoutRef = React.useRef<number>();
    React.useEffect(() => {
        const onNumberOfVisibleItemsChange = () => {
            window.clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = window.setTimeout(() => {
                const width = document.documentElement.clientWidth;
                if (width < 720) {
                    setVisibleItems(1);
                // } else if (width < 1200) {
                //     setVisibleItems(2);
                } else {
                    setVisibleItems(2);
                }
            }, 200);
        };

        window.addEventListener('resize', onNumberOfVisibleItemsChange);
        onNumberOfVisibleItemsChange();

        return () => {
            window.removeEventListener('resize', onNumberOfVisibleItemsChange);
        };
    }, []);

    return (
        <div
            id="asia-report"
            className={_cs(styles.asiaReport, className)}
        >
            <nav className={styles.nav}>
                <div className={styles.leftContainer}>
                    <ButtonLikeLink
                        className={styles.button}
                        href="https://www.internal-displacement.org"
                        target="_blank"
                        icons={(
                            <MdArrowLeft />
                        )}
                        rel="noreferrer noopener"
                    >
                        Back to IDMC Website
                    </ButtonLikeLink>
                    <Button
                        className={styles.menu}
                        name="toggle"
                        onClick={toggleNavVisibility}
                        variant="transparent"
                    >
                        <MdMenu />
                    </Button>
                </div>
                <div
                    className={_cs(
                        styles.navItemsContainer,
                        isNavShown && styles.navShown,
                    )}
                >
                    <Button
                        name="at-a-glance"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        At a glance
                    </Button>
                    <Button
                        name="key-findings"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Key messages and findings
                    </Button>
                    <Button
                        name="explore-the-data"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Explore the data
                    </Button>
                    <Button
                        name="cost-of-displacement"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Cost of Displacement
                    </Button>
                    <Button
                        name="way-forward"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        The way forward
                    </Button>
                    <Button
                        name="download-report"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Download report
                    </Button>
                </div>
            </nav>
            <section className={_cs(styles.hero, styles.section)}>
                <div className={_cs(styles.heroContent, styles.sectionContent)}>
                    <img
                        className={styles.logo}
                        src={idmcLogo}
                        alt=""
                    />
                    <Header
                        heading="Disaster Displacement"
                        headingDescription="in Asia and the Pacific"
                        headingDescriptionClassName={styles.headingDescription}
                        headingSize="large"
                        hideHeadingBorder
                    />
                    <div className={styles.description}>
                        <div className={styles.descriptionHeading}>
                            A Business Case for Investment in Prevention and Solutions
                        </div>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph2}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {heroParagraph3}
                        </p>
                    </div>
                    <footer className={styles.heroFooter}>
                        <img
                            className={styles.logo}
                            src={idmcLogo}
                            alt=""
                        />
                        <img
                            className={styles.adbLogo}
                            src={adbLogo}
                            alt=""
                        />
                    </footer>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={indonesia}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    Caption of Image
                </div>
            </div>
            <section
                className={_cs(styles.glance, styles.section)}
                id="at-a-glance"
            >
                <div className={_cs(styles.glanceContent, styles.sectionContent)}>
                    <Header
                        heading="At a glance"
                        headingSize="large"
                    />
                    <iframe
                        className={styles.videoIframe}
                        title="glance-video"
                        src="https://www.youtube.com/embed/AvJKuUM3vjk"
                    />
                    <img
                        alt="bubbles"
                        src={bubbles}
                        className={styles.bubblesChart}
                    />
                    <div className={styles.pieContainer}>
                        <img
                            alt="pie-ea"
                            src={pieEa}
                            className={styles.pie}
                            title={regionCountriesLabel.ea}
                        />
                        <img
                            alt="pie-sa"
                            src={pieSa}
                            className={styles.pie}
                            title={regionCountriesLabel.sa}
                        />
                        <img
                            alt="pie-sea"
                            src={pieSea}
                            className={styles.pie}
                            title={regionCountriesLabel.sea}
                        />
                        <img
                            alt="pie-cwa"
                            src={pieCwa}
                            className={styles.pie}
                            title={regionCountriesLabel.cwa}
                        />
                        <img
                            alt="pie-tp"
                            src={pieTp}
                            className={styles.pie}
                            title={regionCountriesLabel.tp}
                        />
                    </div>
                    <div className={styles.captionContainer}>
                        <i>{pieChartCaption}</i>
                        <i className={styles.subCaption}>
                            {pieChartCaptionSource}
                        </i>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={tent}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {tentCaption}
                    <div className={styles.subCaption}>
                        {tentSubCaption}
                    </div>
                </div>
            </div>
            <section
                id="key-findings"
                className={_cs(styles.keyMessages, styles.section)}
            >
                <div className={_cs(styles.keyMessagesContent, styles.sectionContent)}>
                    <Header
                        heading="Key Messages"
                        headingSize="large"
                    />
                    <KeyMessagesContent />
                </div>
            </section>
            <section className={_cs(styles.keyFindings, styles.section)}>
                <div className={_cs(styles.keyFindingsContent, styles.sectionContent)}>
                    <Header
                        heading="Key Findings"
                        headingSize="large"
                    />
                    <KeyFindingsContent />
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={pakistan}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    Caption of Image of Pakistan
                </div>
            </div>
            <section
                className={_cs(styles.idTrends, styles.section)}
                id="explore-the-data"
            >
                <div className={_cs(styles.idTrendsContent, styles.sectionContent)}>
                    <Header
                        heading="Internal Displacement Trends in Asia and the Pacific (2010-2021)"
                        headingSize="large"
                    />
                    <DisasterDashboard />
                    <Header
                        heading="Disaster Displacement Breakdown"
                        headingSize="large"
                    />
                    <div className={styles.idTrendTopContainer}>
                        <p className={styles.descriptionParagraph}>
                            {regionalBreakdownDescription}
                        </p>
                        <Tabs
                            value={selectedChart}
                            onChange={setSelectedChart}
                            variant="secondary"
                        >
                            <div className={styles.regionalBreakdown}>
                                <div className={styles.regionalBreakdownTabs}>
                                    <Tab
                                        className={styles.tab}
                                        name="all"
                                    >
                                        All Regions
                                    </Tab>
                                    <Tab
                                        className={styles.tab}
                                        name="ea"
                                    >
                                        East Asia
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
                                    <Tab
                                        className={styles.tab}
                                        name="cwa"
                                    >
                                        Central and West Asia
                                    </Tab>
                                    <Tab
                                        className={styles.tab}
                                        name="tp"
                                    >
                                        The Pacific
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
                                </TabPanel>
                                <TabPanel
                                    className={styles.tabPanel}
                                    name="ea"
                                >
                                    <Svg
                                        className={styles.chart}
                                        src={chartEa}
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
                                </TabPanel>
                                <TabPanel
                                    className={styles.tabPanel}
                                    name="cwa"
                                >
                                    <Svg
                                        className={styles.chart}
                                        src={chartCwa}
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
                                </TabPanel>
                                <TabPanel
                                    className={styles.tabPanel}
                                    name="tp"
                                >
                                    <Svg
                                        className={styles.chart}
                                        src={chartTp}
                                    />
                                </TabPanel>
                                <i>
                                    {regionalBreakdownCaption}
                                </i>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={philippines}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    Caption of Image of Philippines
                </div>
            </div>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="cost-of-displacement"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Cost of Disaster Displacement"
                        headingSize="large"
                    />
                    <div className={styles.topContainer}>
                        <div className={styles.description}>
                            <p className={styles.descriptionParagraph}>
                                {costOfDisasterParagraph1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {costOfDisasterParagraph2}
                            </p>
                        </div>
                        <div className={styles.rightContainer}>
                            <CostOfDisasterImage
                                className={styles.svg}
                            />
                            <i>
                                Figure: Internal displacement’s impacts
                            </i>
                        </div>
                    </div>
                    <Carousel
                        className={styles.bottomContainer}
                        numberOfVisibleItems={visibleItems}
                    >
                        <CarouselButton
                            className={_cs(styles.carouselButton, styles.prev)}
                            action="prev"
                        />
                        <div className={styles.itemList}>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={1}
                            >
                                <img
                                    className={styles.spotlightImage}
                                    src={vanautu}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.heading}>
                                        Spotlight 1
                                    </div>
                                    <div className={styles.subHeading}>
                                        Food related displacement in Jakarta, Indonesia
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={2}
                            >
                                <img
                                    className={styles.spotlightImage}
                                    src={philippines2}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.heading}>
                                        Spotlight 2
                                    </div>
                                    <div className={styles.subHeading}>
                                        Food related displacement in Jakarta, Indonesia
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={3}
                            >
                                <img
                                    className={styles.spotlightImage}
                                    src={nepal}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.heading}>
                                        Spotlight 3
                                    </div>
                                    <div className={styles.subHeading}>
                                        Food related displacement in Jakarta, Indonesia
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={4}
                            >
                                <img
                                    className={styles.spotlightImage}
                                    src={japan}
                                    alt=""
                                />
                                <div className={styles.caption}>
                                    <div className={styles.heading}>
                                        Spotlight 4
                                    </div>
                                    <div className={styles.subHeading}>
                                        Food related displacement in Jakarta, Indonesia
                                    </div>
                                </div>
                            </CarouselItem>
                        </div>
                        <CarouselButton
                            className={_cs(styles.carouselButton, styles.next)}
                            action="next"
                        />
                    </Carousel>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={vietnam}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {vietnamCaption}
                    <div className={styles.subCaption}>
                        {vietnamSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.wayForward, styles.section)}
                id="way-forward"
            >
                <div className={_cs(styles.wayForwardContent, styles.sectionContent)}>
                    <Header
                        heading="The Way Forward"
                        headingSize="large"
                    />
                    <div className={styles.description}>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardParagraph1}
                        </p>
                        <WayForwardContent className={styles.listContainer} />
                        <p className={styles.descriptionParagraph}>
                            {wayForwardParagraph2}
                        </p>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={china}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {chinaCaption}
                    <div className={styles.subCaption}>
                        {chinaSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.download, styles.section)}
                id="download-report"
            >
                <div className={_cs(styles.downloadContent, styles.sectionContent)}>
                    <Header
                        heading="Download"
                        headingSize="large"
                    />
                    <div className={styles.topContent}>
                        <div className={styles.leftContent}>
                            <img
                                src={bookCover}
                                className={styles.bookCover}
                                alt=""
                            />
                        </div>
                        <div className={styles.rightContent}>
                            <div className={styles.linksContainer}>
                                <a
                                    className={styles.downloadLink}
                                    href="https://www.internal-displacement.org/sites/default/files/publications/documents/IDMC_GRID_2022_LR.pdf"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <MdPictureAsPdf />
                                    Download full report
                                    <MdArrowRightAlt />
                                </a>
                                <a
                                    className={styles.downloadLink}
                                    href="https://www.internal-displacement.org/sites/default/files/publications/documents/IDMC_GRID_2022_LR.pdf"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <MdPictureAsPdf />
                                    Download full report (High quality)
                                    <MdArrowRightAlt />
                                </a>
                            </div>
                            <div className={styles.selectSectionContainer}>
                                Or select a section
                                <SelectInput
                                    className={styles.selectInput}
                                    inputSectionClassName={styles.inputSection}
                                    placeholder=""
                                    name="section"
                                    value={selectedSection}
                                    options={sectionOptions}
                                    keySelector={sectionKeySelector}
                                    labelSelector={sectionLabelSelector}
                                    onChange={setSelectedSection}
                                />
                                <ButtonLikeLink
                                    className={styles.button}
                                    disabled={!selectedSection}
                                    href={`https://www.internal-displacement.org/sites/default/files/publications/documents/IDMC_GRID_2022_LR.pdf${pageSuffix}`}
                                    target="_blank"
                                    icons={(
                                        <MdPictureAsPdf />
                                    )}
                                    actions={(
                                        <MdArrowRightAlt />
                                    )}
                                    rel="noreferrer noopener"
                                >
                                    View Section
                                </ButtonLikeLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={_cs(styles.footer, styles.section)}>
                <div className={_cs(styles.footerContent, styles.sectionContent)}>
                    <div className={styles.leftContainer}>
                        <div className={styles.logoContainer}>
                            <img
                                className={styles.logo}
                                src={idmcLogo}
                                alt=""
                            />
                            <img
                                className={styles.logo}
                                src={nrcLogo}
                                alt=""
                            />
                        </div>
                        <Header
                            heading="Contact"
                            headingDescription="Internal Displacement Monitoring Center (IDMC)"
                        />
                        <div>
                            <p className={styles.paragraph}>
                                Humanitarian Hub Office, La Voie Creuse 16, 1202 Geneva, Switzerland
                            </p>
                            <TextOutput
                                label="General Inquiries"
                                value={(
                                    <a
                                        className={styles.link}
                                        href="mailto:info@idmc.ch"
                                    >
                                        info@idmc.ch
                                    </a>
                                )}
                            />
                            <TextOutput
                                label="Media Inquiries"
                                value={(
                                    <a
                                        className={styles.link}
                                        href="mailto:media@idmc.ch"
                                    >
                                        media@idmc.ch
                                    </a>
                                )}
                            />
                        </div>
                        <p className={styles.paragraph}>
                            {copyrightParagraph}
                        </p>
                    </div>
                    <div className={styles.rightContainer}>
                        <Header
                            heading="About us"
                        />
                        <p className={styles.paragraph}>
                            {contactParagraph}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AsiaReport;
