import CalendarIcon from 'assets/icons/CalendarIcon';
import API from 'API/api';
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import {ambToUSD, formatDate} from "../../../../../utils/helpers";
import {useEffect, useState} from "react";
import {Currency} from "../../../../../components/UI/Currency";
import {Number} from 'components/Number';
import ExportCsv from "../../../../../components/ExportCsv";

const ApolloDetailsMiningStats = ({apollo}: any) => {
  const {data: appData} = useTypedSelector((state: any) => state.app);
  const [rewards, setRewards] = useState<any>({});
  const [filterDate, setFilterDate] = useState<any>("");
  const {price_usd} = appData && appData?.tokenInfo || 0
  if (!apollo) {
    return null;
  }
  //Todo kakogo [era Bobshe?
  // eslint-disable-next-line
  useEffect(() => {
    if (apollo?.lastBlock) {
      setFilterDate(
        formatDate(
          apollo?.lastBlock?.timestamp
            ? new Date(apollo.lastBlock.timestamp * 1000) as any / 1000
            : new Date() as any / 1000,
          true,
          false
        )
      )
    }
  }, [apollo]);

  const onSelect = (value: any) => {
    setFilterDate(value);
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (filterDate) {
      const fetchRewards = async () => {
        const {data} = await API.getApolloRewards(apollo.address, {
          from: fromDate,
          to: isValidDate(toDate) ? toDate : null
        });
        setRewards(data);
      };
      const date = filterDate.split("-");
      const fromDate = date[0];
      const toDate = date[1];
      if (isValidDate(fromDate)) {
        fetchRewards();
      }
    }
  }, [filterDate]);

  function isValidDate(d: any) {
    // @ts-ignore
    return !isNaN(new Date(d));
  }

  return (
    <div className="apollo_details_mining_stats">
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_cell">
          <span className="" style={{fontWeight: 700, fontSize: 14}}>
            MINING STATS
          </span>
          <span className="universall_light1" style={{fontSize: 18}}>
            {filterDate}
          </span>
        </div>
        <button className="apollo_details_mining_stats_icon" >
          <ExportCsv miningStats={onSelect} showText={false} />
        </button>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          BLOCK REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
             <Currency
               value={rewards.blocksRewards || 0}
               fixed={3}
               symbol="AMB"
             />

          </span>
          <span className=""> /   <Currency
            value={ambToUSD(rewards?.blocksRewards || 0, price_usd)}
            fixed={2}
            side="left"
          /></span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TRANSACTIONS REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
           <Currency
             value={rewards.transactionsRewards || 0}
             fixed={3}
             symbol="AMB"
           />
          </span>
          <span className=""> /  <Currency
            value={ambToUSD(rewards.transactionsRewards || 0, price_usd)}
            fixed={2}
            side="left"
          /></span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TOTAL BLOCKS MINED
        </div>
        <div className="apollo_details_mining_stats_fonts_bold">
          <Number value={rewards.totalBlocks || 0}/>
        </div>
      </div>
    </div>
  );
};

export default ApolloDetailsMiningStats;
