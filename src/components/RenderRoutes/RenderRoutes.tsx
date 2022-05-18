import Error404 from '../../pages/Error404';
import Loader from '../Loader';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const RenderRoutes = (props: any) => {
  const { routes } = props;
  return (
    <Routes>
      {routes.routes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.subRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      <Route path="*" element={<Error404 />} />
      <Route path="/notfound" element={<Error404 />} />
    </Routes>
  );
};
