export interface Profile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface DailyEntry {
  id: string | null;
  userId: string;
  localDate: Date;
  timezone: string | null;
  heavy: string | null;
  good: string | null;
  nextStep: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyEntryInput {
  heavy?: string | null;
  good?: string | null;
  nextStep?: string | null;
  completed?: boolean;
}
