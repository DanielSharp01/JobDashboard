import Job from "../../model/Job";

export const renderJobObject = (job) => ({
  id: job._id,
  orgId: job.id,
  organization: job.organization,
  name: job.name,
  link: job.link,
  pay: job.pay,
  hours: job.hours,
  tags: job.tags,
  date: job.date,
  read: job.read
});

export default async (req, res, next) => {
  try {
    res.jobs = (await Job.find({})).map(renderJobObject);
    return next();
  }
  catch (err) {
    return next(err);
  }
}