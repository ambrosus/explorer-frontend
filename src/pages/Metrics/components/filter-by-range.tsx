import { cn } from '../../../utils/helpers';

const buttons = [
  {
    label: '1 Month',
    value: '1month',
  },
  {
    label: '3 Months',
    value: '3months',
  },
  {
    label: '6 Months',
    value: '6months',
  },
  {
    label: '1 Year',
    value: '1year',
  },
];

const FilterByRange = ({
  filter,
}: {
  filter: [string, (value: string) => void];
}) => {
  const [selected, setSelected] = filter;

  return (
    <div className="flex gap-x-2 md:gap-x-3 items-center">
      {buttons.map((button) => (
        <button
          key={button.value}
          onClick={() => setSelected(button.value)}
          className={cn(
            'bg-transparent px-3 text-xs md:text-sm leading-5 md:leading-6 font-semibold py-2 border border-solid border-neutral-500 uppercase rounded-3 transition-colors',
            {
              'text-white bg-black-600 border-black-600':
                selected === button.value,
              'hover:border-neutral-300': selected !== button.value,
            },
          )}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default FilterByRange;
