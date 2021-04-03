import { Button } from 'reactstrap'
import React from 'react'
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/user";
import { removeAllTodo } from '../redux/actions/todos';
function Header() {
    const dispatch = useDispatch();
    return (
        <div style={{height:'50px',margin:'10px',display:'flex',justifyContent:'flex-end'}}>
            <Button onClick={() => {dispatch(removeAllTodo());dispatch(removeUser())}} style={{}}>Log Out</Button >
        </div>
    )
}

export default Header
