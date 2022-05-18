import { Layout } from './layouts/Layout';
import routes from './routes';
import './styles/Main.scss';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import { useActions } from 'hooks/useActions';
import React, { useEffect } from 'react';

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
