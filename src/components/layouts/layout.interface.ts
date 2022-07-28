import React from 'react';

export type IContentProps = {
  children: any;
  isLoading?: boolean;
  isExpanded?: boolean;
};

export interface ITabsComposition {
  Header: React.FC<IContentProps>;
  Body: React.FC<IContentProps>;
}
