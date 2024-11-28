import { formatNumber } from '../../../../utils/helpers';
import useGetChartRange from '../../lib/hooks/charts/use-get-chart-range';
import { EndpointProp } from '../../services/chart.service';
import Chart from '../ui/chart';
import Highcharts from 'highcharts';

interface ChartTransactionProps {
  title: string;
  endPoint: EndpointProp;
  filter: [string, React.Dispatch<React.SetStateAction<string>>];
}

const ChartTransaction = ({
  title,
  endPoint,
  filter,
}: ChartTransactionProps) => {
  const dateRange = filter[0];
  const { data, isLoading } = useGetChartRange(endPoint, dateRange);

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
                return formatNumber(Number(this.value), 2);
              },
            },
          },
          tooltip: {
            shared: true,
            formatter: function () {
              let tooltipContent = `<b>${Highcharts.dateFormat(
                '%A, %b %e, %Y',
                this.x as number,
              )}</b><br/>`;
              if (this.points) {
                this.points.forEach((point) => {
                  tooltipContent += `<b style="color: ${point.color}">${
                    point.series.name
                  }</b>: <b>${formatNumber(Number(point.y), 2)}</b><br/>`;
                });
              }
              return tooltipContent;
            },
          },
        }}
        data={data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChartTransaction;
