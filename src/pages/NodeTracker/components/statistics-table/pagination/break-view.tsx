const BreakView = ({
  index,
  handler,
}: {
  index: number;
  handler: (index: number) => void;
}) => {
  return (
    <li>
      <button
        className="flex items-center justify-center rounded-2 text-sm font-medium h-7 w-7 text-black-500/50 border border-solid border-transparent"
        onClick={() => handler(index)}
      >
        ...
      </button>
    </li>
  );
};

export default BreakView;
