import AnimatedLoader from './LoaderSvg';
import React from 'react';

const Loader = () => (
  <div
    className='animated'
  >
    <div className="loader">
      <div className="Spinner">
        <AnimatedLoader />
      </div>
    </div>
  </div>
);
export default React.memo(Loader);
