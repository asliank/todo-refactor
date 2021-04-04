import { Button } from "reactstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/user";
import { removeAllTodo } from "../redux/actions/todos";
import swal from "sweetalert";
function Header() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    swal({
      title: "Are you sure ?",
      text: "Your will be logged out !",
      icon: "warning",
      buttons: [true, "Confirm"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeAllTodo());
        dispatch(removeUser());
      }
    });
  };
  return (
    <div
      style={{
        height: "50px",
        margin: "10px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button onClick={logoutHandler} style={{}}>
        Log Out
      </Button>
    </div>
  );
}

export default Header;
