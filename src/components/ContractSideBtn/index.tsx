import Link from 'assets/icons/Link';
import ContractCopyBtn from 'components/ContractCopyBtn';
import FullScreeDataModal from 'components/FullScreeDataModal';
import { memo } from 'react';

const ConstractSideBtn = ({ content, name, fileOf, isAbi }: any) => {
  const setAnchorLink = (anchor: string) => {
    navigator.clipboard.writeText(`${window.location.href}#${anchor}`);
  };

  return (
    <>
      <div className="code-section-header-actions">
        <ContractCopyBtn content={content} />
        <button
          className="btn-contract-icon"
          onClick={() => setAnchorLink(name)}
        >
          <Link />
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
