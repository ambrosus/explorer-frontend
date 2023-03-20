import { useActions } from '../../hooks/useActions';
import { RemoveTrailingSlash } from '../RemoveTrailingSlash';
import { Layout } from '../layouts/Layout';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { useAutoLogin } from 'airdao-components-and-tools/hooks';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from 'routes';
import 'styles/Main.scss';

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const { setAppDataAsync } = useActions();

  const web3ReactInstance = useWeb3React();
  useAutoLogin(web3ReactInstance);

  useEffect(() => {
    setAppDataAsync();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <RemoveTrailingSlash />
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
