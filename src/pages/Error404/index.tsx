import React from 'react';

const Error404 = () => {
  return (
    <div className="not-found-bg">
      <div className="">
        <div className="not-found">
          <span className="not-found__num">404</span>
          <p className="not-found__title">Page not found</p>
          <p className="not-found__text">
            The page you are looking for may have been
            moved, deleted, or possibly never existed
          </p>
          <a className="not-found__home" href="/">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Error404;
