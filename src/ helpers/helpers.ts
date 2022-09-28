import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';
const filename = '../repositories/data.json';
const dateRegex = /\d{2}(\D)\d{2}\1\d{2,4}/g;

export const updateNoteData = (data: any) => {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  writeFileSync(join(__dirname, filename), JSON.stringify(data), {
    flag: 'w',
  });
}

export const getNoteData = () => {
  return readFileSync(join(__dirname, filename), 'utf-8');
}

export const gateDatesFromDescription = (description: string | null) => {
  let result: string[] = [];
  let parsedDates = description ? description.match(dateRegex) : [];
  if (parsedDates) {
    parsedDates.forEach(parsedDate => {
      let [month, day, year] = parsedDate.split(/[.,\/ -]/);
      let parsedYear = year.toString().length == 2 ? +year + 2000 : +year;
      let date = new Date(parsedYear, +month -1, +day);
      result.push(date.toString())
    })
  }
   return result;
}
