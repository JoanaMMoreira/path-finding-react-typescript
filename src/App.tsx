import React from "react";
import UserInput from "./components/UserInput";
import Table from "./components/Table";
import "./App.css";
import Container from "@material-ui/core/Container";

const App: React.FC = () => {
  return (
    <Container>
      <div className="App">
        <UserInput />
        <Table />
      </div>
    </Container>
  );
};

export default App;
