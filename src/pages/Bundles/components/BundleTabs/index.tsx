import BundleTabsCells from '../BundleTabsCells';

const BundleTabs = ({ data, mainColumns }: any) => {
  return (
    <div className="bundle_tabs" style={{ gridTemplateColumns: mainColumns }}>
      {data?.map((item: any) => (
        <BundleTabsCells
          key={item._id}
          primaryCell={item.name}
          secondaryCell={item.value}
        />
      ))}
    </div>
  );
};

export default BundleTabs;
