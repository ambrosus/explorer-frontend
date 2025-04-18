import { useActions } from '../../hooks/useActions';
import useGtag from '../../hooks/useGtag';
import { RemoveTrailingSlash } from '../RemoveTrailingSlash';
import { Layout } from '../layouts/Layout';
// @ts-ignore
import { NotificationContainer } from '@airdao/ui-library';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import routes from 'routes';

const Main: React.FC = () => {
  useGtag();
  const { pathname } = useLocation();
  const { setAppDataAsync } = useActions();

  useEffect(() => {
    setAppDataAsync();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <RemoveTrailingSlash />
      <NotificationContainer />
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
