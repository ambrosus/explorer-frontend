import BundleTabsCells from 'pages/Bundles/components/BundleTabsCells';

const BundleDetailsTab = ({ data, mainColumns, mainRows }: any) => {
  return (
    <div className="bundle_details_tab">
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

export default BundleDetailsTab;
