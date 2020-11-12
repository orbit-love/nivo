/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveSunburst } from '@orbit-nivo/sunburst'
import { generateLibTree } from '@orbit-nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sunburst/meta.yml'
import mapper from '../../data/components/sunburst/mapper'
import { groups } from '../../data/components/sunburst/props'

const Tooltip = () => {
    /* return custom tooltip */
}

const initialProperties = {
    margin: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
    },

    identity: 'name',
    value: 'loc',

    cornerRadius: 2,

    borderWidth: 1,
    borderColor: 'white',

    colors: { scheme: 'nivo' },
    childColor: {
        from: 'color',
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
}

const Sunburst = () => {
    return (
        <ComponentTemplate
            name="Sunburst"
            meta={meta.Sunburst}
            icon="sunburst"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
                tooltip: properties.tooltip ? Tooltip : undefined,
            })}
            generateData={generateLibTree}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveSunburst
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[sunburst] ${node.id} - ${node.value}: ${
                                    Math.round(node.percentage * 100) / 100
                                }%`,
                                color: node.color,
                                data: node,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Sunburst
