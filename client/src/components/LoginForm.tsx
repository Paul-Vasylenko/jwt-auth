import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, registration } from "../store/actionCreators/auth-creators";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(login(email, password))}>Login</button>
      <button onClick={() => dispatch(registration(email, password))}>
        Registration
      </button>
    </div>
  );
}
