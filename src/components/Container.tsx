import { useEffect, useState } from "react";
import { useTasks } from "../store"
import Task from "./Task";
import { useDrop } from "react-dnd";
import { taskType } from "../utils/interface";

export default function Container({column}:{column:string}) {
    const [title, setTitle] = useState('');
    const [tasksDisplayed, setTasksDisplayed] = useState<taskType[]>([]);

    const getTaskState = () => {
        let taskStateTemp = '';
        switch (column) {
            case 'first':
                taskStateTemp = 'todo';
                break;
            case 'second':
                taskStateTemp = 'pending';
                break;
            case 'third':
                taskStateTemp = 'done';
                break;
            default:
                break;
        }
        return taskStateTemp;
    }

    const taskState = getTaskState();

    const { tasks,changeTask } = useTasks();

    const [{isOver},drop] = useDrop(() => ({
        accept:'card',
        drop: (item:taskType) => changeTask({...item,task_state:taskState}),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    useEffect(() => {
        switch (column) {
            case 'first':
                setTitle('A faire');
                break;
            case 'second':
                setTitle('En cours');
                break;
            case 'third':
                setTitle('Fini');
                break;
            default:
                break;
        }
    }, [])
    
    useEffect(() => {        
      setTasksDisplayed(tasks.filter(task => task.task_state === taskState));
    }, [tasks])    

  return (
    <div className={column + " container"} ref={drop} style={{border: isOver ? 'solid green .5em' : 'none'}}>
        <h2>{title}</h2>
        {taskState && tasksDisplayed.map(task => <Task task={task} key={task.id} />)}
    </div>
  )
}