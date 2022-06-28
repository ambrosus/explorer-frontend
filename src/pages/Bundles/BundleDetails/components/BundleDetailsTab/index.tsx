import BundleMainCells from 'pages/Bundles/components/BundleMainCells';

const BundleDetailsTab = ({ data, mainColumns, mainRows }: any) => {
  return (
    <div
      className="bundle_main"
      style={{
        gridTemplateColumns: mainColumns,
        gridTemplateRows: undefined,
      }}
    >
      {data?.map((item: any) => (
        <BundleMainCells
          key={item._id}
          primaryCell={item.name}
          secondaryCell={item.value}
        />
      ))}
    </div>
  );
};

export default BundleDetailsTab;
