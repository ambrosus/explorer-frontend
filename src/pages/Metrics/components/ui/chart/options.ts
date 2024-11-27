import Highcharts from 'highcharts';

export const options: Highcharts.Options = {
  chart: {
    type: 'area',
    scrollablePlotArea: {
      minWidth: 600,
      scrollPositionX: 1,
    },
    style: {
      color: '#9B9CA5',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
    },
  },
  title: {
    text: '',
  },
  subtitle: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: '',
    },
    labels: {
      style: {
        color: '#94979C',
      },
    },
    gridLineWidth: 1,
    gridLineColor: '#D8DAE0',
    gridLineDashStyle: 'Dash',
  },
  yAxis: {
    type: 'linear',
    title: {
      text: '',
    },
    labels: {
      formatter: function () {
        return '' + this.value;
      },
      style: {
        color: '#94979C',
      },
    },
    gridLineWidth: 1,
    gridLineColor: '#D8DAE0',
    gridLineDashStyle: 'Dash',
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
          tooltipContent += `<b style="color: ${point.color}">${point.series.name}</b>: <b>${point.y}</b><br/>`;
        });
      }
      return tooltipContent;
    },
  },
  plotOptions: {
    area: {
      pointStart: 1940,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
  },
  legend: {
    enabled: false,
  },
  navigation: {
    menuItemStyle: {
      fontSize: '10px',
    },
  },
};
