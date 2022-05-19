import AnimatedLoader from './LoaderSvg';
import React from 'react';

const Loader = () => (
  <div
    style={{
      position: 'relative',
      height: 0,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    <div className="Loader">
      <div className="Spinner">
        <AnimatedLoader />
      </div>
    </div>
  </div>
);
export default Loader;
