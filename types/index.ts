export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Checkin {
  id: string;
  user_id: string;
  habit_id: string;
  date: string;
  created_at: string;
}
