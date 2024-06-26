import { create } from 'zustand';
import { taskType } from './utils/interface';
//import { devtools } from 'zustand/middleware';


type itemFuncType = (task: taskType) => void;

interface taskHandleType {
  tasks: taskType[];
  addTask: itemFuncType;
  removeTask: itemFuncType;
  changeTask: itemFuncType;
}

export const useTasks = create<taskHandleType>((set, get) => ({
  tasks: [],
  addTask: (task) => set({ tasks: [...get().tasks, task] }),
  removeTask: (task) => set({ tasks: get().tasks.filter((e) => e.id !== task.id) }),
  changeTask: (task) => {
        //remove than add at the end of tasks
        const tasksArray = get().tasks.filter((e) => e.id !== task.id);
        tasksArray.push(task);
        set({ tasks: tasksArray });
    } 
    
}));
