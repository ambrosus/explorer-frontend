import { IEvent, IEventParsedData } from '../index';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import { useState } from 'react';

export function ParsedEvent({ event }: { event: IEvent }) {
  const [isShow, setIsShow] = useState<boolean>(true);

  return (
    <div>
      <div className="contract_events-body-transfer">
        <button
          className="contract_events-body-transfer"
          onClick={() => setIsShow((prev) => !prev)}
        >
          {isShow ? <ArrowUpBig /> : <ArrowDownBig />}
        </button>

        <ParsedEventHeader event={event} />
      </div>

      {isShow && <ParsedEventBody event={event} />}
    </div>
  );
}

function ParsedEventHeader({ event }: { event: IEvent }) {
  return (
    <>
      <span style={{ fontWeight: 600, paddingTop: 2 }}>{event.eventName}</span>

      <pre className="contract_events-body-topics universall_ibm">
        {'( '}
        {event.parsedData?.map((input: any, index: any) => (
          <ParsedEventHeaderArg
            key={index}
            input={input}
            isLast={index < event.parsedData.length - 1}
          />
        ))}
        {' )'}
      </pre>
    </>
  );
}

function ParsedEventHeaderArg({
  input,
  isLast,
}: {
  input: IEventParsedData;
  isLast: boolean;
}) {
  return (
    <div>
      <span className="universall_semibold universall_green">
        {input.indexed && `indexed `}
      </span>
      <span className="universall_semibold universall_green universall_ibm">
        {`${input.type} `}
      </span>
      <span className="universall_semibold universall_red universall_ibm">
        {`${input.name}`}
        {isLast && ', '}
      </span>
    </div>
  );
}

function ParsedEventBody({ event }: { event: IEvent }) {
  return (
    <div className="contract_events-body-modal" style={{ marginLeft: '32px' }}>
      {event.parsedData.map((input: any, index: any) => (
        <ParsedEventBodyArg key={index} input={input} />
      ))}
    </div>
  );
}

function ParsedEventBodyArg({ input }: { input: IEventParsedData }) {
  return (
    <div className={'contract_events-body-modal-item'}>
      <pre className="contract_events-body-modal-heading">
        <span className={'universall_green universall_ibm'}>{input.type} </span>
        <span className={'universall_semibold universall_red universall_ibm'}>
          {input.name}
        </span>
      </pre>

      <div className={`universall_semibold contract_events-body-modal-address`}>
        {input.value.toString()}
      </div>
    </div>
  );
}
