import Loader from '../Loader';
import Error404 from 'pages/Error404';
import { Navigate, Route, Routes } from 'react-router-dom';

export const RenderRoutes = (props: any) => {
  const { routes } = props;

  return (
    <Routes>
      {routes.routes.map(
        (route: any) =>
          route.isClick && (
            <Route
              suspense={<Loader />}
              key={route.key}
              path={route.path}
              element={<route.component />}
              {...route}
            />
          ),
      )}
      {routes.subMenuItems.map(
        (route: any) =>
          route.isClick && (
            <Route
              suspense={<Loader />}
              key={route.key}
              path={route.path}
              element={<route.component />}
              {...route}
            />
          ),
      )}
      {routes.addressesRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.bundleRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.apolloRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.atlasRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.blockRoutes.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      {routes.transactions.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      <Route path="*" element={<Navigate to="/notfound" />} />{' '}
      <Route path="/notfound" element={<Error404 />} />
    </Routes>
  );
};
