import { formatNumber } from '../../../../utils/helpers';
import useGetChartMonthlyActiveUsers from '../../lib/hooks/charts/use-get-chart-monthly-active-users';
import Chart from '../ui/chart';
import Highcharts from 'highcharts';

const ChartMonthlyActiveUsers = () => {
  const { data, isLoading } = useGetChartMonthlyActiveUsers();
  return (
    <div className="flex flex-col p-4 md:p-6 bg-white border border-solid border-black-200 rounded-6">
      <Chart
        name="Monthly Active Users"
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
                '%B %e, %Y',
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
      >
        6 months
      </Chart>
    </div>
  );
};

export default ChartMonthlyActiveUsers;
