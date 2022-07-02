import HeadInfoCell from 'components/HeadInfoCell';

const HeadInfo = (props: any) => {
  const { data, className, style } = props;
  //
  return (
    <>
      <div className="bundle_tabs">
        {data?.map((item: any) => (
          <HeadInfoCell
            key={item._id}
            primaryCell={item.name}
            secondaryCell={item.value}
          />
        ))}
      </div>
    </>
  );
};

export default HeadInfo;
