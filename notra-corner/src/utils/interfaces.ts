export interface UserProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDate: Date;
  createdAt: Date;
}

export interface ColumnProps {
  id: number,
  title: string,
  userId: string
  activities: ActivitieProps[]
}

export interface ActivitieProps {
  id: string,
  title: string,
  description: string,
  columnId: number,
  checkLists: [],
  finished: boolean
}

export interface ChecklistProps {
  _id: number,
  _title: string,
  _finished: boolean,
  _activitieId: string
}