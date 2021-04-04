import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../redux/actions/todos";
const AddTodo = (props) => {
  const dispatch = useDispatch();
  const { buttonLabel, className } = props;

  const priorities = [
    {
      value: "LOW",
      label: "LOW",
    },
    {
      value: "MEDIUM",
      label: "MEDIUM  ",
    },
    {
      value: "HIGH",
      label: "HIGH",
    },
    {
      value: "CRITICAL",
      label: "CRITICAL",
    },
  ];

  const toggle = () => props.setModal(!props.modal);
  const initialValues = {
    taskName: props.type === "add" ? "" : props.data.taskName,
    taskDescription: props.type === "add" ? "" : props.data.taskDescription,
    taskPriority: props.type === "add" ? "LOW" : props.data.taskPriority,
  };
  const typeAdd = () => {
    dispatch(
      addTodo({
        email: props.userDetail,
        taskName: formik.values.taskName,
        taskDescription: formik.values.taskDescription,
        taskPriority: formik.values.taskPriority,
      })
    );
    toggle();
  };
  const typeEdit = () => {
    dispatch(
      editTodo({
        index: props.indexxx,
        data: {
          email: props.userDetail,
          id: props.data._id,
          newTaskName: formik.values.taskName,
          newTaskDescription: formik.values.taskDescription,
          newTaskPriority: formik.values.taskPriority,
        },
      })
    );
    toggle();
  };
  const validationSchema = () =>
    Yup.object({
      taskName: Yup.string().required("Required!"),
      taskDescription: Yup.string().required("Required"),
    });
  const onSubmit = () => {
    props.type === "add" ? typeAdd() : typeEdit();
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taskDescription"
            label="Enter Task Description"
            name="taskDescription"
            onBlur={formik.handleBlur("taskDescription")}
            onChange={formik.handleChange("taskDescription")}
            value={formik.values.taskDescription}
            helperText={formik.errors.taskDescription}
            error={
              formik.errors.taskDescription && formik.touched.taskDescription
                ? true
                : false
            }
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="taskPriority"
            select
            label="Task Priority"
            onBlur={formik.handleBlur("taskPriority")}
            value={formik.values.taskPriority}
            onChange={formik.handleChange("taskPriority")}
            error={
              formik.errors.taskPriority && formik.touched.taskPriority
                ? true
                : false
            }
          >
            {priorities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
