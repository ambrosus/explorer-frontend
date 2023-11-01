import { useActions } from '../../hooks/useActions';
import { RemoveTrailingSlash } from '../RemoveTrailingSlash';
import { Layout } from '../layouts/Layout';
// @ts-ignore
import { NotificationContainer } from '@airdao/ui-library';
// @ts-ignore
import { useAutoLogin } from 'airdao-components-and-tools/hooks';
// @ts-ignore
import { metamaskConnector } from 'airdao-components-and-tools/utils';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import routes from 'routes';
import 'styles/Main.scss';

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const { setAppDataAsync } = useActions();

  useAutoLogin(metamaskConnector);

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
