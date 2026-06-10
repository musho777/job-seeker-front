export interface Job {
  id: number;
  source: string;
  company: string;
  title: string;
  description: string;
  isApplying: boolean;
  sourceId: string;
  companyId?: number;
  jobAnnouncementId?: number;
  createdAt: string;
  updatedAt: string;
}
