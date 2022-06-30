import GreenCircle from '../../../../assets/icons/StatusAction/GreenCircle';
import OrangeCircle from '../../../../assets/icons/StatusAction/OrangeCircle';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import moment from 'moment';
import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

interface IBlocksBodyItem {
  number: number;
  miner: string;
  hash: string;
  totalTransactions: number;
  timestamp: number;
  size: number;
}
interface IBlocksBody {
  index: number;
  lastCardRef?: ((node?: Element | null | undefined) => void) | undefined;
  item: IBlocksBodyItem;
}

const BlocksBody: FC<IBlocksBody> = ({ index, lastCardRef, item }) => {
  const {
    number,
    miner,
    hash,
    totalTransactions,
    timestamp,
    size,
  }: IBlocksBodyItem = item;
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const { lastBlock } = appData?.netInfo ?? {
    lastBlock: {
      number: 0,
    },
  };
  const confirmations: number = lastBlock.number - number ?? 0;

  const online = (confirmations: number) => {
    return index > 0 && confirmations > 0 ? (
      <GreenCircle />
    ) : index > 1 ? (
      <GreenCircle />
    ) : (
      <OrangeCircle />
    );
  };

  function redirectHandler(): void {
    navigate(`${item.number}` as string);
  }

  const navigate = useNavigate();

  return (
    <div className="blocks_blocks_body" ref={lastCardRef}>
      <div
        className="blocks_blocks_body_cell color-gray universall_link_underline"
        style={{
          cursor: 'pointer',
        }}
        onClick={redirectHandler}
      >
        <span style={{ marginRight: 8 }}>{online(confirmations)}</span> {number}
      </div>
      <NavLink to={`/apollo/${miner}/`} className="universall_light2">
        <div className="blocks_blocks_body_cell color-gray">{miner}</div>
      </NavLink>
      <div className="blocks_blocks_body_cell color-gray">
        {sliceData5(hash)}
      </div>
      <div className="blocks_blocks_body_cell">{totalTransactions}</div>
      <div className="blocks_blocks_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="blocks_blocks_body_cell">{size} bytes</div>
    </div>
  );
};

export default BlocksBody;
