import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ActivityItem } from "../hooks/useActivityItem";
import { listCalls } from "../hooks/useApi";

export default function Activities({ type }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const calls = activities.filter(
    (activity) => {
      if (type === 'archived') {
        return activity.is_archived === true;
      }
      return activity.is_archived === false;
    }
  );

  const getActivities = () => {
    listCalls().then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true)
    getActivities();
  }, []);

  const handleResetCalls = () => {
    axios
      .get('https://aircall-job.herokuapp.com/reset')
      .then(() => getActivities());
  };

  const handleArchiveCalls = () => {
    calls.map((activity) => {
      axios
        .post(`https://aircall-job.herokuapp.com/activities/${activity.id}`, {
          is_archived: true,
        })
        .then(() => getActivities());
    });
  };

  const handleClick = ()  => {
    if (type === 'archived') {
      handleResetCalls();
    }
    if (type === 'active') {
      handleArchiveCalls();
    }
  }

  const activityItems = calls.map((activity) => {
    return (
      <ActivityItem activity={activity} key={activity.id} />
    );
  });

  const buttonLabel = type === "archived" ? 'Reset' : 'Archive Calls';
  const noCallsLabel = type === "archived" ? 'No Archived Calls' : 'No Calls';

  return (
    <div>
      {loading ? (
       <Spinner data-testid="loader" className="loader" animation="grow" />
      ) : calls.length ? (
        <div>
          <div className="buttonWrapper">
            <button onClick={handleClick}>
              { buttonLabel }
            </button>
          </div>
          {activityItems}
        </div>
      ) : (
        <div className="emptyCall">
          { noCallsLabel }
        </div>
      )}
    </div>
  );
}
