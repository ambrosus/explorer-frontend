import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import Link from 'assets/icons/Link';
import ContractCopyBtn from 'components/ContractCopyBtn';
import FullScreeDataModal from 'components/FullScreeDataModal';
import { memo, useEffect, useState } from 'react';

const ConstractSideBtn = ({ content, name, fileOf, isAbi }: any) => {
  const [isCopy, setIsCopy] = useState(false);

  const setAnchorLink = (anchor: string) => {
    navigator.clipboard.writeText(
      `${window.location.host}${window.location.pathname}#${anchor}`,
    );
    setIsCopy(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsCopy(false), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isCopy]);

  return (
    <>
      <div className="code-section-header-actions">
        <ContractCopyBtn content={content} />
        <button
          className="btn-contract-icon"
          onClick={() => setAnchorLink(name)}
        >
          {isCopy ? <ContentCopyed /> : <Link />}
        </button>
        <div className="btn-contract-icon">
          <FullScreeDataModal text={content} fileOf={fileOf} fileName={name} />
        </div>
      </div>
    </>
  );
};

export default memo(ConstractSideBtn);

//
