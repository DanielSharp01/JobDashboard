import React from 'react';
import "./JobCard.scss";
import moment from "moment";

export default function JobCard({ name, link, pay, tags, organization, hours, date, read, className, onRead }) {
  let hoursClass = !hours || !trueOr0(hours.min) ? "gray" :
    hours.min <= 15 ? "green" :
      hours.min <= 20 ? "yellow" :
        hours.min <= 25 ? "orange" : "red";

  let payClass = (!pay || (!pay.min && pay.min !== 0)) ? "gray" :
    pay.min >= 1800 ? "green" :
      pay.min >= 1500 ? "yellow" :
        pay.min >= 1200 ? "orange" : "red";

  let hoursText = dashedText(hours) + " hrs";
  let payText = dashedText(pay) + " Ft/hr";

  let showNew = className === "notification" || ((className === "compact" || moment(date).add(1, "d").isAfter(moment())) && !read);
  return <div className={`job-card ${(className ? className : "")}`} onClick={() => { onRead(); window.open(link); }}>
    {showNew && <div className="new">New</div>}
    <div className="top-wrapper">
      <div className="header">{name}</div>
      <div className="tags">
        {tags.map((tag, i) => (<div key={i} className="tag">{tag}</div>))}
      </div>
    </div>
    <div className="footer">
      <div className="footer-wrapper">
        <div className="organization">{organization}</div>
        <div className={`hours ${hoursClass}`}>
          {hoursText}
        </div>
        <div className={`pay ${payClass}`}>
          {payText}
        </div>
      </div>
      <span className="date">{moment(date).format("YYYY.MM.DD. HH:MM:ss")}</span>
    </div>
  </div>
}

function trueOr0(value) {
  return value || value === 0;
}

function dashedText(value) {
  return value
    ? `${value.min}${(trueOr0(value.min) && trueOr0(value.max)) ? "-" : ""}${trueOr0(value.max) ? value.max : ""}`
    : "[unknown]";
}