import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./App.css";

const App = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  interface Provider {
    todo: string;
  }

  const [todo, setTodo] = React.useState<Provider[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleAdd = () => {
    if (inputRef.current) {
      const inputVal = inputRef.current.value;
      const todoVal: any = JSON.parse(localStorage.getItem("todo")!);

      if (todoVal?.length) {
        const list = [...todo, { todo: inputVal }];
        console.log(list);
        localStorage.setItem("todo", JSON.stringify(list));
        setTodo(list);
      } else {
        const todo = [{ todo: inputVal }];
        localStorage.setItem("todo", JSON.stringify(todo));
        setLoading(true);
      }
      inputRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const todoVal: any = JSON.parse(localStorage.getItem("todo")!);
    setTodo(todoVal);
  }, [inputRef, loading]);

  const handleDelete = (id: number) => {
    const todoVal: any = JSON.parse(localStorage.getItem("todo")!);
    const filteredVal = todoVal.filter(
      (it: object, index: number) => index !== id
    );
    setTodo(filteredVal);
    localStorage.setItem("todo", JSON.stringify(filteredVal));
  };

  return (
    <div className="App" style={{ width: "70%", margin: "auto" }}>
      <h2>Todo Application</h2>

      <Box
        sx={{
          border: 2,
          borderRadius: "10px",
          borderColor: "blue",
          paddingTop: "20px",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <TextField
          inputRef={inputRef}
          id="outlined-basic"
          label="Enter your text"
          variant="standard"
          style={{ marginRight: "20px" }}
        />
        <Button variant="outlined" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <TableContainer
        sx={{ border: 2, borderRadius: "10px", borderColor: "green" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SN</TableCell>
              <TableCell align="center">Todo</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo?.length &&
              todo?.map((td, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="center">{td.todo}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleDelete(index)}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
