import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';

const MainInfoApollo = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const {
    total = 0,
    online = 0,
    offline = 0,
    connecting = 0,
  } = appData?.netInfo?.apollos || 0;

  const { avgBlockTime = 0 } = appData?.netInfo || 0;

  const itemFirst: any = [
    {
      _id: 1,
      name: 'TOTAL NODES',
      value: total,
    },
    {
      _id: 2,
      name: 'ONLINE',
      value: online,
      style: {
        color: '#1acd8c',
      },
    },
    {
      _id: 3,
      name: 'OFFLINE',
      value: offline,
    },
    {
      _id: 4,
      name: 'CONNECTING',
      value: connecting,
    },
    {
      _id: 5,
      name: 'Avg block / prop. time',
      value: `${avgBlockTime} sec`,
    },
  ];

  return (
    <>
      <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
      <HeadInfo data={itemFirst} className="head_info" />
    </>
  );
};

export default MainInfoApollo;
