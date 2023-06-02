import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';
import {BiEdit} from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {IoAddCircleOutline} from 'react-icons/io5'
import '../index.css';

//var ColorScheme = require('color-scheme');

function TodoList(){
   
    const Todo = props => {
        const {todo_completed} =props.todo;
        const handleDelete = () =>{
            console.log(props.todo._id);
            axios.post('https://todobackend-m12f.onrender.com/todos/delete/'+props.todo._id).then(response => {
                console.log("item deleted");
                axios.get("https://todobackend-m12f.onrender.com/todos/").then(response => {
                    setTodoItems(response.data);
                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                console.log(err);
            })
        }
       

        return (
            <tr style={{backgroundColor:`#E5FDD1`}}>
                
            <td className= {todo_completed ? "completed" : "" }>{props.todo.todo_description}</td>
            <td className= {todo_completed ? "completed" : "" }>{props.todo.todo_responsible}</td>
            <td className= {todo_completed ? "completed" : "" }>{props.todo.todo_priority}</td>
            <td>
                <Link to={"/edit/"+props.todo._id}><BiEdit size={28} style={{color:"#FFA1A1"}}/></Link>
                <Link> <MdDelete onClick={handleDelete} size={28} style={{color: "#ee0202"}}/> </Link>           
             </td>
        </tr>
        );
    }

    const [todoitems, setTodoItems] = useState([]);
    useEffect(()=>{
        axios.get("https://todobackend-m12f.onrender.com/todos/").then(response => {
            setTodoItems(response.data);
        }).catch((err) =>{
            console.log(err);
        })
    },[]);

    useEffect(() => {
        console.log(todoitems);
        }, [todoitems]);

    function todoList() {
        return todoitems.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i}/>
        })
    }
    return(
        <div>
           <Link to="/" className="navbar-brand text-center" ><h2>TO-DO-LIST</h2></Link> 
            <table id="todo_items" className="table table-striped" style={{marginTop: 20}}>
                <thead style ={{backgroundColor: '#FFA1A1'}}>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoitems.length>0 ? todoList() : <p>Add Items</p>
                    }
                </tbody>
            </table>
            <Link to={"/create"}><IoAddCircleOutline size={40} style={{color: "#FFA1A1"}}/></Link>
        </div>
    )
}
export default TodoList;