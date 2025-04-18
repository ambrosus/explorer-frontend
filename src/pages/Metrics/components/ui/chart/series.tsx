import { cn } from '../../../../../utils/helpers';
import { ChartProps } from '../../../types';
import ChartHeader from './chart-header';
import { options } from './options';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PropsWithChildren, useEffect, useRef } from 'react';

const ChartSeries: React.FC<PropsWithChildren<ChartProps>> = (props) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const { isLoading, className, component, data, opts, name } = props;

  useEffect(() => {
    if (chartRef.current) {
      if (isLoading) {
        chartRef.current.chart.showLoading();
      } else {
        chartRef.current.chart.hideLoading();
      }
    }
  }, [isLoading]);

  return (
    <div className="h-full flex flex-col">
      <ChartHeader {...props} />
      <div className={cn('h-full pt-3', className)}>
        {component && (
          <div className="flex w-full flex-col">
            <div className="mb-14">{component}</div>
          </div>
        )}

        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={{
            ...options,
            series: [
              {
                name,
                data,
                color: '#3568DD',
                fillColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0, 'rgba(53, 104, 221, 0.30)'],
                    [1, 'rgba(53, 104, 221, 0.05)'],
                  ],
                },
              },
            ],
            ...(opts || {}),
          }}
        />
      </div>
    </div>
  );
};

export default ChartSeries;
