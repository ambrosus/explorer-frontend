import { Link, NavLink } from 'react-router-dom';

const BundleDetailsBlock = ({ data, bundleRef, tab }: any) => {
  const ambUrl = process.env.REACT_APP_AMB_TO_API_URL;

  const url =
    tab === 'assets'
      ? `${ambUrl}/${data.assetId}`
      : `${ambUrl}/${data.bundleId}/events/${data.eventId} `;

  return (
    <a
      href={url}
      target="_blank"
      ref={bundleRef}
      className="bundle_details_blocks_cell"
      rel="noreferrer"
    >
      {tab === 'assets' ? data.assetId : data.eventId}
    </a>
  );
};

export default BundleDetailsBlock;
