import { parse } from 'csv-parse';

export function createCsvParser() {
  return parse({
    delimiter: ',',
    columns: true,
    trim: true,
  });
}
