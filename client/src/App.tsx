import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { useAppSelector } from "./hooks/redux";
import { IUser } from "./models/user-model";
import { UserService } from "./services/user-service";
import { checkAuth, logout } from "./store/actionCreators/auth-creators";

function App() {
  const { isAuth, isLoading, user } = useAppSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isAuth) {
    return (
      <>
        <h3>Welcome, {user.email} !</h3>
        {user.isActivated ? (
          <h4>Account is activated</h4>
        ) : (
          <h4>Activate your account please</h4>
        )}
        <button
          onClick={() => {
            dispatch(logout());
            setUsers([]);
          }}
        >
          Logout
        </button>
        <button onClick={getUsers}>Get users</button>
        {users.map((userItem) => (
          <div>{userItem.email}</div>
        ))}
      </>
    );
  }
  return (
    <div>
      <LoginForm />
      <button onClick={getUsers}>Get users</button>
      {users.map((userItem) => (
        <div>{userItem.email}</div>
      ))}
    </div>
  );
}

export default App;
