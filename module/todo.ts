export interface Todo {
  title: string;
  description: string;
}

export interface ResetState {
  [key: string]: boolean | number | string;
}
