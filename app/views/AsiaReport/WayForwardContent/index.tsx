import React, { useCallback, useRef, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';

import useBooleanState from '#hooks/useBooleanState';
import { List } from '@togglecorp/toggle-ui';

import {
} from '../data';

import styles from './styles.css';

interface Description {
    key: string;
    description: React.ReactNode;
}

const itemKeySelector = (item: Description) => item.key;

interface ItemProps {
    className?: string;
    order: string;
    description: React.ReactNode;
}

function Item(props: ItemProps) {
    const {
        className,
        order,
        description,
    } = props;

    const itemRef = useRef<HTMLDivElement>(null);
    const [
        isAnimationShown,
        addAnimation,
        removeAnimation,
    ] = useBooleanState(false);

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
    data: Description[];
}

function WayForwardContent(props: Props) {
    const {
        className,
        data,
    } = props;

    const itemRendererParams = useCallback((_, item: Description) => ({
        order: item.key,
        description: item.description,
        className: styles.item,
    }), []);

    return (
        <div className={_cs(className, styles.wayForwardContent)}>
            <List
                data={data}
                renderer={Item}
                rendererParams={itemRendererParams}
                keySelector={itemKeySelector}
            />
        </div>
    );
}

export default WayForwardContent;
