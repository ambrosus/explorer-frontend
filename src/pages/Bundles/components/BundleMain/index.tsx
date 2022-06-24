import BundleMainCells from 'pages/Bundles/components/BundleMainCells';

const BundleMain = ({ bundle, mainColumns }: any) => {
  console.log(bundle);

  return (
    <div className="bundle_main" style={{ gridTemplateColumns: mainColumns }}>
      <BundleMainCells primaryCell="TOTAL" secondaryCell="133,614" />
      <BundleMainCells
        primaryCell="ENTRIES TOTAL"
        secondaryCell="187,839,352"
      />
      <BundleMainCells
        primaryCell="AVERAGE BUNDLE LOAD"
        secondaryCell="1,405.84"
      />
    </div>
  );
};

export default BundleMain;
