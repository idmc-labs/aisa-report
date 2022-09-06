import React, { useState, useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    MdPictureAsPdf,
    MdArrowRightAlt,
} from 'react-icons/md';
import { SelectInput } from '@togglecorp/toggle-ui';

import TooltipIcon from '#components/TooltipIcon';
import Header from '#components/Header';
import TextOutput from '#components/TextOutput';

import idmcLogo from '#resources/img/idmc.svg';
import nrcLogo from '#resources/img/nrc.png';
import adbLogo from '#resources/img/adb.png';
import bubbles from '#resources/img/bubbles.png';
import pieEa from '#resources/img/pie_ea.png';
import pieCwa from '#resources/img/pie_cwa.png';
import pieSa from '#resources/img/pie_sa.png';
import pieSea from '#resources/img/pie_sea.png';
import pieTp from '#resources/img/pie_tp.png';

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

import {
    heroParagraph1,
    heroParagraph2,
    heroParagraph3,
    costOfDisasterParagraph1,
    costOfDisasterParagraph2,
    wayForwardParagraph1,
    wayForwardParagraph2,
    wayForwardListItem1,
    wayForwardListItem2,
    wayForwardListItem3,
    wayForwardListItem4,
    wayForwardListItem5,
    contactParagraph,
    copyrightParagraph,
} from './data';

import DisasterDashboard from './DisasterDashboard';
import KeyMessagesContent from './KeyMessagesContent';
import KeyFindingsContent from './KeyFindingsContent';

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

    const pageSuffix = useMemo(() => {
        const selectedSectionObj = sectionOptions.find(
            (section) => section.key === selectedSection,
        );
        if (!selectedSectionObj) {
            return '';
        }
        return `#page=${selectedSectionObj.startPage}`;
    }, [selectedSection]);

    return (
        <div className={_cs(styles.asiaReport, className)}>
            <nav className={styles.nav}>
                <div className={styles.itemsContainer}>
                    <a
                        href="#at-a-glance"
                        className={styles.navItem}
                    >
                        At a glance
                    </a>
                    <a
                        href="#key-findings"
                        className={styles.navItem}
                    >
                        Key findings
                    </a>
                    <a
                        href="#explore-the-data"
                        className={styles.navItem}
                    >
                        Explore the data
                    </a>
                    <a
                        href="#download-report"
                        className={styles.navItem}
                    >
                        Download report
                    </a>
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
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image
                    </div>
                </div>
            </div>
            <section className={_cs(styles.glance, styles.section)}>
                <div className={_cs(styles.glanceContent, styles.sectionContent)}>
                    <Header
                        heading="At a glance"
                        headingSize="large"
                        hideHeadingBorder
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
                        <TooltipIcon
                            infoLabel={(
                                <img
                                    alt="pie-ea"
                                    src={pieEa}
                                    className={styles.pie}
                                />
                            )}
                        >
                            East Asia Countries
                        </TooltipIcon>
                        <TooltipIcon
                            infoLabel={(
                                <img
                                    alt="pie-sa"
                                    src={pieSa}
                                    className={styles.pie}
                                />
                            )}
                        >
                            South Asia Countries
                        </TooltipIcon>
                        <TooltipIcon
                            infoLabel={(
                                <img
                                    alt="pie-sea"
                                    src={pieSea}
                                    className={styles.pie}
                                />
                            )}
                        >
                            South East Asia Countries
                        </TooltipIcon>
                        <TooltipIcon
                            infoLabel={(
                                <img
                                    alt="pie-cwa"
                                    src={pieCwa}
                                    className={styles.pie}
                                />
                            )}
                        >
                            Central West Asia Countries
                        </TooltipIcon>
                        <TooltipIcon
                            infoLabel={(
                                <img
                                    alt="pie-tp"
                                    src={pieTp}
                                    className={styles.pie}
                                />
                            )}
                        >
                            The Pacific Countries
                        </TooltipIcon>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={tent}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image of Indonesia
                    </div>
                </div>
            </div>
            <section className={_cs(styles.keyMessages, styles.section)}>
                <div className={_cs(styles.keyMessagesContent, styles.sectionContent)}>
                    <Header
                        heading="Key Messages"
                        headingSize="large"
                        hideHeadingBorder
                    />
                    <KeyMessagesContent />
                </div>
            </section>
            <section className={_cs(styles.keyFindings, styles.section)}>
                <div className={_cs(styles.keyFindingsContent, styles.sectionContent)}>
                    <Header
                        heading="Key Findings"
                        headingSize="large"
                        hideHeadingBorder
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
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image of Pakistan
                    </div>
                </div>
            </div>
            <section className={_cs(styles.idTrends, styles.section)}>
                <div className={_cs(styles.idTrends, styles.sectionContent)}>
                    <Header
                        heading="Internal Displacement Trends in Asia and the Pacific (2010-2021)"
                        headingSize="large"
                        hideHeadingBorder
                    />
                    <DisasterDashboard />
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={philippines}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image of Philippines
                    </div>
                </div>
            </div>
            <section className={_cs(styles.costOfDisaster, styles.section)}>
                <div className={_cs(styles.sectionContent)}>
                    <Header
                        heading="Cost of Disaster Displacement"
                        headingSize="large"
                        hideHeadingBorder
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
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.spotlightItem}>
                            <img
                                className={styles.spotlightImage}
                                src={vanautu}
                                alt=""
                            />
                            <div className={styles.caption}>
                                <div className={styles.heading}>
                                    Spotlight 1
                                </div>
                                <div>
                                    Food related displacement in Jakarta, Indonesia
                                </div>
                            </div>
                        </div>
                        <div className={styles.spotlightItem}>
                            <img
                                className={styles.spotlightImage}
                                src={philippines2}
                                alt=""
                            />
                            <div className={styles.caption}>
                                <div className={styles.heading}>
                                    Spotlight 2
                                </div>
                                <div>
                                    Food related displacement in Jakarta, Indonesia
                                </div>
                            </div>
                        </div>
                        <div className={styles.spotlightItem}>
                            <img
                                className={styles.spotlightImage}
                                src={nepal}
                                alt=""
                            />
                            <div className={styles.caption}>
                                <div className={styles.heading}>
                                    Spotlight 2
                                </div>
                                <div>
                                    Food related displacement in Jakarta, Indonesia
                                </div>
                            </div>
                        </div>
                        <div className={styles.spotlightItem}>
                            <img
                                className={styles.spotlightImage}
                                src={japan}
                                alt=""
                            />
                            <div className={styles.caption}>
                                <div className={styles.heading}>
                                    Spotlight 2
                                </div>
                                <div>
                                    Food related displacement in Jakarta, Indonesia
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.dividerImage}>
                <img
                    src={vietnam}
                    className={styles.background}
                    alt=""
                />
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image of Vietnam
                    </div>
                </div>
            </div>
            <section className={_cs(styles.wayForward, styles.section)}>
                <div className={_cs(styles.wayForwardContent, styles.sectionContent)}>
                    <Header
                        heading="The Way Forward"
                        headingSize="large"
                        hideHeadingBorder
                    />
                    <div className={styles.description}>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardParagraph1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardListItem1}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardListItem2}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardListItem3}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardListItem4}
                        </p>
                        <p className={styles.descriptionParagraph}>
                            {wayForwardListItem5}
                        </p>
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
                <div className={styles.imageCaptionContainer}>
                    <div className={styles.imageCaption}>
                        Caption of Image of China
                    </div>
                </div>
            </div>
            <section className={_cs(styles.download, styles.section)}>
                <div className={_cs(styles.downloadContent, styles.sectionContent)}>
                    <div className={styles.leftContent}>
                        <img
                            src={bookCover}
                            className={styles.bookCover}
                            alt=""
                        />
                    </div>
                    <div className={styles.rightContent}>
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
                            <a
                                className={styles.downloadLink}
                                href={`https://www.internal-displacement.org/sites/default/files/publications/documents/IDMC_GRID_2022_LR.pdf${pageSuffix}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <MdPictureAsPdf />
                                View Section
                                <MdArrowRightAlt />
                            </a>
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
                            hideHeadingBorder
                        />
                        <div>
                            <div className={styles.paragraph}>
                                Humanitarian Hub Office, La Voie Creuse 16, 1202 Geneva, Switzerland
                            </div>
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
                        <div className={styles.paragraph}>
                            {copyrightParagraph}
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <Header
                            heading="About us"
                            hideHeadingBorder
                        />
                        <div className={styles.paragraph}>
                            {contactParagraph}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AsiaReport;
