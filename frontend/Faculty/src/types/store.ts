export type User = {
  name: string;
  username: string;
  department: string;
  year: number;
  sex: string;
};

export type MainStore = {
  user: User | null;
  setUser: (user: User) => void;
};
