const PageView = ({
  page,
  selected,
  pageSelectedHandler,
}: {
  page: number;
  selected: boolean;
  pageSelectedHandler: () => void;
}) => {
  return (
    <li>
      <button
        onClick={pageSelectedHandler}
        className={`flex items-center justify-center rounded-2 text-sm font-medium h-7 w-7 border border-solid ${
          selected
            ? 'bg-white border-black-600/10 text-black-500'
            : 'border-transparent text-black-500/50'
        }`}
      >
        {page}
      </button>
    </li>
  );
};

export default PageView;
