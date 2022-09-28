import { getNoteData } from "../ helpers/helpers";
import { Category, ICategoryStatistic } from "../models/category";
import { INote } from "../models/note";

export const getCategoryStatistic = async (): Promise<ICategoryStatistic[]> => {
  let notes: INote[] = JSON.parse(getNoteData());
  let categoryStatistics: ICategoryStatistic[] = [];

  const categories = Object.values(Category);
  categories.forEach((category, index) => {
    let categoryNotes = notes.filter(note => note.category === category);
    if (!categoryNotes) {
      return;
    }
    
    let categoryStatistic: ICategoryStatistic = {
      category,
      active: categoryNotes.filter(note => !note.isArchived).length,
      archived: categoryNotes.filter(note => note.isArchived).length,
    }
    categoryStatistics.push(categoryStatistic);
  });

  return categoryStatistics;
};