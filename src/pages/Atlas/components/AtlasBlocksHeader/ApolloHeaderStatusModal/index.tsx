const ApolloHeaderStatusModal = () => {
  return (
    <div className="apollo_header_status_modal">
      {statuses.map((status) => (
        <div key={status.key}>{status.value}</div>
      ))}
    </div>
  );
};

const statuses = [
  {
    key: 'online',
    value: 'online',
  },
  {
    key: 'offline',
    value: 'offline',
  },
];

export default ApolloHeaderStatusModal;
