import { useDrag } from "react-dnd";
import { taskType } from "../utils/interface";
import { useTasks } from "../store";

export default function Task({task}:{task:taskType}) {
    const { removeTask } = useTasks();

    const [{isDragging},drag] = useDrag(() => ({
        type:'card',
        item:{...task},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end:(item,monitor) => {
            const didDrop = monitor.didDrop();
            console.log(monitor.getClientOffset());
            
            if (!didDrop) {
                removeTask(item);
            }
        }
    }));    

  return (
        <div className="task" style={{opacity: isDragging ? .5 : 1}} ref={drag}>
            <p>{task.name}</p>
        </div>
  )
}