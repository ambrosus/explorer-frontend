export type TabsNewProps = {
  tabs?: any;
  sortOptions?: any;
  fetchData: (args: any) => any;
  fetchParams: any;
  renderKey?: string | undefined;
  render: any;
  withoutCalendar?: boolean;
  initSortTerm?: string;
  label?: string;
  tableHeader?: any;
};

export type TabsItemProps = {
  tab: string;
  el: {
    value: string;
    title: string;
  };
  handleTab: (value: string) => void;
};
