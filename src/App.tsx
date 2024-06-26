import { FormEvent } from "react"
import { nanoid } from "nanoid";
import { useTasks } from "./store";
import Container from "./components/Container";

function App() {

  const { tasks,addTask } = useTasks();

  const createTask = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const taskName = target.newtodo.value;
    !tasks.some(e => e.name === taskName) && addTask({name:taskName,task_state:'todo',id:nanoid(8)});
    target.newtodo.value = '';
    }     

  return (
    <main>
      <h1>Drag'n'Drop To Do List</h1>
      <form className="newtask-container" onSubmit={e => createTask(e)}>
        <label htmlFor="newtodo">New task</label>
        <input type="text" name="newtodo" id="newtodo" />
        <button className="submit-newtask" role="submit"></button>
      </form>
      <div className="tasks-columns">
        <Container column={'first'} />
        <Container column={'second'} />
        <Container column={'third'} />
      </div>
    </main>
  )
}

export default App
