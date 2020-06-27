/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ReactNode } from 'react'
import { useMeasure } from '../hooks'

interface ResponsiveWrapperProps {
    children: (dimensions: { width: number; height: number }) => ReactNode
}

export const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
    const [measureRef, bounds] = useMeasure()
    const shouldRender = bounds.width > 0 && bounds.height > 0

    return (
        <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
            {shouldRender && children({ width: bounds.width, height: bounds.height })}
        </div>
    )
}
