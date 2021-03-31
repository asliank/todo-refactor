import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const AddTodo = (props) => {
  const { buttonLabel, className } = props;

  const toggle = () => props.setModal(!props.modal);
  const initialValues = {
    taskName: props.type === "add" ? "" : props.data.taskName,
  };
  const validationSchema = () =>
    Yup.object({
      taskName: Yup.string().required("Required!"),
    });
  const onSubmit = () => {
    props.type === "add"
      ? axios
          .post("http://localhost:8080/addTodo", {
            email: props.userDetail,
            taskName: formik.values.taskName,
          })
          .then(() => toggle())
      : axios
          .put("http://localhost:8080/editToDo", {
            data: { id: props.data._id, newTaskName: formik.values.taskName },
          })
          .then(() => toggle());
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <Modal isOpen={props.modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {props.type === "add" ? "Add Todo" : "Edit Todo"}
        </ModalHeader>
        <ModalBody>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taskName"
            label="Enter Task Name"
            name="taskName"
            onBlur={formik.handleBlur("taskName")}
            onChange={formik.handleChange("taskName")}
            value={formik.values.taskName}
            helperText={formik.errors.taskName}
            error={
              formik.errors.taskName && formik.touched.taskName ? true : false
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={formik.handleSubmit}>
            Add Todo
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddTodo;
