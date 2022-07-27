import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Layout } from '../layouts/Layout';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import routes from 'routes';
import 'styles/Main.scss';

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const { setAppDataAsync } = useActions();

  useEffect(() => {
    // const interval = setInterval(() => {
      setAppDataAsync();
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
