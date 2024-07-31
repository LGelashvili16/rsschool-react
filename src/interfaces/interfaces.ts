export interface ResultsInterface {
  [key: string]: string | string[];
}

export interface SWAPIResponseInterface {
  count: number;
  results: ResultsInterface[];
  previous: string | null;
  next: string | null;
}

export interface DataInterface {
  data: SWAPIResponseInterface;
  loading: boolean;
  error: string | null;
  fetchPeople: (endpoint?: string, searchTerm?: string, query?: string) => void;
}
