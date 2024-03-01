import { BlockListItem } from '../../types';
import cn from 'clsx';
import { Children } from 'react';

const ListItem = ({
  title,
  value,
  valueClassName = '',
  className,
  icon: Icon,
  children,
}: React.PropsWithChildren<BlockListItem>) => {
  const hasChildren = Children.count(children) > 0;
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center mb-2">
        {Icon && <Icon className="mr-2" />}
        <h6
          className={cn('uppercase text-neutral-200 font-medium', {
            'mr-1': hasChildren,
          })}
        >
          {title}
        </h6>
        {children}
      </div>
      <b
        className={cn(
          'text-4 xl:text-5.5 leading-7 uppercase text-black-400',
          valueClassName,
        )}
      >
        {value}
      </b>
    </div>
  );
};

export default ListItem;
