import { Layout } from '../layouts/Layout';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React from 'react';
import routes from 'routes';
import 'styles/Main.scss';

const Main: React.FC = () => {
  return (
    <Layout>
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
