const StatusModal = () => (
  <>
    {statuses.map((status) => (
      <button key={status.key} className="atlas_header_status_modal">
        {status.value}
      </button>
    ))}
  </>
);

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

export default StatusModal;
