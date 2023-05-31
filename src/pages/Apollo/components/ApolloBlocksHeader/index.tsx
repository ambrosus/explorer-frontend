import StatusModal from './StatusModal';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useRef, useState, FC } from 'react';

type IAtlasBlocksHeader = {
  pageTitle?: string;
};

const ApolloBlocksHeader: FC<IAtlasBlocksHeader> = ({ pageTitle }) => {
  const [isShow, setIsShow] = useState(false);
  const statusRef = useRef(null);
  const toggleStatus = () => setIsShow(!isShow);

  useOnClickOutside(statusRef, toggleStatus);

  return (
    <div className="atlas_blocks_header">
      <div className="atlas_blocks_header_cell">Rank</div>
      <div className="atlas_blocks_header_cell">Address</div>
      <div className="atlas_blocks_header_cell">
        <div className="atlas_blocks_header_btn">
          <span className="atlas_blocks_header_status">Status</span>
        </div>
        {isShow && (
          <div ref={statusRef} className="atlas_blocks_header_status_modal">
            <StatusModal />
          </div>
        )}
      </div>

      <div className="atlas_blocks_header_cell">Total {pageTitle}</div>
      <div className="atlas_blocks_header_cell">Balance</div>
      <div className="atlas_blocks_header_cell">Stake</div>
    </div>
  );
};

export default ApolloBlocksHeader;
