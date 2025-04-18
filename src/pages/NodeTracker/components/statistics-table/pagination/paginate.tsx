import ArrowRight from '../../../components/icons/arrow-right-icon';
import BreakView from './break-view';
import PageView from './page-view';
import cn from 'clsx';
import { memo, useState } from 'react';

const Paginate = ({ table, pageCount }: { table: any; pageCount: number }) => {
  const [selected, setSelected] = useState(0);
  const pageRangeDisplayed = 5;
  const marginPagesDisplayed = 2;
  const breakLabel = '...';

  const callCallback = (selectedItem: number) => {
    table.setPageIndex(selectedItem);
  };

  const handlePreviousPage = () => {
    table.previousPage();

    if (selected > 0) {
      setSelected((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    table.nextPage();

    if (selected < pageCount) {
      setSelected((prev) => prev + 1);
    }
  };

  const handlePageSelected = (index: number) => {
    if (selected === index) {
      handleClick(index);
      return;
    }
    handleClick(index);
  };

  const getPageElement = (index: number) => {
    return (
      <PageView
        key={index}
        page={index + 1}
        selected={selected === index}
        pageSelectedHandler={() => handlePageSelected(index)}
      />
    );
  };

  const pagination = (pageCount: number) => {
    const items = [];

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(getPageElement(index));
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let createPageView = (index: number) => getPageElement(index);

      let index: number;
      let breakView;

      const pagesBreaking: any = [];
      for (index = 0; index < pageCount; index++) {
        const page = index + 1;

        if (page <= marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        if (page > pageCount - marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        const adjustedRightSide =
          selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

        if (
          index >= selected - leftSide &&
          index <= selected + adjustedRightSide
        ) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          });
          continue;
        }

        if (
          breakLabel &&
          pagesBreaking.length > 0 &&
          pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
          (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
        ) {
          breakView = (
            <BreakView key={index} index={index} handler={handleBreakClick} />
          );
          pagesBreaking.push({ type: 'break', index, display: breakView });
        }
      }

      pagesBreaking.forEach(
        (
          pageElement: {
            type: 'break' | 'page';
            index: number;
            display: JSX.Element;
          },
          i: number,
        ) => {
          let actualPageElement = pageElement;
          if (
            pageElement.type === 'break' &&
            pagesBreaking[i - 1] &&
            pagesBreaking[i - 1].type === 'page' &&
            pagesBreaking[i + 1] &&
            pagesBreaking[i + 1].type === 'page' &&
            pagesBreaking[i + 1].index - pagesBreaking[i - 1].index <= 2
          ) {
            actualPageElement = {
              type: 'page',
              index: pageElement.index,
              display: createPageView(pageElement.index),
            };
          }
          items.push(actualPageElement.display);
        },
      );
    }

    return items;
  };

  const handleClick = (nextSelectedPage: number) => {
    let newPage = nextSelectedPage;

    handlePageChange(newPage);
  };

  const handlePageChange = (active: number) => {
    if (selected === active) {
      return;
    }
    setSelected(active);
    callCallback(active);
  };

  const handleBreakClick = (index: number) => {
    handleClick(selected < index ? getForwardJump() : getBackwardJump());
  };

  const getForwardJump = () => {
    const forwardJump = selected + pageRangeDisplayed;
    return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
  };

  const getBackwardJump = () => {
    const backwardJump = selected - pageRangeDisplayed;
    return backwardJump < 0 ? 0 : backwardJump;
  };

  return (
    <nav>
      <ul className="flex justify-center items-center text-base gap-1">
        <li>
          <button
            onClick={handlePreviousPage}
            className={cn(
              'flex items-center justify-center rounded-2 h-9 w-9 border border-solid bg-black-200/30',
              {
                'shadow-button border-black-600/10': table.getCanPreviousPage(),
                'pointer-events-none text-black-400/30 border-transparent':
                  !table.getCanPreviousPage(),
              },
            )}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowRight className="rotate-180" />
          </button>
        </li>
        {pagination(pageCount)}
        <li>
          <button
            onClick={handleNextPage}
            className={cn(
              'flex items-center justify-center rounded-2 h-9 w-9 border border-solid bg-black-200/30',
              {
                'shadow-button border-black-600/10': table.getCanNextPage(),
                'pointer-events-none text-black-400/30 border-transparent':
                  !table.getCanNextPage(),
              },
            )}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Paginate);
