// @ts-nocheck
import Loader from '../../components/ui/loader';
import WidgetList from '../../components/widget-list';
import { useData } from '../../contexts/data/use-data';
import { IContinentItem, ICountryNode, IGeoNode } from '../../types';
import {
  calculateContinentStake,
  formatEtherAmount,
  getGeos,
  groupedByCountry,
} from '../../utils';
import { useState, useEffect } from 'react';

const baseMapPath =
  'https://code.highcharts.com/mapdata/custom/world.topo.json';

const MapChart = () => {
  const { nodes } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState<IGeoNode[]>([]);
  const [continents, setContinents] = useState<IContinentItem[]>([]);
  const [countries, setCountries] = useState<ICountryNode[]>([]);

  useEffect(() => {
    if (nodes.length > 0) {
      setMarkers(getGeos(nodes));
      setCountries(Object.values(groupedByCountry(nodes)));
    }
  }, [nodes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topologyResponse = await fetch(baseMapPath);
        const mapData = await topologyResponse.json();
        const mapChartOptions: Highcharts.Options = {
          chart: {
            map: mapData,
          },
          title: '',
          credits: {
            enabled: false,
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              align: 'right',
              verticalAlign: 'bottom',
            },
          },
          tooltip: {
            headerFormat: '',
            // @ts-ignore
            pointFormatter: function (): string {
              return (
                '<b>' +
                this.name +
                '</b><br>' +
                'Nodes: ' +
                this.value +
                '<br>' +
                'Total Stake: ' +
                formatEtherAmount(this.stake)
              );
            },
            clusterFormat: 'Clustered points: {point.clusterPointsAmount}',
          },
          colorAxis: {
            min: 0,
            stops: [
              [0, '#e9effb'],
              [0.2, '#7a9dec'],
              [0.5, '#5080ec'],
              [0.65, '#3568dd'],
              [0.75, '#2c55b6'],
              [1, '#172e63'],
            ],
          },
          plotOptions: {
            series: {
              animation: false,
            },
            mappoint: {
              animation: false,
              cluster: {
                enabled: true,
                allowOverlap: false,
                animation: {
                  duration: 450,
                },
                layoutAlgorithm: {
                  type: 'squarified',
                  gridSize: 70,
                },
                zones: [
                  {
                    from: 1,
                    to: 4,
                    marker: {
                      fillColor: '#3568dd',
                      radius: 13,
                    },
                  },
                  {
                    from: 5,
                    to: 9,
                    marker: {
                      fillColor: '#2c55b6',
                      radius: 15,
                    },
                  },
                  {
                    from: 10,
                    to: 15,
                    marker: {
                      fillColor: '#172e63',
                      radius: 17,
                    },
                  },
                ],
              },
              tooltip: {
                pointFormatter: function () {
                  return (
                    'Nodes: ' +
                    this.count +
                    '<br>Total Stake: ' +
                    formatEtherAmount(this.stake)
                  );
                },
              },
            },
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom',
          },
          series: [
            {
              data: countries,
              mapData,
              joinBy: ['hc-key', 'key'],
              name: 'Data',
            },
            {
              type: 'mappoint',
              name: 'Nodes',
              enableMouseTracking: true,
              data: markers,
              dataLabels: {
                verticalAlign: 'top',
              },
            },
          ],
        };

        Highcharts.mapChart('map-container', mapChartOptions);
        setContinents(calculateContinentStake(mapData, countries));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (markers.length > 0 && countries.length > 0) {
      fetchData();
      setIsLoading(false);
    }
  }, [markers, countries]);

  return (
    <>
      <div className="panel !px-3 !py-5 col-span-3">
        <div className="flex items-center justify-center" id="map-container">
          {isLoading && <Loader variant="scaleUp" />}
        </div>
      </div>
      <div className="panel !p-8 col-span-1">
        <WidgetList isLoading={isLoading} data={continents} />
      </div>
    </>
  );
};

export default MapChart;
