export type IButtons = {
  type: number;
  active: boolean;
};

export type IColors = { [key in IOptionalColorNumbers]: IOptionalColors };

export type IOptionalColorNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type IOptionalColors =
  "red" |
  "blue" |
  "green" |
  "brown" |
  "purple" |
  "orange" |
  "yellow";