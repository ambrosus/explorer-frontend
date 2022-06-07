const AtlasHeaderStatusModal = () => {
  const toggleClick = () => console.log('Click');

  return (
    <>
      {statuses.map((status) => (
        <button
          key={status.key}
          className="atlas_header_status_modal"
          onClick={toggleClick}
        >
          {status.value}
        </button>
      ))}
    </>
  );
};

const statuses = [
  {
    key: 'online',
    value: 'Online',
  },
  {
    key: 'offline',
    value: 'Offline',
  },
];

export default AtlasHeaderStatusModal;
