export const statusMap = {
  todo: 0,
  done: 1,
} as const;

type Status = (typeof statusMap)[keyof typeof statusMap];

export type Task = {
  id: number;
  title: string;
  status: Status;
};
