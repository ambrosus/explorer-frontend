import InfoIcon from '../components/icons/info-icon';

const Notify = () => {
  return (
    <div className="flex items-center">
      <span className="mr-4">
        <InfoIcon />
      </span>
      <p className="-tracking-tightest">
        Node Tracker shows statistics of active AirDAO network nodes. The
        statistics include total AMB staked per continent and a map of global
        node distribution.
        {/* Learn more about network decentralization with{' '}
        <a target="_blank" href="https://airdao.io/academy" rel="noreferrer">
          AirDAO Academy
        </a>. */}
      </p>
    </div>
  );
};

export default Notify;
