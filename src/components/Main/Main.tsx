import { useActions } from '../../hooks/useActions';
import { RemoveTrailingSlash } from '../RemoveTrailingSlash';
import { Layout } from '../layouts/Layout';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import routes from 'routes';
import 'styles/Main.scss';
import {RemoveTrailingSlash} from "../RemoveTrailingSlash";

const Main: React.FC = () => {
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
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
