import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { List } from '@togglecorp/toggle-ui';

import styles from './styles.css';

interface KeyMessage {
    key: string;
    message: string;
}

const keyMessageKeySelector = (item: KeyMessage) => item.key;

const keyMessages = [
    {
        key: '1',
        message: 'Asia and the Pacific is the region most affected by disaster displacement worldwide. ',
    },
    {
        key: '2',
        message: 'The annual cost of disasters in the region is estimated to be around $780 billion, equivalent to 2.5% of the regional GDP. This does not include the economic impact of displacement itself.',
    },
    {
        key: '3',
        message: 'Climate change—combined with the rapid urbanization of the region and other factors—may significantly heighten future displacement risk and related costs.',
    },
    {
        key: '4',
        message: 'Investment in the prevention of disaster displacement is displacement worldwide. the only sustainable course of action for the socioeconomic development of the region.',
    },
    {
        key: '5',
        message: 'The region already has successful initiatives to prevent, monitor, respond to, and end disaster displacement that can inform future action.',
    },
];

interface KeyMessageProps {
    className?: string;
    message: string;
}

function KeyMessageItem(props: KeyMessageProps) {
    const {
        className,
        message,
    } = props;

    return (
        <div className={_cs(styles.keyMessage, className)}>
            {message}
        </div>
    );
}

interface Props {
    className?: string;
}

function KeyMessageContent(props: Props) {
    const {
        className,
    } = props;

    const keyMessageRendererParams = useCallback((_, item) => ({
        message: item.message,
    }), []);

    return (
        <div className={_cs(className, styles.keyMessagesContent)}>
            <List
                data={keyMessages}
                renderer={KeyMessageItem}
                rendererParams={keyMessageRendererParams}
                keySelector={keyMessageKeySelector}
            />
        </div>
    );
}

export default KeyMessageContent;
