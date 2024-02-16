export interface State {
    title: string;
    description: string;
  }
  
export type Action =
| { type: "DESCRIPTION_CHANGED"; value: string }
| { type: "TITLE_CHANGED"; value: string }

export interface ListResponse {
    listLists: {
        items: ListItem[];
        nextToken: string | null;
    };
}
      
export interface ListItem {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}