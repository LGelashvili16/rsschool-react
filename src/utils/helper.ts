import { ResultsInterface } from "../interfaces/interfaces";

export const range = (start: number, end: number) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const fixIdSpacing = (id: string) => id.trim().replaceAll(" ", "-");

export const convertToCSV = (data: ResultsInterface[]) => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(","),
  );

  return [headers, ...rows].join("\n");
};

export const createBlobURL = (csvString: string) => {
  const blob = new Blob([csvString], { type: "text/csv" });
  return URL.createObjectURL(blob);
};
