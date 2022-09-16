import React, { useCallback, useState, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import ImageZoom from 'react-image-zooom';
import {
    MdPictureAsPdf,
    MdArrowRightAlt,
    MdArrowLeft,
    MdMenu,
} from 'react-icons/md';
import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoLinkedin,
    IoLogoYoutube,
} from 'react-icons/io5';
import { SelectInput } from '@togglecorp/toggle-ui';

import Button from '#components/Button';
import Header from '#components/Header';
import TextOutput from '#components/TextOutput';
import ButtonLikeLink from '#components/ButtonLikeLink';
import Carousel from '#components/Carousel';
import CarouselItem from '#components/Carousel/CarouselItem';
import CarouselButton from '#components/Carousel/CarouselButton';
import useBooleanState from '#hooks/useBooleanState';

import idmcLogo from '#resources/img/idmc-white.svg';
import adbLogo from '#resources/img/adb.png';
import bubbles from '#resources/img/bubbles.png';
import pieEa from '#resources/img/pie_ea.png';
import pieCwa from '#resources/img/pie_cwa.png';
import pieSa from '#resources/img/pie_sa.png';
import pieSea from '#resources/img/pie_sea.png';
import pieTp from '#resources/img/pie_tp.png';

import china from '#resources/img/china.jpg';
import indonesia from '#resources/img/indonesia.jpg';
import pakistan from '#resources/img/pakistan.jpg';
import japan2 from '#resources/img/japan2.jpg';
import tent from '#resources/img/tent.jpg';
import nepal2 from '#resources/img/nepal2.jpg';
import indonesia2 from '#resources/img/indonesia2.jpg';
import papua from '#resources/img/papua.jpg';
import vanautu from '#resources/img/vanautu.jpg';
import vietnam from '#resources/img/vietnam.jpg';
import bookCover from '#resources/img/book-cover.png';

import { regionCountriesLabel } from '#utils/common';

import {
    heroParagraph1,
    heroParagraph2,
    pieChartCaption,
    costOfDisasterParagraph1,
    costOfDisasterParagraph2,
    wayForwardParagraph1,
    wayForwardParagraph2,
    contactParagraph,
    copyrightParagraph,
    tentCaption,
    tentSubCaption,
    mainQuote,
    mainQuoter,
    vietnamCaption,
    vietnamSubCaption,
    chinaCaption,
    chinaSubCaption,
    pakistanCaption,
    pakistanSubCaption,
    japanCaption,
    japanSubCaption,
    regionalBreakdownDescription1,
    regionalBreakdownDescription2,
    regionalBreakdownDescription3,
    regionalBreakdownDescription4,
    papuaSpotlightTitle,
    reportLink,
    idmcAddress,
    wayForwardListItem1,
    wayForwardListItem2,
    wayForwardListItem3,
    wayForwardListItem4,
    wayForwardListItem5,
} from './data';
import CostOfDisasterImage from './CostOfDisasterImage';
import DisasterDashboard from './DisasterDashboard';
import WayForwardContent from './WayForwardContent';
import InfographicCaption from './InfographicCaption';
import FlowCharts from './FlowCharts';

import styles from './styles.css';

const sectionOptions = [
    {
        key: 'foreward',
        label: 'Foreword',
        startPage: '7',
    },
    {
        label: 'Key Messages and Findings',
        key: 'Key Messages and Findings',
        startPage: '8',
    },
    {
        label: 'Introduction',
        key: 'Introduction',
        startPage: '9',
    },
    {
        label: 'Definitions, Methodological Considerations, and Caveats',
        key: 'Definitions, Methodological Considerations, and Caveats',
        startPage: '9',
    },
    {
        label: 'Part 1: Internal Displacement Trends in Asia and the Pacific (2010−2021)',
        key: 'Part 1: Internal Displacement Trends in Asia and the Pacific (2010−2021)',
        startPage: '10',
    },
    {
        label: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in Asia and the Pacific',
        key: 'Part 2: Measuring the Social and Economic Impacts of Disaster Displacement in Asia and the Pacific',
        startPage: '28',
    },
    {
        label: 'Part 3: Understanding Displacement in Disaster Prevention, Response, and Recovery',
        key: 'Part 3: Understanding Displacement in Disaster Prevention, Response, and Recovery',
        startPage: '37',
    },
    {
        label: 'Part 4: Addressing Disaster Displacement: Progress in Policy and the Way Forward',
        key: 'Part 4: Addressing Disaster Displacement: Progress in Policy and the Way Forward',
        startPage: '45',
    },
    {
        label: 'Conclusion',
        key: 'Conclusion',
        startPage: '52',
    },
    {
        label: 'Appendix',
        key: 'Appendix',
        startPage: '53',
    },
];

const keyFindings = [
    {
        key: '1',
        description: 'There were over 225 million internal displacements—or movements—in Asia and the Pacific during 2010−2021, which was over three-quarters of the global total for this period.',
    },
    {
        key: '2',
        description: 'East Asia and Southeast Asia had the highest number of disaster displacements—nearly two-thirds of the total— closely followed by South Asia. All three subregions are densely populated and highly exposed to various hazards. Pacific island states bear the greatest displacement risk relative to their population size.',
    },
    {
        key: '3',
        description: 'Weather-related hazards—such as monsoon rains and tropical storms—were responsible for 95% of all disaster displacements across the region during 2010−2021.',
    },
    {
        key: '4',
        description: 'Financial costs and losses weigh disproportionately on those with limited resources. Each time a person is displaced, costs arise. Economic impacts add up when displaced people are uprooted for months, years, or even decades.',
    },
    {
        key: '5',
        description: 'Investment in sustainable development and taking early action to address internal displacement will be more effective and less costly than relying on humanitarian aid in the long term. Robust data on the scale, duration, and severity of disaster displacement —as well as its impacts on people and economies—will help guide actions to mitigate the negative consequences and seize potential opportunities for risk reduction and solutions.',
    },
    {
        key: '6',
        description: ' There has been significant progress across the region to develop disaster displacement policies and translate words into action. Much still remains to be done to effectively mitigate the impact of disaster displacement on individuals, societies, and economies.',
    },
];

const keyMessages = [
    {
        key: '1',
        description: 'Asia and the Pacific is the region most affected by disaster displacement worldwide. ',
    },
    {
        key: '2',
        description: 'The cost of disasters in the region is estimated to be several hundred billions of dollars each year. This does not include the economic impact of displacement itself.',
    },
    {
        key: '3',
        description: 'Climate change—combined with the rapid urbanization of the region and other factors—may significantly heighten future displacement risk and related costs.',
    },
    {
        key: '4',
        description: 'Investment in the prevention of disaster displacement is displacement worldwide. the only sustainable course of action for the socioeconomic development of the region.',
    },
    {
        key: '5',
        description: 'The region already has successful initiatives to prevent, monitor, respond to, and end disaster displacement that can inform future action.',
    },
];

const wayForward = [
    {
        key: '1',
        description: wayForwardListItem1,
    },
    {
        key: '2',
        description: wayForwardListItem2,
    },
    {
        key: '3',
        description: wayForwardListItem3,
    },
    {
        key: '4',
        description: wayForwardListItem4,
    },
    {
        key: '5',
        description: wayForwardListItem5,
    },
];

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
                        name="social-and-economic-impacts"
                        onClick={handleNavClick}
                        className={styles.navItem}
                        variant="transparent"
                    >
                        Social and economic impacts
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
                        headingClassName={styles.heading}
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
            <div className={_cs(styles.dividerImage, styles.center)}>
                <img
                    src={indonesia}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {mainQuote}
                    <div>
                        {mainQuoter}
                    </div>
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
                    <Header
                        heading="Disaster Displacements in the Asia and Pacific Region (2010−2021)"
                        headingSize="large"
                    />
                    <ImageZoom
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
                    <InfographicCaption
                        caption={pieChartCaption}
                        downloadLink="https://www.internal-displacement.org/sites/default/files/220919_IDMC_AsiaReport_InternalDisplacementsbyDisasters.jpg"
                        informationShown
                    />
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
                    <div>
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
                    <WayForwardContent
                        data={keyMessages}
                    />
                </div>
            </section>
            <section className={_cs(styles.keyFindings, styles.section)}>
                <div className={_cs(styles.keyFindingsContent, styles.sectionContent)}>
                    <Header
                        heading="Key Findings"
                        headingSize="large"
                    />
                    <WayForwardContent
                        data={keyFindings}
                    />
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={pakistan}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {pakistanCaption}
                    <div>
                        {pakistanSubCaption}
                    </div>
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
                        <div className={styles.descriptionContainer}>
                            <p className={styles.descriptionParagraph}>
                                {regionalBreakdownDescription1}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {regionalBreakdownDescription2}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {regionalBreakdownDescription3}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {regionalBreakdownDescription4}
                            </p>
                        </div>
                        <FlowCharts />
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={japan2}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaption}>
                    {japanCaption}
                    <div>
                        {japanSubCaption}
                    </div>
                </div>
            </div>
            <section
                className={_cs(styles.costOfDisaster, styles.section)}
                id="social-and-economic-impacts"
            >
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Social and economic impacts"
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
                            <InfographicCaption
                                caption="Impacts of internal displacement"
                                informationShown
                            />
                        </div>
                    </div>
                    <Carousel
                        className={styles.bottomContainer}
                        numberOfVisibleItems={visibleItems}
                    >
                        <CarouselButton
                            className={styles.carouselButton}
                            action="prev"
                        />
                        <div className={styles.itemList}>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={1}
                            >
                                <a
                                    href={`${reportLink}#page=30`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={indonesia2}
                                        alt=""
                                    />
                                    <div className={styles.caption}>
                                        <div className={styles.subHeading}>
                                            Flood-related Displacement in Jakarta, Indonesia
                                        </div>
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={2}
                            >
                                <a
                                    href={`${reportLink}#page=32`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={nepal2}
                                        alt=""
                                    />
                                    <div className={styles.caption}>
                                        <div className={styles.subHeading}>
                                            7 Years after the Gorkha Earthquake in Nepal
                                        </div>
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={3}
                            >
                                <a
                                    href={`${reportLink}#page=33`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={papua}
                                        alt=""
                                    />
                                    <div className={styles.caption}>
                                        <div className={styles.subHeading}>
                                            {papuaSpotlightTitle}
                                        </div>
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem
                                className={styles.spotlightItem}
                                order={4}
                            >
                                <a
                                    href={`${reportLink}#page=35`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img
                                        className={styles.spotlightImage}
                                        src={vanautu}
                                        alt=""
                                    />
                                    <div className={styles.caption}>
                                        <div className={styles.subHeading}>
                                            Differentiated Impacts of Displacement in Vanuatu
                                        </div>
                                    </div>
                                </a>
                            </CarouselItem>
                        </div>
                        <CarouselButton
                            className={styles.carouselButton}
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
                    <div>
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
                        <WayForwardContent
                            className={styles.listContainer}
                            data={wayForward}
                        />
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
                    <div>
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
                                    href={reportLink}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <MdPictureAsPdf />
                                    Download full report
                                    <MdArrowRightAlt />
                                </a>
                            </div>
                            <div className={styles.selectSectionContainer}>
                                <div className={styles.separator}>
                                    Or, select a section
                                </div>
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
                                    href={`${reportLink}${pageSuffix}`}
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
                    <div className={styles.logoContainer}>
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
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.leftContainer}>
                            <Header
                                heading="Contact"
                                headingClassName={styles.text}
                                headingDescription="Internal Displacement Monitoring Center (IDMC)"
                            />
                            <div>
                                <p className={styles.paragraph}>
                                    {idmcAddress}
                                </p>
                                <TextOutput
                                    labelContainerClassName={styles.text}
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
                                    labelContainerClassName={styles.text}
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
                                headingClassName={styles.text}
                                heading="About us"
                            />
                            <p className={styles.paragraph}>
                                {contactParagraph}
                            </p>
                            <div className={styles.socialLinks}>
                                <a
                                    href="https://www.facebook.com/IDMC.Geneva"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoFacebook />
                                </a>
                                <a
                                    href="https://twitter.com/IDMC_Geneva"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoTwitter />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/internal-displacement-monitoring-centre-idmc-"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoLinkedin />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCKEgRCcKKPNezkF3FLlfBRQ"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <IoLogoYoutube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AsiaReport;
