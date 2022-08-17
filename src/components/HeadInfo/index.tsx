import HeadInfoCell from 'components/HeadInfo/HeadInfoCell';

const HeadInfo = ({ data, className, style = {}, styleCell }: any) => {
  return (
    <div className={className} style={style}>
      {data?.map((item: any) => (
        <HeadInfoCell
          key={item.name}
          primaryCell={item.name}
          secondaryCell={item.value}
          style={item.style}
          calendarBtn={item.calendarBtn}
          styleCell={styleCell}
        />
      ))}
    </div>
  );
};

export default HeadInfo;
