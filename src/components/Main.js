import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import axios from "axios";
import Table from "./Table";
import Header from "./Header";
import { Button } from "reactstrap";
import AddTodo from "./AddTodo";
const Main = ({ detail }) => {
  
  let userDetail = detail.email;
  const [taskList, setTaskList] = useState([]);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/getTodo", { email: userDetail })
      .then((res) => {
        setTaskList(res.data);
      });
  }, [taskList]);

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

        <Table userDetail={userDetail} data={taskList} />
      </Container>
    </>
  );
};

export default Main;
