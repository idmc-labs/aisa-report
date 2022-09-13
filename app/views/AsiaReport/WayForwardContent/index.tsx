import React, { useCallback, useRef, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';

import useBooleanState from '#hooks/useBooleanState';

import {
    wayForwardListItem1,
    wayForwardListItem2,
    wayForwardListItem3,
    wayForwardListItem4,
    wayForwardListItem5,
} from '../data';

import styles from './styles.css';

interface WayForwardListItemProps {
    className?: string;
    order: string;
    description: string;
}

function WayForwardListItem(props: WayForwardListItemProps) {
    const {
        className,
        order,
        description,
    } = props;

    const itemRef = useRef<HTMLDivElement>(null);
    const [isAnimationShown, addAnimation, removeAnimation] = useBooleanState(false);

    const handleScroll = useCallback(() => {
        if (!itemRef.current) {
            return;
        }
        const itemPosition = itemRef.current.getBoundingClientRect().top;

        if (itemPosition < window.innerHeight) {
            addAnimation();
        } else {
            removeAnimation();
        }
    }, [
        addAnimation,
        removeAnimation,
    ]);

    useEffect(() => {
        const asiaReport = document.getElementById('asia-report');

        asiaReport?.addEventListener('scroll', handleScroll, false);

        return () => {
            asiaReport?.removeEventListener('scroll', handleScroll, false);
        };
    }, [handleScroll]);

    return (
        <div
            ref={itemRef}
            className={_cs(
                styles.wayForwardListItem,
                className,
                isAnimationShown && styles.animate,
            )}
        >
            <div className={styles.order}>
                {order}
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    );
}

interface Props {
    className?: string;
}

function WayForwardContent(props: Props) {
    const {
        className,
    } = props;

    return (
        <div className={_cs(styles.wayForwardContentList, className)}>
            <WayForwardListItem
                order="1"
                description={wayForwardListItem1}
                className={styles.item}
            />
            <WayForwardListItem
                order="2"
                description={wayForwardListItem2}
                className={styles.item}
            />
            <WayForwardListItem
                order="3"
                description={wayForwardListItem3}
                className={styles.item}
            />
            <WayForwardListItem
                order="4"
                description={wayForwardListItem4}
                className={styles.item}
            />
            <WayForwardListItem
                order="5"
                description={wayForwardListItem5}
                className={styles.item}
            />
        </div>
    );
}

export default WayForwardContent;
