import { Routes, Route } from "react-router-dom";
import { TaskForm, TaskList, Navbar } from "./components";
import { Container } from "@mui/material";

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
