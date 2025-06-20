import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined;
};

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary_from: number;
  salary_to: number;
  employment_type: string;
  application_deadline: string; // You can use Date if you parse it
  qualifications: string; // JSON string; you may also parse this to `string[]`
  contact: string;
  job_category: string;
  is_remote_work: number; // Use boolean if you map 0/1 to false/true
  number_of_opening: number;
  created_at: string;
  updated_at: string;
}

export interface FilterJobType {
  label: string,
  value: string
}

export interface JobFilter {
  page: number,
  jobType?: string,
  search?: string
}
