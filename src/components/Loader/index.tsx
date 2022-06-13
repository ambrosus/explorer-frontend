import AnimatedLoader from './LoaderSvg';
import React from 'react';

const Loader = () => (
  <div
    //TODO css
    style={{
      position: 'relative',
      height: 100,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    <div className="loader">
      <div className="Spinner">
        <AnimatedLoader />
      </div>
    </div>
  </div>
);
export default React.memo(Loader);
