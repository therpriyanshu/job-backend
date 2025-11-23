// Simple keyword-based job recommendation
const recommendJobs = (userSkills = [], jobs = []) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill.toLowerCase()))
  );
};

export default recommendJobs;
