import axios from "axios";
import { useEffect, useState } from "react";

export function handleArchive(isArchived, activityId) {
  const [archived, setArchive] = useState([]);

  const updateArchiveProp = () => {
    axios
      .post(
        `https://aircall-job.herokuapp.com/activities/${activityId}`,
        { is_archived: !isArchived }
      )
      .then((response) => {
        setArchive(response.data.is_archived);
      });
  };
  useEffect(() => {
    updateArchiveProp();
  }, []);

  return { archived };
}

export function listCalls() {
  return axios
    .get("https://aircall-job.herokuapp.com/activities")
    .then((response) => response.data);
}
