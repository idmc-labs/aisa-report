import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { List } from '@togglecorp/toggle-ui';

import finding1 from '#resources/img/finding1.png';
import finding2 from '#resources/img/finding2.png';
import finding3 from '#resources/img/finding3.png';
import finding4 from '#resources/img/finding4.png';
import finding5 from '#resources/img/finding5.png';
import finding6 from '#resources/img/finding6.png';

import styles from './styles.css';

interface KeyFinding {
    key: string;
    finding: string;
}

const keyFindingKeySelector = (item: KeyFinding) => item.key;

const keyFindings = [
    {
        key: '1',
        finding: 'There were over 225 million internal displacements—or movements—in Asia and the Pacific during 2010−2021, which was over three-quarters of the global total for this period.',
        icon: finding1,
    },
    {
        key: '2',
        finding: 'East Asia and Southeast Asia had the highest number of disaster displacements—nearly two-thirds of the total— closely followed by South Asia. All three subregions are densely populated and highly exposed to various hazards. Pacific island states bear the greatest displacement risk relative to their population size.',
        icon: finding2,
    },
    {
        key: '3',
        finding: 'Weather-related hazards—such as monsoon rains and tropical storms—were responsible for 95% of all disaster displacements across the region during 2010−2021.',
        icon: finding3,
    },
    {
        key: '4',
        finding: 'Financial costs and losses weigh disproportionately on those with limited resources. Each time a person is displaced, costs arise. Economic impacts add up when displaced people are uprooted for months, years, or even decades.',
        icon: finding4,
    },
    {
        key: '5',
        finding: 'Investment in sustainable development and taking early action to address internal displacement will be more effective and less costly than relying on humanitarian aid in the long term. Robust data on the scale, duration, and severity of disaster displacement —as well as its impacts on people and economies—will help guide actions to mitigate the negative consequences and seize potential opportunities for risk reduction and solutions.',
        icon: finding5,
    },
    {
        key: '6',
        finding: ' There has been significant progress across the region to develop disaster displacement policies and translate words into action. Much still remains to be done to effectively mitigate the impact of disaster displacement on individuals, societies, and economies.',
        icon: finding6,
    },
];

interface KeyFindingProps {
    className?: string;
    finding: string;
    order: string;
    icon: string;
}

function KeyFindingItem(props: KeyFindingProps) {
    const {
        className,
        finding,
        order,
        icon,
    } = props;

    return (
        <div className={_cs(styles.keyFinding, className)}>
            <div className={styles.leftContainer}>
                <div className={styles.order}>
                    {order}
                </div>
                <p className={styles.paragraph}>{finding}</p>
            </div>
            <div className={styles.rightContainer}>
                <img
                    className={styles.image}
                    src={icon}
                    alt=""
                />
            </div>
        </div>
    );
}

interface Props {
    className?: string;
}

function KeyFindingContent(props: Props) {
    const {
        className,
    } = props;

    const keyFindingRendererParams = useCallback((_, item) => ({
        order: item.key,
        finding: item.finding,
        icon: item.icon,
    }), []);

    return (
        <div className={_cs(className, styles.keyFindingsContent)}>
            <List
                data={keyFindings}
                renderer={KeyFindingItem}
                rendererParams={keyFindingRendererParams}
                keySelector={keyFindingKeySelector}
            />
        </div>
    );
}

export default KeyFindingContent;
