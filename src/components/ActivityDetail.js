import React from "react";
import "../css/body.css";
import "../css/app.css";
import "../css/header.css";
import axios from "axios";
import dateFormat from "dateformat";
import * as Icon from "react-feather";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultImage from "../assets/default-avatar.jpeg";

export default function ActivityDetail() {
  const [activityDetail, setActivityDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
    .get(`https://aircall-job.herokuapp.com/activities/${id}`)
    .then((response) => setActivityDetail(response.data));
  }, []);
  const getButtonText = activityDetail.is_archived ? 'Unarchive' : 'Archive';
  const handleClick = () => {
    axios
    .post(`https://aircall-job.herokuapp.com/activities/${activityDetail.id}`,
      { is_archived: !activityDetail.is_archived })
    .then((response) => setActivityDetail(response.data));
  }

  return (
    <div className='callDetail'>
      <img src={defaultImage} alt="default image" />
      <p className="detailName">{activityDetail.from}</p>
      <p className="detailVia">{activityDetail.via}</p>
      <div className="detailCard">
        <p className="detailDate">{dateFormat(activityDetail.created_at, "ddd, mmm dS, h:MM TT")}</p>
        <p>{activityDetail.to}</p>
        <div>
          {activityDetail.call_type === "missed" ? (
            <div>
              <span className="callType">Missed Call</span>
              <Icon.PhoneMissed color="red" size={12} />
            </div>
          ) : activityDetail.call_type === "received" ? (
            <div>
              <span className="callType">Received</span>
              <Icon.PhoneIncoming color="green" size={12} />
            </div>
          ) : (
            <div>
              <span className="callType">Voicemail</span>
              <Icon.PhoneForwarded size={12} />
            </div>
          )}
        </div>
      </div>
      <div className="detailArchiveButton">
        <button onClick={handleClick}> {getButtonText}</button>
      </div>
    </div>
  );
}
