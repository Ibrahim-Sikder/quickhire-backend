export interface IJob {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  isActive?: boolean;
  latest?: boolean;
  featured?: boolean;
  tags?: string[];
}
