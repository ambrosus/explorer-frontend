import { Layout } from './layouts/Layout';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import { useActions } from 'hooks/useActions';
import React, { useEffect } from 'react';
import routes from 'routes';
import 'styles/Main.scss';

const Main: React.FC = () => {
  const { setAppDataAsync } = useActions();
  useEffect(() => {
    setAppDataAsync();
  }, []);

  return (
    <Layout>
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
