import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import Error404 from 'pages/Error404';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {transactions} from "../../routes";

export const RenderRoutes = (props: any) => {
  const { routes } = props;
  const { loading } = useTypedSelector((state: any) => state.app);

  const { setAppDataAsync } = useActions();
  useEffect(() => {
    setAppDataAsync();
  }, []);

  return !loading ? (
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
      {routes.addressesRoutes.map((route: any) => (
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
      {routes.transactions.map((route: any) => (
        <Route
          suspense={<Loader />}
          key={route.key}
          path={route.path}
          element={<route.component />}
          {...route}
        />
      ))}
      <Route path="*" element={<Navigate to="/notfound" replace />} />{' '}
      <Route path="/notfound" element={<Error404 />} />
    </Routes>
  ) : (
    <Loader />
  );
};
