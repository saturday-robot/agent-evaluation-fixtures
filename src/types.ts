export type JobStatus =
  | 'Pending'
  | 'Assigned'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled';

export interface Job {
  id: string;
  customer: string;
  pickup: string;
  destination: string;
  driver: string;
  scheduledDate: string; // ISO date string YYYY-MM-DD
  status: JobStatus;
}

export const STATUSES: JobStatus[] = [
  'Pending',
  'Assigned',
  'In Transit',
  'Delivered',
  'Cancelled',
];

export const DRIVERS = [
  'Unassigned',
  'Avery Cole',
  'Jordan Pike',
  'Riley Marsh',
  'Casey Dent',
  'Morgan Vale',
  'Sam Quill',
  'Drew Barker',
];
