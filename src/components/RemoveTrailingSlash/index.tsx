import { Navigate, useLocation } from 'react-router-dom';

export const RemoveTrailingSlash = ({ ...rest }) => {
  const location = useLocation();
  const {pathname} = location;

  if (pathname[pathname.length - 2] === '/' && pathname[pathname.length - 1] === '/') {
    return (
      <Navigate
        replace
        {...rest}
        to={{
          pathname: location.pathname.replace(/\/+$/, '/'),
          search: location.search,
        }}
      />
    );
  } else return null;
};
