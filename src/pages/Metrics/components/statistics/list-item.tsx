import { cn } from '../../../../utils/helpers';
import { BlockListItem } from '../../types';
import InfoIcon from '../icons/info';
import { Tooltip } from '@airdao/ui-library';

const ListItem = ({
  title,
  value,
  valueClassName = '',
  className,
  icon: Icon,
  children,
  tooltipText,
  isLoading = false,
  isMultiline = false,
}: React.PropsWithChildren<BlockListItem>) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full p-6 border border-solid border-black-200 bg-white rounded-4',
        className,
      )}
    >
      <div className="flex items-center mb-2">
        {Icon && <Icon className="mr-2" />}
        <h6
          className={cn('text-sm uppercase text-neutral-400 font-semibold', {
            'mr-2': tooltipText,
          })}
        >
          {title}
        </h6>
        {children}
        {tooltipText && (
          <Tooltip isMultiline={isMultiline} message={tooltipText}>
            <InfoIcon />
          </Tooltip>
        )}
      </div>
      <b
        className={cn(
          'text-xl leading-7 font-semibold uppercase text-black-400',
          valueClassName,
        )}
      >
        {isLoading ? '0' : value}
      </b>
    </div>
  );
};

export default ListItem;
