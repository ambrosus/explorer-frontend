import CopyIcon from '../CopyIcon';
import FullScreeDataModal from '../Modal/FullScreeDataModal';
import Link from 'assets/icons/Link';
import Loader from 'components/Loader';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const Code = () => {
  const { address }: TParams = useParams();

  const { getContractAddressData } = useActions();
  useEffect(() => {
    getContractAddressData(address);
  }, []);
  const { data } = useTypedSelector((state) => state?.sourcify);
  const { files = [] } = data?.contractInfo?.data || {};

  const filesToRender: any = files.filter(
    (file: any) => file.name !== 'metadata.json',
  );

  const abiToRender =
    files.filter((file: any) => file.name === 'metadata.json')[0] || [];

  return (
    <div>
      <h2 className="contract-tab-title">Contract Source Code</h2>
      <div className="files">
        {filesToRender.length ? (
          filesToRender.map((file: any, index: any) => (
            <div className="code-section">
              <div className="code-section-header">
                <div className="code-section-header-title">
                  <h3>
                    <span>
                      File {index + 1} of {files.length - 1}:
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
              <CopyIcon
                content={JSON.stringify(
                  abiToRender?.length && abiToRender?.content,
                )}
              />
              <div className="btn-contract-icon">
                <Link />
              </div>
              <div className="btn-contract-icon">
                <FullScreeDataModal text={abiToRender?.content} />
              </div>
            </div>
          </div>
          <div className="code-section-body">
            <pre className="no-counter">
              {JSON.stringify(abiToRender.content)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Code);

// const files = [
//   {
//     name: 'LooksRareToken.sol',
//     content: `  * @dev Contract module which provides a basic access control mechanism, where
//  * there is an account (an owner) that can be granted exclusive access to
//  * specific functions.
//  *
//  * By default, the owner account will be the one that deploys the
//    contract. This
//  * can later be changed with {transferOwnership}.
//  *
//  * This module is used through inheritance. It will make available the
//    modifier
//  * \`onlyOwner\`, which can be applied to your functions to restrict their
//    use to
//  * the owner.
//  */
// abstract contract Ownable is Context {
//     `,
//   },
//   {
//     name: 'Ownable.sol',
//     content:
//       '* @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the\n   contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the\n   modifier\n * `onlyOwner`, which can be applied to your functions to restrict their\n   use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    ',
//   },
//   {
//     name: 'Ownable.sol',
//     content:
//       '* @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the\n   contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the\n   modifier\n * `onlyOwner`, which can be applied to your functions to restrict their\n   use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    ',
//   },
// ];

// const abi = {
//   name: 'abi.json',
//   content: [
//     {
//       constant: true,
//       inputs: [],
//       name: 'name',
//       outputs: [{ name: '', type: 'string' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [{ name: 'newAdmin', type: 'address' }],
//       name: 'changeExecutionAdmin',
//       outputs: [],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: 'spender', type: 'address' },
//         { name: 'amount', type: 'uint256' },
//       ],
//       name: 'approve',
//       outputs: [{ name: 'success', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'totalSupply',
//       outputs: [{ name: '', type: 'uint256' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: 'owner', type: 'address' },
//         { name: 'amount', type: 'uint256' },
//       ],
//       name: 'burnFor',
//       outputs: [{ name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: 'from', type: 'address' },
//         { name: 'to', type: 'address' },
//         {
//           name: 'amount',
//           type: 'uint256',
//         },
//       ],
//       name: 'transferFrom',
//       outputs: [{ name: 'success', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: 'owner', type: 'address' },
//         { name: 'spender', type: 'address' },
//         {
//           name: 'amount',
//           type: 'uint256',
//         },
//       ],
//       name: 'approveFor',
//       outputs: [{ name: 'success', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'decimals',
//       outputs: [{ name: '', type: 'uint8' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: 'owner', type: 'address' },
//         { name: 'spender', type: 'address' },
//         {
//           name: 'amountNeeded',
//           type: 'uint256',
//         },
//       ],
//       name: 'addAllowanceIfNeeded',
//       outputs: [{ name: 'success', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [{ name: 'amount', type: 'uint256' }],
//       name: 'burn',
//       outputs: [{ name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//   ],
// };
