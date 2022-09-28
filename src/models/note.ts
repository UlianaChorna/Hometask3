export interface IBaseNote {
  title: string;
  category: string;
  description: string | null;
}

export interface INote extends IBaseNote {
  id: number;
  isArchived: boolean;
  dates: string[] | null
  createdDate: string;
}
