import AnimatedLoader from './LoaderSvg';

const Loader = () => (
  <div
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
export default Loader;
