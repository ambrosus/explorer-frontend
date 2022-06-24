import BundleMainCells from 'pages/Bundles/components/BundleMainCells';

const BundleDetailsMain = ({ bundle, mainColumns }: any) => {
  return (
    <div className="bundle_main" style={{ gridTemplateColumns: mainColumns }}>
      <BundleMainCells primaryCell={1} secondaryCell={2} />
      <BundleMainCells primaryCell={1} secondaryCell={2} />
      <BundleMainCells primaryCell={1} secondaryCell={2} />
    </div>
  );
};

export default BundleDetailsMain;
