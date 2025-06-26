import { FilterJobType, JobPosting } from "./navigation/types";

export const FILTER_JOB_TYPE: FilterJobType[] = [
  { label: 'Full-Time', value: 'full-time' }, 
  { label: 'Part-Time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
]

export const FILTER_JOB_TYPE_OPTIONS: FilterJobType[] = [
  { label: 'Full-Time Opportunity', value: 'full-time' }, 
  { label: 'Part-Time Opportunity', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
]

export const MOCK_JOBS: JobPosting[] = [{
  id: "e3392a76-21bd-49af-9b2e-842701954c66",
  title: "Materials Scientist",
  description: "Voluptatem a ut laborum ipsa et laborum similique. Consequatur laborum aperiam a beatae quidem ipsam a. Rerum excepturi omnis omnis libero qui et.",
  company: "Homenick, Mitchell and Grady",
  location: "Kidapawan, Finland",
  salary_from: 78857,
  salary_to: 119290,
  employment_type: "Consultant",
  application_deadline: "Mon, 12/24/2007",
  qualifications: "[\"2 years of Git experience\",\"Expert in Java\",\"Advanced in Swift\",\"2 years in Vue.js\"]",
  contact: "486-929-980",
  job_category: "Database Administrator",
  is_remote_work: 0,
  number_of_opening: 1,
  created_at: "Sun, 10/15/2023",
  updated_at: "Sun, 10/15/2023"
},
{
  id: "2791a302-338b-4487-a71b-27a097f9b5e1",
  title: "Postsecondary Teacher",
  description: "Et laboriosam est et ducimus qui sit. Quidem ipsam labore impedit facere culpa laudantium modi sapiente.",
  company: "Trantow PLC",
  location: "San Fernando, Australia",
  salary_from: 50267,
  salary_to: 95195,
  employment_type: "Co-founder/Technical Partner",
  application_deadline: "Tue, 02/05/1974",
  qualifications: "[\"3+ years in Python\",\"4+ years in C++\",\"Master of TypeScript\",\"Proficient in Kotlin\"]",
  contact: "280-517-884",
  job_category: "UI/UX Designer",
  is_remote_work: 1,
  number_of_opening: 3,
  created_at: "Sun, 10/15/2023",
  updated_at: "Sun, 10/15/2023"
},
{
  id: "ae74be12-b7c5-42ea-b5fa-731affdfc6ae",
  title: "Fiberglass Laminator and Fabricator",
  description: "Eius enim voluptatem exercitationem dolores temporibus. Pariatur error nulla ducimus excepturi est. Earum labore unde reiciendis et impedit.",
  company: "Braun and Sons",
  location: "Lucena, French Southern Territories",
  salary_from: 70182,
  salary_to: 94662,
  employment_type: "Co-founder/Technical Partner",
  application_deadline: "Sun, 11/27/2005",
  qualifications: "[\"Expert in JavaScript\",\"3+ years in Python\",\"2 years of Git experience\",\"2+ years in Ruby\"]",
  contact: "198-928-875",
  job_category: "Security Engineer",
  is_remote_work: 1,
  number_of_opening: 9,
  created_at: "Sun, 10/15/2023",
  updated_at: "Sun, 10/15/2023"
}]