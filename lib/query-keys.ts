export const queryKeys = {
  habits: {
    all: (userId: string) => ["habits", userId] as const,
  },
  checkins: {
    week: (userId: string) => ["checkins", "week", userId] as const,
  },
};
