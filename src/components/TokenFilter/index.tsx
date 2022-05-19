import { TParams } from '../../types';
import TokenModal from '../TokenModal';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import { useActions } from 'hooks/useActions';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TokenFilter = ({ onClick, selectedToken }: any) => {
  const { addFilter } = useActions();
  const { loading, data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { address }: TParams = useParams();
  const refTokensModal = useRef<HTMLDivElement>(null);
  const toggleMenu = () => (!loading ? setIsShow(!isShow) : null);

  const handleSelect = (token: any) => {
    onClick(token);
    addFilter(token);
    setIsShow(false);
    navigate(
      `/addresses/${address}/ERC-20_Tx/${
        token.contract ? token.contract : token.address
      }/`,
    );
  };

  useOnClickOutside(refTokensModal, () => setIsShow(false));

  return (
    <>
      <div
        ref={refTokensModal}
        tabIndex={0}
        className={`tokenFilter ${
          loading && !addressData?.tokens?.length
            ? 'toggle'
            : loading
            ? 'toggle'
            : ''
        }`}
      >
        <div className="tokenFilter__input">
          <span
            className={`tokenFilter__input-rectangle ${
              loading && !addressData?.tokens?.length
                ? 'toggle'
                : loading
                ? 'toggle'
                : !addressData?.tokens?.length
                ? ''
                : 'toggle'
            }`}
          >
            {loading && !addressData?.tokens?.length
              ? ''
              : loading
              ? !addressData?.tokens?.length
              : !addressData?.tokens?.length
              ? 0
              : addressData.tokens.length}
          </span>
          <button
            className="tokenFilter__input-btn"
            type="button"
            onClick={toggleMenu}
          >
            <span className="tokenFilter__input-text">{''}</span>
            {isShow ? <ArrowUpBig /> : <ArrowDownBig />}
          </button>
        </div>
        {isShow && (
          <TokenModal selectedToken={selectedToken} setToken={handleSelect} />
        )}
      </div>
    </>
  );
};

export default React.memo(TokenFilter);
