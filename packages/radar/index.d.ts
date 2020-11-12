/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import { Box, MotionProps, Dimensions, Theme, CssMixBlendMode } from '@orbit-nivo/core'
import { OrdinalColorsInstruction, InheritedColorProp } from '@orbit-nivo/colors'
import { LegendProps } from '@orbit-nivo/legends'

declare module '@orbit-nivo/radar' {
    export type GridLabelProps = {
        id: string
        anchor: 'start' | 'middle' | 'end'
        angle: number
    }
    export type DotSymbolProps = {
        size: number
        color: InheritedColorProp
        borderWidth: number
        borderColor: InheritedColorProp
    }

    type IndexByCustomFunction<D = any> = (datum: D) => string | number
    export type CustomGridLabel = React.FC<GridLabelProps>
    export type CustomDotSymbol = React.FC<DotSymbolProps>
    export type CustomDotLabel = (...args: any[]) => React.ReactNode
    export type CustomFormatter = (...args: any[]) => React.ReactNode

    interface CommonRadarProps<Datum = any> {
        data: object[]
        keys: (string | number)[]
        indexBy: number | string | IndexByCustomFunction<Datum>
        maxValue?: 'auto' | number

        margin?: Box

        curve?: string

        borderWidth?: number
        borderColor?: InheritedColorProp

        gridLevels?: number
        gridShape?: 'circular' | 'linear'
        gridLabel?: CustomGridLabel
        gridLabelOffset?: number

        enableDots?: boolean
        dotSymbol?: CustomDotSymbol
        dotSize?: number
        dotColor?: InheritedColorProp
        dotBorderWidth?: number
        dotBorderColor?: InheritedColorProp
        enableDotLabel?: boolean
        dotLabel?: string | CustomDotLabel
        dotLabelFormat?: string | CustomFormatter
        dotLabelYOffset?: number

        theme?: Theme
        colors?: OrdinalColorsInstruction
        fillOpacity?: number
        blendMode?: CssMixBlendMode

        isInteractive?: boolean
        tooltipFormat?: string | CustomFormatter

        legends?: LegendProps[]
        role?: string
    }

    export type RadarProps = CommonRadarProps & MotionProps

    export class Radar extends Component<RadarProps & Dimensions> {}
    export class ResponsiveRadar extends Component<RadarProps> {}
}
