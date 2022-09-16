import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    MdOutlineTouchApp,
    MdArrowRightAlt,
} from 'react-icons/md';

import styles from './styles.css';

interface Props {
    className?: string;
    caption?: string;
    captionClassName?: string;
    downloadLink?: string;
    informationShown?: boolean;
}

function InfographicCaption(props: Props) {
    const {
        className,
        caption,
        captionClassName,
        downloadLink,
        informationShown = false,
    } = props;

    return (
        <div className={_cs(className, styles.infographicCaption)}>
            <div className={styles.leftContainer}>
                {caption && (
                    <div className={_cs(styles.caption, captionClassName)}>
                        {caption}
                    </div>
                )}
                {informationShown && (
                    <div className={styles.information}>
                        <MdOutlineTouchApp />
                        You can interact with this infographic to see in-depth data
                    </div>
                )}
            </div>
            {downloadLink && (
                <a
                    className={styles.downloadLink}
                    href={downloadLink}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Download infographic
                    <MdArrowRightAlt />
                </a>
            )}
        </div>
    );
}

export default InfographicCaption;
