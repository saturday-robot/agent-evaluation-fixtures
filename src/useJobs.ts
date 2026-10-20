import { useEffect, useState } from 'react';
import { Job } from './types';
import { SAMPLE_JOBS } from './data';

const STORAGE_KEY = 'dispatch_jobs_v1';

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SAMPLE_JOBS;
    const parsed = JSON.parse(raw) as Job[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SAMPLE_JOBS;
    return parsed;
  } catch {
    return SAMPLE_JOBS;
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {
      /* ignore quota errors in demo */
    }
  }, [jobs]);

  const addJob = (job: Job) => setJobs((prev) => [job, ...prev]);

  const updateJob = (id: string, patch: Partial<Job>) =>
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...patch } : j))
    );

  const deleteJob = (id: string) =>
    setJobs((prev) => prev.filter((j) => j.id !== id));

  const resetJobs = () => setJobs(SAMPLE_JOBS);

  return { jobs, addJob, updateJob, deleteJob, resetJobs };
}
