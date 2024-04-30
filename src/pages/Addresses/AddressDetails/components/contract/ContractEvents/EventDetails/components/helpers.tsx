import useHover from 'hooks/useHover';
import moment from "moment/moment";
import React from "react";
import { calcTime } from 'utils/helpers';




export function Timestamp({ timestamp }: any) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return <div className="contract_events-body-cell universall_light3">
  <span style={{ fontSize: 12, color: 'inherit' }} ref={hoverRef}>
    {calcTime(timestamp)}
    </span>
  {isHovered && (
    <div className="contract_events-body-cell-hovered">
    <span className="universall_triangle"></span>
      <span className="contract_events-body-cell-time">
    {moment(timestamp * 1000).format('MMM-D-YYYY h:mm:ss a')}
    </span>
    </div>
  )}
  </div>;
}
