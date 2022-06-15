import { Layout } from '../layouts/Layout';
import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes';
import React, {useEffect} from 'react';
import routes from 'routes';
import 'styles/Main.scss';
import {useLocation} from "react-router-dom";

const Main: React.FC = () => {
  const { pathname } = useLocation();

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
