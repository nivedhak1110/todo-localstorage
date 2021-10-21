import { useEffect, useState } from "react";
import TodoForm from "./components/todoForm/todoForm";
import TodoDisplay from "./components/todoDisplay/todoDisplay";
import { Layout, Menu } from "antd";
import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
function App() {
  const [todos, setTodos] = useState([]);

  const onFormSubmit = (todo) => {
    console.log(todo);
    setTodos([
      ...todos,
      {
        ...todo,
        id: Math.random() * 1000,
        date: todo.dateValue,
        status: todo.statusValue,
      },
    ]);
  };

  //ondelete
  const onDeleteTodo = (todoId) => {
    console.log(todoId);
    const newTodos =
      todoId === "all" ? [] : todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };
  //navbar
  const { Header, Content, Footer } = Layout;

  //local storage
  useEffect(() => {
    const data = localStorage.getItem("data");

    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <div className="App">
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            {/* <div className="title">Todo</div> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/" className="link">
                  todoForm
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/display" className="link">
                  displayTodo
                </NavLink>
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <Switch>
              <Route exact path="/">
                <TodoForm onFormSubmit={onFormSubmit} />
              </Route>
              <Route path="/display">
                <TodoDisplay todos={todos} onDeleteTodo={onDeleteTodo} />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
