import Method from './Method';

const ReadContract = (props: any) => {
  const { contractAbi } = props;

  return (
    <div>
      <h2 className="contract-tab-title">Read Contract Information</h2>
      <div className="methods">
        {contractAbi
          ?.filter(
            (method: any) =>
              (method.stateMutability === 'view' ||
                method.stateMutability === 'pure') &&
              method.type === 'function',
          )
          .map((method: any, index: number) => {
            return (
              <Method
                key={index}
                index={index}
                method={method}
                buttonName={'Query'}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ReadContract;
