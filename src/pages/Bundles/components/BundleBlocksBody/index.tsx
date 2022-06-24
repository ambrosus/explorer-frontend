import { byteToMgb, sliceData10 } from 'utils/helpers';

const BundleBlocksBody = ({ lastCardRef, item }: any) => {
  console.log(item);
  const isTxHash = (
    <div className="bundle_blocks_body_cell">
      {sliceData10(item?.txHash, 12)}
    </div>
  );

  const isBy = <div className="bundle_blocks_body_cell">0x9012...328eb</div>;

  const isCreated = (
    <div className="bundle_blocks_body_cell">Wed, 1 June 2022</div>
  );

  const isDuration = <div className="bundle_blocks_body_cell">1 year </div>;

  const isEntries = (
    <div className="bundle_blocks_body_cell">151 assets / 526 events</div>
  );
  const isSize = (
    <div className="bundle_blocks_body_cell">{`${byteToMgb(
      item.size,
    )} Mb`}</div>
  );

  const isBlock = <div className="bundle_blocks_body_cell">10986508</div>;
  const isBundleCost = <div className="bundle_blocks_body_cell">492 AMB</div>;

  return (
    <div className="bundle_blocks_body" ref={lastCardRef}>
      {isTxHash}
      {isBy}
      {isCreated}
      {isDuration}
      {isEntries}
      {isSize}
      {isBlock}
      {isBundleCost}
    </div>
  );
};

export default BundleBlocksBody;
