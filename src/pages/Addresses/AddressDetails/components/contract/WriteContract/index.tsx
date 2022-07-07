import ContractInput from '../ContractInput';
import { ethers } from 'ethers';
import React, { useState } from 'react';

const WriteContract = () => {
  const contractAbi: any = [
    {
      constant: true,
      inputs: [],
      name: 'active',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      name: 'nodes',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'maxUserTotalStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'nodeType',
      outputs: [
        {
          name: '',
          type: 'uint8',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'nodeStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'maxTotalStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalReward',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'stakers',
      outputs: [
        {
          name: 'exists',
          type: 'bool',
        },
        {
          name: 'total',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'minStakeValue',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'id',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'service',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'fee',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      name: 'unstakeFees',
      outputs: [
        {
          name: 'age',
          type: 'uint64',
        },
        {
          name: 'fee',
          type: 'uint32',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'token',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          name: 'poolName',
          type: 'string',
        },
        {
          name: 'poolNodeType',
          type: 'uint8',
        },
        {
          name: 'poolNodeStake',
          type: 'uint256',
        },
        {
          name: 'poolMinStakeValue',
          type: 'uint256',
        },
        {
          name: 'poolFee',
          type: 'uint256',
        },
        {
          name: 'poolService',
          type: 'address',
        },
        {
          name: 'head',
          type: 'address',
        },
        {
          name: 'poolMaxTotalStake',
          type: 'uint256',
        },
        {
          name: 'poolMaxUserTotalStake',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'previousOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipRenounced',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      constant: true,
      inputs: [],
      name: 'getVersion',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'activate',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'maxNodes',
          type: 'uint256',
        },
      ],
      name: 'deactivate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'newService',
          type: 'address',
        },
      ],
      name: 'setService',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'newName',
          type: 'string',
        },
      ],
      name: 'setName',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'stake',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'tokens',
          type: 'uint256',
        },
      ],
      name: 'unstake',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'tokens',
          type: 'uint256',
        },
      ],
      name: 'unstakeWithFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'age',
          type: 'uint64',
        },
        {
          name: 'unstakeFee',
          type: 'uint32',
        },
      ],
      name: 'addUnstakeFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'age',
          type: 'uint64',
        },
        {
          name: 'unstakeFee',
          type: 'uint32',
        },
      ],
      name: 'changeUnstakeFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'age',
          type: 'uint64',
        },
      ],
      name: 'removeUnstakeFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'time',
          type: 'uint64',
        },
      ],
      name: 'getUnstakeFee',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'viewStake',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getTokenPrice',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'addReward',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'requestId',
          type: 'uint256',
        },
        {
          name: 'node',
          type: 'address',
        },
        {
          name: 'nodeId',
          type: 'uint256',
        },
      ],
      name: 'addNode',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getNodesCount',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'from',
          type: 'uint256',
        },
        {
          name: 'to',
          type: 'uint256',
        },
      ],
      name: 'getNodes',
      outputs: [
        {
          name: '_nodes',
          type: 'address[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const { ethereum }: any = window;
  const [isConnected, setIsConnected] = useState<any>(false);
  const btnhandler = () => {
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
        console.log(res);
        setIsConnected(true);
      });
    } else {
      alert('install metamask extension!!');
    }
  };

  return (
    <>
      <h2 className="contract-tab-title">
        Contract Source Code&nbsp;
        <button className="ctr-btn" onClick={btnhandler}>
          {isConnected ? (
            <span className="greenCircle" />
          ) : (
            <span className="redCircle" />
          )}
          &nbsp; Connect to Web3
        </button>
      </h2>

      <br />

      <div className="methods">
        {contractAbi
          ?.filter(
            (method: any) =>
              method.stateMutability !== 'view' &&
              method.stateMutability !== 'pure',
          )
          ?.map((method: any, index: number) => {
            return (
              <div key={index} className="method">
                <div className="method-name">
                  <span>{index + 1}. </span>
                  <span> &nbsp;{method?.name ?? 'name'}</span>
                </div>
                <div className="method-params">
                  {method?.inputs?.map((param: any, index: number) => (
                    <div key={index} className="method-params-param">
                      <div className="method-params-param-name">
                        {param.name} ( {param?.type} )
                      </div>
                      <ContractInput
                        method={method}
                        placeholder={param?.type}
                      />
                    </div>
                  )) ?? null}
                  <button className="ctr-btn">Query</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default WriteContract;
