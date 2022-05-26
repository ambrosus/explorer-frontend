import { IContentProps, ITabsComposition } from '../layouts/layout.interface';
import Loader from 'components/Loader';
import React, { FC } from 'react';

export const Content: FC<IContentProps> & ITabsComposition = ({
  children,
  isLoading = true,
}: IContentProps) =>
  !isLoading ? <Loader /> : <div className="content">{children}</div>;
Content.displayName = 'CONTENT';
const H = ({ children, isLoading = true }: IContentProps) => (
  <div className="content_header">
    {!isLoading ? <Loader /> : <div className="container">{children}</div>}
  </div>
);
Content.Header = H;
Content.Header.displayName = 'CONTENT_HEADER';
const B = ({ children, isLoading = true }: IContentProps) => (
  <div className="content_body">
    {!isLoading ? (
      <div style={{ minHeight: 400, marginTop: 20 }}>
        <Loader />
      </div>
    ) : (
      <div className="container">{children}</div>
    )}
  </div>
);
Content.Body = B;
Content.Body.displayName = 'CONTENT_HEADER';
