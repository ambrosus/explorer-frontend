import BundleMainCells from 'pages/Bundles/components/BundleMainCells';

const BundleDetailsMain = ({ data, mainColumns }: any) => {
  return (
    <div className="bundle_main" style={{ gridTemplateColumns: mainColumns }}>
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

export default BundleDetailsMain;
