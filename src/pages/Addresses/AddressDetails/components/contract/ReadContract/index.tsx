import Method from './Method';

const ReadContract = (props: any) => {
  const { contractAbi, contractAddress } = props;

  if (!contractAbi) return <></>;

  const readMethods = contractAbi
    .filter(
      (method: any) =>
        method.type === 'function' &&
        (method.stateMutability === 'view' ||
          method.stateMutability === 'pure'),
    )
    .map((el: any, i: number) => ({ ...el, name: el.name || 'name' + i }));

  return (
    <div>
      <h2 className="contract-tab-title">Read Contract Information</h2>

      <div className="methods">
        {readMethods.map((method: any, index: number) => {
          return (
            <Method
              key={index}
              index={index}
              method={method}
              buttonName={'Query'}
              address={contractAddress}
              isRead={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReadContract;
