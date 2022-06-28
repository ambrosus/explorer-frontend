const BundleDetailsBlock = ({ data, bundleRef }: any) => {
  return (
    <div ref={bundleRef} className="bundle_details_blocks_body">
      <div className="bundle_details_blocks_body_cell">{data}</div>
    </div>
  );
};

export default BundleDetailsBlock;
