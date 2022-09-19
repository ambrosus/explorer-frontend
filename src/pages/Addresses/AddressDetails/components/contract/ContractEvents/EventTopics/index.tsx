import FilterIcon from 'assets/icons/FilterIcon';
import { memo } from 'react';

const EventTopics = ({ numberTopic, topic }: any) => {
  const isZeroTopic =
    numberTopic === 0 ? 'contract_events-body-subcell universall_light3' : '';
  return (
    <div className="contract_events-body-cell">
      <div className={isZeroTopic}>{`[topic${numberTopic}]`}</div>
      <pre className={isZeroTopic}>
        {topic}
        {numberTopic === 0 && (
          <button className="universall_filter-btn">
            <FilterIcon />
          </button>
        )}
      </pre>
    </div>
  );
};

export default memo(EventTopics);
