import CodeContract from '../CodeContract';
import ContractEvents from '../ContractEvents';
import ReadContract from '../ReadContract';
import VerifyContract from '../VerifyContract';
import WriteContract from '../WriteContract';
import ContractHeader from './components/ContractHeader';
import ContractTabs from './components/ContractTabs';
import Loader from 'components/Loader';
import { memo, useEffect, useState } from 'react';
import { getContractDataWithProxy } from 'services/contract.service';

const ContractDetails = (props: any) => {
  const { address } = props;
  const [selectedTab, selectTab] = useState('verify');

  const [contractData, setContractData] = useState<any>(undefined);

  const updateContract = () => {
    getContractDataWithProxy(address).then((data) => {
      setContractData(data);
      selectTab(!data.contractAbi ? 'verify' : 'code');
    });
  };

  useEffect(() => {
    updateContract();
  }, [address]);

  // don't show anything before we get contract data
  if (contractData === undefined) return <Loader />;

  const isContractVerified = !!contractData.contractAbi;
  const allowedTabs = [];
  if (isContractVerified) allowedTabs.push('code', 'read', 'write', 'events');
  if (!isContractVerified) allowedTabs.push('verify', 'events');
  if (contractData.implAbi) allowedTabs.push('readAsProxy', 'writeAsProxy');

  function getTab() {
    switch (selectedTab) {
      case 'code':
        return (
          <div className="code_contract">
            <CodeContract
              files={contractData.sourcifyFiles}
              contractAbi={contractData.contractAbi}
            />
          </div>
        );
      case 'read':
        return (
          <div className="read_contract">
            <ReadContract
              contractAbi={contractData.contractAbi}
              contractAddress={address}
            />
          </div>
        );
      case 'readAsProxy':
        return (
          <div className="read_contract">
            <ReadContract
              contractAbi={contractData.implAbi ?? []}
              contractAddress={address}
            />
          </div>
        );
      case 'write':
        return (
          <div className="write_contract">
            <WriteContract
              contractAbi={contractData.contractAbi}
              contractAddress={address}
            />
          </div>
        );
      case 'writeAsProxy':
        return (
          <div className="write_contract">
            <WriteContract
              contractAbi={contractData.implAbi ?? []}
              contractAddress={address}
            />
          </div>
        );
      case 'verify':
        return (
          <div className="verify_contract">
            <VerifyContract updateContract={updateContract} />
          </div>
        );
      case 'events':
        return (
          <ContractEvents
            abi={[
              ...(contractData.contractAbi ?? []),
              ...(contractData.implAbi ?? []),
            ]}
          />
        );
    }
  }

  return (
    <div className="contract">
      <ContractTabs
        address={address}
        allowedTabs={allowedTabs}
        selectedTab={selectedTab}
        selectTab={selectTab}
      />

      <div className="contract-details">
        <div className="contract-body">
          {selectedTab !== 'verify' && selectedTab !== 'events' && (
            <ContractHeader
              sourcifyStatus={contractData.status}
              metadata={contractData.sourcifyMetadata}
              implementationAddress={contractData.implAddress}
            />
          )}

          <div className="contract-body-content">{getTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ContractDetails);
