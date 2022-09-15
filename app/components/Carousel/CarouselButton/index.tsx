import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';
import {
    IoChevronForward,
    IoChevronBack,
    IoEllipse,
} from 'react-icons/io5';

import { RawButton } from '@togglecorp/toggle-ui';
import CarouselContext from '../CarouselContext';

import styles from './styles.css';

type BaseProps = {
    className?: string;
}

type Props = BaseProps & ({
    action: 'set';
    order: number;
} | {
    action: 'prev' | 'next';
    order?: never;
})

function CarouselButton(props: Props) {
    const {
        className,
    } = props;

    const {
        onActiveItemManualChange,
        setActiveItem,
        activeItem,
    } = React.useContext(CarouselContext);

    const handleClick = React.useCallback(() => {
        // eslint-disable-next-line react/destructuring-assignment
        if (props.action === 'set') {
            // eslint-disable-next-line react/destructuring-assignment
            setActiveItem(props.order);
            if (onActiveItemManualChange) {
                onActiveItemManualChange();
            }
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (props.action === 'prev') {
            setActiveItem(
                (prevItem) => (isDefined(prevItem) ? (prevItem - 1) : undefined),
            );
            if (onActiveItemManualChange) {
                onActiveItemManualChange();
            }
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (props.action === 'next') {
            setActiveItem(
                (prevItem) => (isDefined(prevItem) ? (prevItem + 1) : undefined),
            );
            if (onActiveItemManualChange) {
                onActiveItemManualChange();
            }
        }

        // eslint-disable-next-line react/destructuring-assignment
    }, [props.action, props.order, setActiveItem, onActiveItemManualChange]);

    // eslint-disable-next-line react/destructuring-assignment
    const isActive = props.action === 'set' && activeItem === props.order;
    return (
        <RawButton
            className={_cs(
                styles.carouselButton,
                isActive && styles.active,
                className,
            )}
            name={undefined}
            onClick={handleClick}
        >
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {props.action === 'next' && <IoChevronForward size="var(--tui-font-size-small)" />}
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {props.action === 'prev' && <IoChevronBack size="var(--tui-font-size-small)" />}
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {props.action === 'set' && <IoEllipse />}
        </RawButton>
    );
}

export default CarouselButton;
