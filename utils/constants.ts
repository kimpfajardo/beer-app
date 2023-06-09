export const FILTER_LIST = Object.freeze([
  "All",
  "High Alcohol",
  "High Acidity",
]);
export const SORT_LIST = Object.freeze(["Unsorted", "A to Z", "Z to A"]);


export enum Filter {
  ALL = "All",
  HIGH_ABV = "High Alcohol",
  HIGH_ACIDITY = "High Acidity",
}

export enum SortFilter {
  A2Z = "A to Z",
  Z2A = "Z to A",
}