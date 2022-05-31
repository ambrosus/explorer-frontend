import { IContentProps, ITabsComposition } from '../layouts/layout.interface';
import Loader from 'components/Loader';
import React, { FC } from 'react';

export const Content: FC<IContentProps> & ITabsComposition = ({
  children,
  isLoading = true,
}: IContentProps) =>
  !isLoading ? (
    <Loader />
  ) : (
    <div className="content">
      <div className="content_backgorund">{children}</div>
    </div>
  );
Content.displayName = 'CONTENT';
const Header = ({ children, isLoading = true }: IContentProps) => (
  <div className="content_header">
    {!isLoading ? <Loader /> : <div className="container">{children}</div>}
  </div>
);
Content.Header = Header;
Content.Header.displayName = 'CONTENT_HEADER';
const Body = ({ children, isLoading = true }: IContentProps) => (
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
Content.Body = Body;
Content.Body.displayName = 'CONTENT_HEADER';
