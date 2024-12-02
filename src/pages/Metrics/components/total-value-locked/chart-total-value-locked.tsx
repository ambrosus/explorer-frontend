import { NumberType, useFormatter } from '../../../../utils/formatNumbers';
import useGetChartRange from '../../lib/hooks/charts/use-get-chart-range';
import { EndpointProp } from '../../services/chart.service';
import Chart from '../ui/chart';
import Highcharts from 'highcharts';
import { useCallback } from 'react';

interface ChartTotalValueLockedProps {
  title: string;
  endPoint: EndpointProp;
  filter: [string, React.Dispatch<React.SetStateAction<string>>];
}

const ChartTotalValueLocked = ({
  title,
  endPoint,
  filter,
}: ChartTotalValueLockedProps) => {
  const dateRange = filter[0];
  const { data, isLoading } = useGetChartRange(endPoint, dateRange);

  const minWidth = (() => {
    switch (dateRange) {
      case '1month':
        return 500;
      case '3months':
        return 900;
      case '6months':
        return 1500;
      case '1year':
        return 3000;
      default:
        return 500;
    }
  })();

  const formattedData = useCallback(() => {
    if (endPoint === 'tvlApollo' || endPoint === 'tvlStaking') {
      return data && data.length > 0
        ? data.map((item: any) => ({
            x: item[0],
            y: item[1],
            additionalData: item[2],
          }))
        : [];
    }
    return data && data.length > 0 ? data : [];
  }, [data, endPoint]);

  const { formatNumber } = useFormatter();

  return (
    <div className="flex flex-col p-4 md:p-6 bg-white border border-solid border-black-200 rounded-6">
      <Chart
        name={title}
        opts={{
          yAxis: {
            title: {
              text: '',
            },
            labels: {
              style: {
                color: '#94979C',
              },
              formatter: function () {
                return formatNumber({
                  input: Number(this.value),
                  type: NumberType.TokenNonTx,
                });
              },
            },
          },
          tooltip: {
            shared: true,
            formatter: function () {
              let tooltipContent = `<b>${Highcharts.dateFormat(
                '%B %e, %Y',
                this.x as number,
              )}</b><br/>`;
              if (this.points) {
                this.points.forEach((point) => {
                  const customPoint = point;

                  tooltipContent += `<b style="color: ${
                    customPoint.color
                  }">AMB</b>: <b>${formatNumber({
                    input: customPoint.y,
                    type: NumberType.TokenNonTx,
                  })}</b><br/>`;
                  // @ts-ignore
                  const additionalData = customPoint.point?.additionalData;
                  if (additionalData) {
                    tooltipContent += `<b style="color: ${
                      customPoint.color
                    }">USD</b>: <b>${formatNumber({
                      input: additionalData,
                      type: NumberType.TokenNonTx,
                    })}</b>`;
                  }
                });
              }
              return tooltipContent;
            },
          },
        }}
        data={formattedData()}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChartTotalValueLocked;
