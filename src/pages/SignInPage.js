import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();

  const isValidForm = () => {
    return username.length > 0 && password.length > 0 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(username, password);
  };
  return (
    <div className="login-panel shadow-8 p-fluid">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Masukkan username dan password anad</p>

        <div className="mb-2">
          <InputText
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>

        <div className="mb-2">
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            toggleMask
            feedback={false}
          />
        </div>

        <div>
            <Button type="submit" disabled={!isValidForm}>Button</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
