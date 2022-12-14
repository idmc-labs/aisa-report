import React, { useEffect } from 'react';

import Svg from '#components/Svg';

import charts from '#resources/img/charts.svg';

const items = [
    {
        key: 'cod-livelihoods',
        title: 'Jobs are more readily available in urban than in rural areas or camps, and cities may support self-reliance in the long run. Urban IDPs’ economic conditions, however, tend to be similar to if not worse than those of the urban poor. They often have lower incomes and only limited social networks, making it even harder for them to adapt to their new environment. Farmers and agricultural workers who flee from rural areas tend to find their skills are irrelevant in the city.',
    },
    {
        key: 'cod-education',
        title: 'Cities offer better education opportunities than rural areas. Urban IDPs tend to prioritise education over other services because it is transferrable human capital that may be key to rebuilding their lives. During urban crises, however, schools may be used as emergency shelters. They may also be damaged or destroyed during conflict or disasters. Ensuring education for displaced children as well as those from host communities should be a priority.',
    },
    {
        key: 'cod-health',
        title: 'Cities tend to offer better access to health services than rural areas, but the overcrowded conditions in which many IDPs live, with little or no access to safe water and sanitation, increase the risk of diseases for them and their hosts alike. The mental health implications of displacement are also widely acknowledged but tend to be overlooked.',
    },
    {
        key: 'cod-security',
        title: 'On one level cities provide IDPs anonymity and security, but informal settlements and poorly managed collective centres may also carry risks. Displaced women, children and other vulnerable groups may be subject to abuse, harassment and violence. Young IDPs in some cities may be exposed to criminal violence and forced to join gangs.',
    },
    {
        key: 'cod-environment',
        title: 'Large influxes of IDPs into already overpopulated urban areas may rapidly increase water and soil pollution, and create challenges in terms of solid waste. Cities should be prepared and able to adapt their waste management, sanitation and water infrastructure to cope with mass displacement. ',
    },
    {
        key: 'cod-housing',
        title: 'Many urban IDPs live in overcrowded, sub-stand-ard conditions. They often settle in the poorest peripheral neighbourhoods where their informal arrangements make them particularly vulnerable to eviction and abuse from landlords. IDPs regularly cite rent as one of their main expenses. Ensuring they have access to adequate housing with secure tenure should be a priority for urban authorities. Lack of access to adequate infrastructure may drive new and secondary displacement.',
    },
    {
        key: 'cod-social',
        title: 'Cities offer more potential than camps for social mobility and local integration, but many urban IDPs find themselves isolated and marginalised because of their backgrounds. Creating ties with host communities is essential to support their integration. Authorities should also take a participatory approach to decision-making by including IDPs and local residents in the process.',
    },
];

interface Props {
    className?: string;
}

function CostOfDisasterImage(props: Props) {
    const {
        className,
    } = props;

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                items.forEach((item) => {
                    const itemGroup = document.getElementById(item.key);
                    const itemTitle = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'title',
                    );
                    itemTitle.textContent = item.title;
                    if (itemGroup) {
                        itemGroup.appendChild(itemTitle);
                    }
                });
            },
            2000,
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Svg
            className={className}
            src={charts}
        />
    );
}

export default CostOfDisasterImage;
