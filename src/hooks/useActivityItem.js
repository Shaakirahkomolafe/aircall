import React from "react";
import dateFormat from "dateformat";
import * as Icon from "react-feather";
import { useHistory } from "react-router";

export function ActivityItem ({ activity }) {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/calls/${id}`);
  };
  const activityId = activity.id;

  return (
    <div
      key={activityId}
      onClick={() => handleClick(activityId)}
      className="activities"
    >
      <div className="activityIcon activityItem">
        {activity.direction === "outbound" ? (
          <Icon.PhoneOutgoing color="blue" size={20} />
        ) : (
          <Icon.PhoneIncoming color="green" size={20} />
        )}
      </div>
      <div className="activityDetails activityItem">
        <p className="activityFrom">{activity.from}</p>
        <span className="activityVia">{activity.via}</span>
      </div>
      <div className="activityTime activityItem">
        <p>{dateFormat(activity.created_at, "h:MM TT")}</p>
        <span>{dateFormat(activity.created_at, "ddd, mmm dS")}</span>
      </div>
    </div>
  )
};

