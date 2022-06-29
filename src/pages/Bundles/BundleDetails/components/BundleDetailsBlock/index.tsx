const BundleDetailsBlock = ({ data, bundleRef }: any) => {
  return (
    <div ref={bundleRef} className="bundle_details_blocks_cell">
      {data}
    </div>
  );
};

export default BundleDetailsBlock;
