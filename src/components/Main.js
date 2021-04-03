import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import Header from "./Header";
import { Button } from "reactstrap";
import AddTodo from "./AddTodo";
import { getTodo } from "../redux/actions/todos";
const Main = ({ detail }) => {
  let userDetail = detail.email;
  const { todoList } = useSelector((state) => state.todoDetails);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getTodo(userDetail));
  }, []);

  return (
    <>
      {modal == true ? (
        <AddTodo
          type={"add"}
          userDetail={userDetail}
          modal={modal}
          setModal={setModal}
        />
      ) : null}
      <Container component="main">
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <Button onClick={() => setModal(!modal)} color="primary">
            {" "}
            Add Todo
          </Button>
        </div>

        <Table userDetail={userDetail} data={todoList} />
      </Container>
    </>
  );
};

export default Main;
