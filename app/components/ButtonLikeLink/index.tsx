import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { useButtonFeatures } from '../Button';

import styles from './styles.css';

interface Props extends React.HTMLProps<HTMLAnchorElement> {
    variant?: 'primary' | 'secondary';
    actions?: React.ReactNode;
    icons?: React.ReactNode;
}

function ButtonLikeLink(props: Props) {
    const {
        className,
        variant = 'primary',
        icons,
        actions,
        children,
        disabled,
        ...otherProps
    } = props;

    const {
        buttonClassName,
        children: childrenFromButtonFeatures,
    } = useButtonFeatures({
        variant,
        icons,
        actions,
        children,
    });

    return (
        <a
            className={_cs(
                className,
                buttonClassName,
                disabled && styles.disabled,
            )}
            {...otherProps}
        >
            {childrenFromButtonFeatures}
        </a>
    );
}

export default ButtonLikeLink;
