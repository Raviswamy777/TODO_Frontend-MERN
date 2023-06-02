import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import TodoList from "./components/todolist";
import EditTodo from "./components/edittodo.js";
import CreateTodo from "./components/createtodo.js";
import {IoAddCircleOutline} from 'react-icons/io5'


function App() {
  return (
    <div className="container">
    <br/>
     <Routes>
      <Route path="/" exact element={<TodoList/>} />
      <Route path="/edit/:id" element={<EditTodo/>} />
      <Route path="/create" element={<CreateTodo/>} />
     </Routes>
    </div>
  );
}

export default App;
