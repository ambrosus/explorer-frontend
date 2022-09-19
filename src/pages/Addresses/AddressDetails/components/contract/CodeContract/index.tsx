import ConstractSideBtn from 'components/ContractSideBtn';
import Loader from 'components/Loader';
import useDeviceSize from 'hooks/useDeviceSize';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getAccountData, getContractData } from 'services/contract.service';
import { TParams } from 'types';

const Code = (props: any) => {
  const { files, contractAbi } = props;

  const { address = '' }: TParams = useParams();

  const [showMore] = useState(false);
  const showMoreRef = useRef<HTMLInputElement>(null);

  const { FOR_TABLET } = useDeviceSize();

  const filesToRender = files.filter(
    (file: any) => file.name !== 'metadata.json',
  );
  const abiToRender = JSON.stringify(contractAbi, null, ' ');

  // todo get from props
  const { data: accountData } = useQuery(`account data ${address}`, () =>
    getAccountData(address),
  );

  const fileElement: any = document.getElementById(
    window.location.hash.replace('#', ''),
  );

  useEffect(() => {
    if (fileElement && filesToRender.length) {
      setTimeout(() => {
        fileElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [fileElement, filesToRender.length]);

  return (
    <div>
      <h2 className="contract-tab-title">Contract Source Code</h2>
      <div className="files">
        {filesToRender.length ? (
          filesToRender.map((file: any, index: any) => (
            <div className="code-section" key={index} id={file.name}>
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
                  <ConstractSideBtn
                    content={file.content}
                    fileOf={`File ${index + 1} of ${filesToRender.length}`}
                    name={file.name}
                  />
                </div>
              </div>
              <div className="code-section-body">
                <pre className="counter">
                  {file.content.split('\n').map((line: any, index: any) => (
                    <span key={index} className="universall_ibm_font">
                      {line}
                    </span>
                  ))}
                </pre>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}

        <div className="code-section code-section__scroll-offset" id={'Abi'}>
          <div className="code-section-header">
            <div className="code-section-header-title">
              <h2 className="contract-tab-title">Contract Abi</h2>
            </div>
            <div className="code-section-header-actions">
              <ConstractSideBtn
                content={abiToRender}
                fileOf={null}
                name={'Abi'}
              />
            </div>
          </div>
          <div className="code-section-body">
            <pre className="no-counter">
              <ol style={{ paddingLeft: 40 }}>
                {abiToRender?.split('\n').map((line: any, index: any) => (
                  <li key={index} className="universall_ibm_font">
                    {line}
                  </li>
                ))}
              </ol>
            </pre>
          </div>
        </div>

        <div
          className="code-section code-section__scroll-offset"
          id={'Bytecode'}
        >
          <div className="code-section-header">
            <div className="code-section-header-title">
              <h2 className="contract-tab-title">Contract Byte Code</h2>
            </div>
            <div className="code-section-header-actions">
              <ConstractSideBtn
                content={accountData?.data?.byteCode}
                fileOf={null}
                name="Bytecode"
              />
            </div>
          </div>

          {accountData?.data?.isContract && (
            <div className="wrapper-bytes" ref={showMoreRef}>
              <p
                className={`${
                  !showMore ? 'gradient-text' : ''
                } universall_ibm_font`}
                style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
              >
                {showMore
                  ? accountData?.data?.byteCode
                  : `${accountData?.data?.byteCode.substring(
                      0,
                      FOR_TABLET ? 900 : 320,
                    )}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Code);
