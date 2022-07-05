import HeadInfoCell from 'components/HeadInfo/HeadInfoCell';

const HeadInfo = ({ data, className, style, page }: any) => {
  return (
    <div className={className} style={style}>
      {data?.map((item: any) => (
        <HeadInfoCell
          key={item._id}
          primaryCell={item.name}
          secondaryCell={item.value}
          style={item.style}
        />
      ))}
    </div>
  );
};

export default HeadInfo;
