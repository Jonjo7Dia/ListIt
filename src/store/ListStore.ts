import create from "zustand";

// Define the structure of a list item
interface List {
  id: string;
  listName: string;
  listItems: string[];
  isPublic: boolean;
  likes: string[];
  comments: string[];
  createdAt: Date;
  createdBy: string;
}

// Define the structure of the store's state
interface ListStoreState {
  lists: List[];
  createList: (list: List) => void;
  deletelist: (id: string) => void;
  setlists: (lists: List[]) => void;
  addComment: (listId: string, comment: string) => void;
}

// Create the store
const useListStore = create<ListStoreState>((set) => ({
  lists: [],
  createList: (list) => set((state) => ({ lists: [list, ...state.lists] })),
  deletelist: (id) =>
    set((state) => ({ lists: state.lists.filter((list) => list.id !== id) })),
  setlists: (lists) => set({ lists }),
  addComment: (listId, comment) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, comments: [...list.comments, comment] }
          : list
      ),
    })),
}));

export default useListStore;
