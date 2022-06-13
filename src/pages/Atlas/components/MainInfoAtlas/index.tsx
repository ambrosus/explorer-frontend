import {Number} from 'components/Number';
import {useTypedSelector} from 'hooks/useTypedSelector';

const MainInfoAtlas = () => {
  const {data: appData} = useTypedSelector((state: any) => state.app);
  const total = appData?.netInfo?.atlases?.total|| 0
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0
  return (
    <div className="main_info_atlas">
      <h1 className="main_info_atlas_heading">Atlas Nodes</h1>
      <div className="main_info_atlas_table">
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">TOTAL NODES</span>
          <span className="main_info_atlas_cell_secondary">
            {total}
          </span>
        </div>
        {/*<div className="main_info_atlas_cell">*/}
        {/*  <span className="main_info_atlas_cell_primary">Online</span>*/}
        {/*  <span*/}
        {/*    className="main_info_atlas_cell_secondary"*/}
        {/*    style={{*/}
        {/*      color: '#1acd8c',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    182*/}
        {/*  </span>*/}
        {/*</div>*/}
        {/*<div className="main_info_atlas_cell">*/}
        {/*  <span className="main_info_atlas_cell_primary">offline</span>*/}
        {/*  <span className="main_info_atlas_cell_secondary">5</span>*/}
        {/*</div>*/}
        {/*<div className="main_info_atlas_cell">*/}
        {/*  <span className="main_info_atlas_cell_primary">CONNECTING</span>*/}
        {/*  <span className="main_info_atlas_cell_secondary">2</span>*/}
        {/*</div>*/}
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">
            Avg block / prop. time
          </span>
          <span className="main_info_atlas_cell_secondary">
            {' '}
            <Number
              value={avgBlockTime || 0}
              fixed={2}
            />{' '}
            sec.
          </span>
        </div>
        {/*<div className="main_info_atlas_cell">Chart cell</div>*/}
      </div>
    </div>
  );
};

export default MainInfoAtlas;
