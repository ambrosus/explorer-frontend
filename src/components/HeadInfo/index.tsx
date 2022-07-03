import HeadInfoCell from 'components/HeadInfo/HeadInfoCell';

const HeadInfo = ({ data, className, style }: any) => {
  console.log(data);

  return (
    <div className={className} style={style}>
      {data?.map((item: any) => (
        <HeadInfoCell
          key={item._id}
          primaryCell={item.name}
          secondaryCell={item.value}
        />
      ))}
    </div>
  );
};

export default HeadInfo;
