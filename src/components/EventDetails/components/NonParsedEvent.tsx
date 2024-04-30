import { IEvent } from '../index';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import { useState } from 'react';
import { sliceData10 } from 'utils/helpers';

export function NonParsedEvent({
  event,
  handleFilter,
}: {
  event: IEvent;
  handleFilter: any;
}) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div>
      <div className="contract_events-body-transfer">
        <button
          className="contract_events-body-transfer"
          onClick={() => setIsShow((prev) => !prev)}
        >
          {isShow ? <ArrowUpBig /> : <ArrowDownBig />}
        </button>

        <div className="contract_events-body-cell">
          <div className={'universall_semibold'}>Topics</div>
          <pre>{sliceData10(event.topics[0], 20)}</pre>
        </div>
        {handleFilter && (
          <button
            className="universall_filter-btn"
            onClick={(e: any) => handleFilter(e, event.topics[0])}
          >
            <FilterIcon />
          </button>
        )}
      </div>

      {isShow && (
        <div>
          {event.topics.map((topic: any, index: any) => (
            <Topic key={index} topic={topic} name={`[Topic ${index}]`} />
          ))}
          <Topic topic={event.data} name={'[Data]'} />
        </div>
      )}
    </div>
  );
}

function Topic({ topic, name }: { topic: string; name: string }) {
  return (
    <div className="contract_events-body-cell" style={{ marginLeft: '30px' }}>
      <div className={'universall_light3'}>{name}</div>
      <pre className={'universall_light3'} style={{ overflow: 'hidden' }}>
        {topic}
      </pre>
    </div>
  );
}
