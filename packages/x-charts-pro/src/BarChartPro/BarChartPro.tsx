import * as React from 'react';
import PropTypes from 'prop-types';
import { BarChartProps, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsOnAxisClickHandler } from '@mui/x-charts/ChartsOnAxisClickHandler';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsOverlay } from '@mui/x-charts/ChartsOverlay';
import { ChartsAxis } from '@mui/x-charts/ChartsAxis';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsClipPath } from '@mui/x-charts/ChartsClipPath';
import { useBarChartProps } from '@mui/x-charts/internals';
import { BarPlotProps } from '@mui/x-charts';
import { ResponsiveChartContainerPro } from '../ResponsiveChartContainerPro';
import { ZoomSetup } from '../context/ZoomProvider/ZoomSetup';
import { useZoom } from '../context/ZoomProvider/useZoom';

export interface BarChartProProps extends BarChartProps {}

/**
 * Demos:
 *
 * - [Bars](https://mui.com/x/react-charts/bars/)
 * - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [BarChart API](https://mui.com/x/api/charts/bar-chart/)
 */
const BarChartPro = React.forwardRef(function BarChartPro(props: BarChartProProps, ref) {
  const {
    chartContainerProps,
    barPlotProps,
    axisClickHandlerProps,
    gridProps,
    clipPathProps,
    clipPathGroupProps,
    overlayProps,
    chartsAxisProps,
    axisHighlightProps,
    legendProps,
    tooltipProps,
    children,
  } = useBarChartProps(props);

  return (
    <ResponsiveChartContainerPro ref={ref} {...chartContainerProps}>
      {props.onAxisClick && <ChartsOnAxisClickHandler {...axisClickHandlerProps} />}
      {props.grid && <ChartsGrid {...gridProps} />}
      <g {...clipPathGroupProps}>
        <BarChartPlotZoom {...barPlotProps} />
        <ChartsOverlay {...overlayProps} />
      </g>
      <ChartsAxis {...chartsAxisProps} />
      <ChartsLegend {...legendProps} />
      <ChartsAxisHighlight {...axisHighlightProps} />
      {!props.loading && <ChartsTooltip {...tooltipProps} />}
      <ChartsClipPath {...clipPathProps} />
      <ZoomSetup />
      {children}
    </ResponsiveChartContainerPro>
  );
});

BarChartPro.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The configuration of axes highlight.
   * Default is set to 'band' in the bar direction.
   * Depends on `layout` prop.
   * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
   */
  axisHighlight: PropTypes.shape({
    x: PropTypes.oneOf(['band', 'line', 'none']),
    y: PropTypes.oneOf(['band', 'line', 'none']),
  }),
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: PropTypes.oneOfType([PropTypes.oneOf(['value']), PropTypes.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: PropTypes.number,
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: PropTypes.arrayOf(PropTypes.object),
  desc: PropTypes.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: PropTypes.bool,
  /**
   * Option to display a cartesian grid in the background.
   */
  grid: PropTypes.shape({
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: PropTypes.number,
  /**
   * The item currently highlighted. Turns highlighting into a controlled prop.
   */
  highlightedItem: PropTypes.shape({
    dataIndex: PropTypes.number,
    seriesId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  /**
   * The direction of the bar elements.
   * @default 'vertical'
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * @deprecated Consider using `slotProps.legend` instead.
   */
  legend: PropTypes.shape({
    classes: PropTypes.object,
    direction: PropTypes.oneOf(['column', 'row']),
    hidden: PropTypes.bool,
    position: PropTypes.shape({
      horizontal: PropTypes.oneOf(['left', 'middle', 'right']).isRequired,
      vertical: PropTypes.oneOf(['bottom', 'middle', 'top']).isRequired,
    }),
    slotProps: PropTypes.object,
    slots: PropTypes.object,
  }),
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | AxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: PropTypes.func,
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: PropTypes.func,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: PropTypes.func,
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * The series to display in the bar chart.
   * An array of [[BarSeriesType]] objects.
   */
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.string,
  /**
   * The configuration of the tooltip.
   * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
   */
  tooltip: PropTypes.shape({
    axisContent: PropTypes.elementType,
    classes: PropTypes.object,
    itemContent: PropTypes.elementType,
    slotProps: PropTypes.object,
    slots: PropTypes.object,
    trigger: PropTypes.oneOf(['axis', 'item', 'none']),
  }),
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  viewBox: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: PropTypes.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: PropTypes.arrayOf(
    PropTypes.shape({
      axisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      classes: PropTypes.object,
      colorMap: PropTypes.oneOfType([
        PropTypes.shape({
          colors: PropTypes.arrayOf(PropTypes.string).isRequired,
          type: PropTypes.oneOf(['ordinal']).isRequired,
          unknownColor: PropTypes.string,
          values: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string])
              .isRequired,
          ),
        }),
        PropTypes.shape({
          color: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string.isRequired),
            PropTypes.func,
          ]).isRequired,
          max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
          min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
          type: PropTypes.oneOf(['continuous']).isRequired,
        }),
        PropTypes.shape({
          colors: PropTypes.arrayOf(PropTypes.string).isRequired,
          thresholds: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
          ).isRequired,
          type: PropTypes.oneOf(['piecewise']).isRequired,
        }),
      ]),
      data: PropTypes.array,
      dataKey: PropTypes.string,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      hideTooltip: PropTypes.bool,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      labelStyle: PropTypes.object,
      max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      position: PropTypes.oneOf(['bottom', 'top']),
      reverse: PropTypes.bool,
      scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'point', 'pow', 'sqrt', 'time', 'utc']),
      slotProps: PropTypes.object,
      slots: PropTypes.object,
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickInterval: PropTypes.oneOfType([
        PropTypes.oneOf(['auto']),
        PropTypes.array,
        PropTypes.func,
      ]),
      tickLabelInterval: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.func]),
      tickLabelPlacement: PropTypes.oneOf(['middle', 'tick']),
      tickLabelStyle: PropTypes.object,
      tickMaxStep: PropTypes.number,
      tickMinStep: PropTypes.number,
      tickNumber: PropTypes.number,
      tickPlacement: PropTypes.oneOf(['end', 'extremities', 'middle', 'start']),
      tickSize: PropTypes.number,
      valueFormatter: PropTypes.func,
      zoom: PropTypes.oneOfType([
        PropTypes.shape({
          maxEnd: PropTypes.number,
          maxSpan: PropTypes.number,
          minSpan: PropTypes.number,
          minStart: PropTypes.number,
          panning: PropTypes.bool,
          step: PropTypes.number,
        }),
        PropTypes.bool,
      ]),
    }),
  ),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: PropTypes.arrayOf(
    PropTypes.shape({
      axisId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      classes: PropTypes.object,
      colorMap: PropTypes.oneOfType([
        PropTypes.shape({
          colors: PropTypes.arrayOf(PropTypes.string).isRequired,
          type: PropTypes.oneOf(['ordinal']).isRequired,
          unknownColor: PropTypes.string,
          values: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string])
              .isRequired,
          ),
        }),
        PropTypes.shape({
          color: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string.isRequired),
            PropTypes.func,
          ]).isRequired,
          max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
          min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
          type: PropTypes.oneOf(['continuous']).isRequired,
        }),
        PropTypes.shape({
          colors: PropTypes.arrayOf(PropTypes.string).isRequired,
          thresholds: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
          ).isRequired,
          type: PropTypes.oneOf(['piecewise']).isRequired,
        }),
      ]),
      data: PropTypes.array,
      dataKey: PropTypes.string,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      hideTooltip: PropTypes.bool,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      labelStyle: PropTypes.object,
      max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      position: PropTypes.oneOf(['left', 'right']),
      reverse: PropTypes.bool,
      scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'point', 'pow', 'sqrt', 'time', 'utc']),
      slotProps: PropTypes.object,
      slots: PropTypes.object,
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickInterval: PropTypes.oneOfType([
        PropTypes.oneOf(['auto']),
        PropTypes.array,
        PropTypes.func,
      ]),
      tickLabelInterval: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.func]),
      tickLabelPlacement: PropTypes.oneOf(['middle', 'tick']),
      tickLabelStyle: PropTypes.object,
      tickMaxStep: PropTypes.number,
      tickMinStep: PropTypes.number,
      tickNumber: PropTypes.number,
      tickPlacement: PropTypes.oneOf(['end', 'extremities', 'middle', 'start']),
      tickSize: PropTypes.number,
      valueFormatter: PropTypes.func,
      zoom: PropTypes.oneOfType([
        PropTypes.shape({
          maxEnd: PropTypes.number,
          maxSpan: PropTypes.number,
          minSpan: PropTypes.number,
          minStart: PropTypes.number,
          panning: PropTypes.bool,
          step: PropTypes.number,
        }),
        PropTypes.bool,
      ]),
    }),
  ),
} as any;

function BarChartPlotZoom(props: BarPlotProps) {
  const { isInteracting } = useZoom();

  return <BarPlot {...props} skipAnimation={isInteracting ? true : props.skipAnimation} />;
}

BarChartPlotZoom.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If provided, the function will be used to format the label of the bar.
   * It can be set to 'value' to display the current value.
   * @param {BarItem} item The item to format.
   * @param {BarLabelContext} context data about the bar.
   * @returns {string} The formatted label.
   */
  barLabel: PropTypes.oneOfType([PropTypes.oneOf(['value']), PropTypes.func]),
  /**
   * Defines the border radius of the bar element.
   */
  borderRadius: PropTypes.number,
  /**
   * Callback fired when a bar item is clicked.
   * @param {React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
   * @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
   */
  onItemClick: PropTypes.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
} as any;

export { BarChartPro };
