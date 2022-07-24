import HeadInfo from 'components/HeadInfo';
import { useTypedSelector } from 'hooks/useTypedSelector';

const MainInfoAtlas = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const total = appData?.netInfo?.atlases?.total || 0;
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0;

  const itemFirst: any = [
    {
      _id: 1,
      name: 'TOTAL NODES',
      value: total,
    },
    {
      _id: 2,
      name: 'Avg block / prop. time',
      value: avgBlockTime.toFixed(2),
    },
  ];
  return (
    <>
      <h1 className="main_info_atlas_heading">Atlas Nodes</h1>
      <HeadInfo data={itemFirst} className="head_info" />
    </>
  );
};

export default MainInfoAtlas;
