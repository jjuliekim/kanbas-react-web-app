import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <li className="list-group-item d-flex">
      <input className="form-control"
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <button onClick={() => dispatch(updateTodo(todo))} className="btn btn-warning ms-2 me-2"
        id="wd-update-todo-click"> Update </button>
      <button onClick={() => dispatch(addTodo(todo))} className="btn btn-primary"
        id="wd-add-todo-click"> Add </button>
    </li>
  );
}
