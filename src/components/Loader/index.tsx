import AnimatedLoader from './LoaderSvg';
import React, { FC } from 'react';

const Loader: FC = () => (
  <div className="animated">
    <div className="loader">
      <div className="Spinner">
        <AnimatedLoader />
      </div>
    </div>
  </div>
);
export default Loader;
