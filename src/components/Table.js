import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "reactstrap";
import AddTodo from "./AddTodo";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/actions/todos";
const columns = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "taskName", label: "Task Name", minWidth: 100 },
  {
    id: "email",
    label: "Priority",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "buttons",
    label: "buttons",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ind, setInd] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = (index) => {
    dispatch(deleteTodo({ data: { id: props.data[index]._id, index: index } }));
  };

  return (
    <>
    
      {modal == true ? (
        <AddTodo
          type={"edit"}
          userDetail={props.userDetail}
          modal={modal}
          setModal={setModal}
          data={props.data[ind]}
          indexxx={ind}
        />
      ) : null}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let indx =
                    rowsPerPage == 10
                      ? index + page * 10
                      : rowsPerPage == 25
                      ? index + page * 25
                      : rowsPerPage == 100
                      ? index + page * 100
                      : index;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "buttons" ? (
                              <>
                                <Button
                                  onClick={() => {
                                    setModal(!modal);
                                    setInd(indx);
                                  }}
                                  color="success"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => deleteHandler(indx)}
                                  color="danger"
                                >
                                  Delete
                                </Button>
                              </>
                            ) : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
