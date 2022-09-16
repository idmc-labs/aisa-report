import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { List } from '@togglecorp/toggle-ui';

import styles from './styles.css';

interface KeyMessage {
    key: string;
    message: string;
}

const keyMessageKeySelector = (item: KeyMessage) => item.key;

interface KeyMessageProps {
    className?: string;
    message: string;
    order: string;
}

function KeyMessageItem(props: KeyMessageProps) {
    const {
        className,
        message,
        order,
    } = props;

    return (
        <div className={_cs(styles.keyMessage, className)}>
            <div className={styles.order}>
                {order}
            </div>
            <p
                className={styles.paragraph}
            >
                {message}
            </p>
        </div>
    );
}

interface Props {
    className?: string;
    data: { key: string; message: string }[];
}

function KeyMessageContent(props: Props) {
    const {
        className,
        data,
    } = props;

    const keyMessageRendererParams = useCallback((_, item: KeyMessage) => ({
        order: item.key,
        message: item.message,
    }), []);

    return (
        <div className={_cs(className, styles.keyMessagesContent)}>
            <List
                data={data}
                renderer={KeyMessageItem}
                rendererParams={keyMessageRendererParams}
                keySelector={keyMessageKeySelector}
            />
        </div>
    );
}

export default KeyMessageContent;
