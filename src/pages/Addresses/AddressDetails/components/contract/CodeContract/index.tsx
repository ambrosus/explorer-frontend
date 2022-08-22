import CopyIcon from '../CopyIcon';
import FullScreeDataModal from '../Modal/FullScreeDataModal';
import Link from 'assets/icons/Link';
import Loader from 'components/Loader';
import useDeviceSize from 'hooks/useDeviceSize';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getAccountData, getContractData } from 'services/contract.service';
import { TParams } from 'types';

const Code = () => {
  const { address = '' }: TParams = useParams();

  const [abiToRender, setAbiToRender] = useState<any>([]);
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef<HTMLInputElement>(null);
  const codeSectionRef = useRef<HTMLInputElement>(null);

  const { FOR_TABLET } = useDeviceSize();

  const { data: contractData, isLoading } = useQuery(
    `code data ${address}`,
    () => getContractData(address),
  );

  const { data: accountData } = useQuery(`account data ${address}`, () =>
    getAccountData(address),
  );

  const files = contractData?.data?.files || [];

  const filesToRender: any = files.filter(
    (file: any) => file.name !== 'metadata.json',
  );

  useEffect(() => {
    const res = files
      .filter((file: any) => file.name === 'metadata.json')
      .map((file: any) => JSON.parse(file.content))
      .map((file: any) => file.output.abi);

    setAbiToRender(res[0]);
  }, [isLoading]);

  const showMoreRefHandler = () => {
    setShowMore(!showMore);
    if (showMoreRef.current) {
      showMoreRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showRefHandler = () => {
    if (codeSectionRef) {
      codeSectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h2 className="contract-tab-title">Contract Source Code</h2>
      <div className="files">
        {filesToRender.length ? (
          filesToRender.map((file: any, index: any) => (
            <div className="code-section" key={index} ref={codeSectionRef}>
              <div className="code-section-header">
                <div className="code-section-header-title">
                  <h3>
                    <span>
                      {`File ${index + 1} of ${filesToRender.length}`}:
                    </span>{' '}
                    {file.name}
                  </h3>
                </div>
                <div className="code-section-header-actions">
                  <CopyIcon content={file.content} />
                  <button
                    className="btn-contract-icon"
                    onClick={showRefHandler}
                  >
                    <Link />
                  </button>
                  <div className="btn-contract-icon">
                    <FullScreeDataModal
                      text={file.content}
                      showRefHandler={showRefHandler}
                      fileOf={`File ${index + 1} of ${filesToRender.length}`}
                      fileName={file.name}
                    />
                  </div>
                </div>
              </div>
              <div className="code-section-body">
                <pre className="counter">
                  {file.content.split('\n').map((line: any, index: any) => (
                    <span key={index}>{line}</span>
                  ))}
                </pre>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>

      <div className="files">
        <div className="code-section">
          <div className="code-section-header">
            <div className="code-section-header-title">
              <h2 className="contract-tab-title">Contract Abi</h2>
            </div>
            <div className="code-section-header-actions">
              <CopyIcon content={JSON.stringify(abiToRender, null, ' ')} />
              <div className="btn-contract-icon">
                <Link />
              </div>
              <div className="btn-contract-icon">
                <FullScreeDataModal
                  text={JSON.stringify(abiToRender, null, ' ')}
                />
              </div>
            </div>
          </div>
          <div className="code-section-body">
            <pre className="no-counter">
              {JSON.stringify(abiToRender, null, ' ')}
            </pre>
          </div>
        </div>
      </div>

      <div className="files">
        <div className="code-section">
          <div className="code-section-header">
            <div className="code-section-header-title">
              <h2 className="contract-tab-title">Contract Byte Code</h2>
            </div>
            <div className="code-section-header-actions">
              <CopyIcon content={accountData?.data?.byteCode} />
              <div className="btn-contract-icon">
                <Link />
              </div>
              <div className="btn-contract-icon">
                <FullScreeDataModal text={accountData?.data?.byteCode} />
              </div>
            </div>
          </div>

          {accountData?.data?.isContract && (
            <div className="wrapper-bytes" ref={showMoreRef}>
              <p
                className={`${!showMore ? 'gradient-text' : ''}`}
                style={{ wordWrap: 'break-word' }}
              >
                {showMore
                  ? accountData?.data?.byteCode
                  : `${accountData?.data?.byteCode.substring(
                      0,
                      FOR_TABLET ? 900 : 320,
                    )}`}
              </p>
              <button className="read-more-btn" onClick={showMoreRefHandler}>
                {showMore ? 'Show less' : 'Show more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Code);
