import Link from '../../../../../../assets/icons/Link';
import CopyIcon from '../CopyIcon';
import FullScreeDataModal from '../Modal/FullScreeDataModal';
import axios from 'axios';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Code = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address } = useParams();
  const { data: addressData } = useTypedSelector((state) => state?.addressData);

  function IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    // const testUrl =
    //   'https://sourcify.dev/server/files/any/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const testUrl = `https://sourcify.ambrosus.io/files/any/22040/${address}`;

    axios({
      method: 'get',
      url: testUrl,
    })
      // .then((res) => JSON.parse(res.data.files[1].content))
      .then((res) => res.data.files[1].content)
      .then((res) => console.log(res));
    // .then((res) => setContractAbi(res.output.abi));
  }, []);

  return (
    <div>
      <h2 className="contract-tab-title">Contract Source Code</h2>
      <div className="files">
        {files.map((file, index) => (
          <div className="code-section">
            <div className="code-section-header">
              <div className="code-section-header-title">
                <h3>
                  <span>
                    File {index + 1} of {files.length}:
                  </span>{' '}
                  {file.name}
                </h3>
              </div>
              <div className="code-section-header-actions">
                <CopyIcon content={file.content} />
                <div className="btn-contract-icon">
                  <Link />
                </div>
                <div className="btn-contract-icon">
                  <FullScreeDataModal text={file.content} />
                </div>
              </div>
            </div>
            <div className="code-section-body">
              <pre className="counter">
                {file.content.split('\n').map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="files">
        <div className="code-section">
          <div className="code-section-header">
            <div className="code-section-header-title">
              <h2 className="contract-tab-title">Contract Abi</h2>
            </div>
            <div className="code-section-header-actions">
              <CopyIcon content={JSON.stringify(abi.content)} />
              <div className="btn-contract-icon">
                <Link />
              </div>
              <div className="btn-contract-icon">
                <FullScreeDataModal text={abi.content} />
              </div>
            </div>
          </div>
          <div className="code-section-body">
            <pre className="no-counter">
              {JSON.stringify(abi.content)
                .split('\n')
                .map((line: any, index: any) => (
                  <span key={index}>{line}</span>
                ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Code);

{
  /* <NodeHeader getNodeData={API.getAccount}> */
}

// {({ node }: any) => {
//   console.log(node);

//   if (node?.isContract) {
//     setIsContract(true);
//   }
//   return (
//     node?.isContract && (
//       <div className="wrapper-bytes" ref={showMoreRef}>
//         <p
//           className={`${!showMore ? 'gradient-text' : ''}`}
//           style={{ wordWrap: 'break-word' }}
//         >
//           {showMore
//             ? node.byteCode
//             : `${node.byteCode.substring(
//                 0,
//                 FOR_TABLET ? 900 : 320,
//               )}`}
//         </p>
//         <button
//           className="read-more-btn"
//           onClick={showMoreRefHandler}
//         >
//           {showMore ? 'Show less' : 'Show' + ' more'}
//         </button>
//       </div>
//     )
//   );
// }}

// </NodeHeader>

const files = [
  {
    name: 'LooksRareToken.sol',
    content: `  * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the
   contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the
   modifier
 * \`onlyOwner\`, which can be applied to your functions to restrict their
   use to
 * the owner.
 */
abstract contract Ownable is Context {
    `,
  },
  {
    name: 'Ownable.sol',
    content:
      '* @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the\n   contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the\n   modifier\n * `onlyOwner`, which can be applied to your functions to restrict their\n   use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    ',
  },
  {
    name: 'Ownable.sol',
    content:
      '* @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the\n   contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the\n   modifier\n * `onlyOwner`, which can be applied to your functions to restrict their\n   use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    ',
  },
];

const abi = {
  name: 'abi.json',
  content: [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'newAdmin', type: 'address' }],
      name: 'changeExecutionAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      name: 'burnFor',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        {
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        {
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approveFor',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        {
          name: 'amountNeeded',
          type: 'uint256',
        },
      ],
      name: 'addAllowanceIfNeeded',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'amount', type: 'uint256' }],
      name: 'burn',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
