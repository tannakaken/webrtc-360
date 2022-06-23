import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { AuthApi } from "../../generated";

import "./Login.scss";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <Container className="p-5">
      <Card className="shadow bg-white rounded login">
        <Card.Body>
          <Card.Title className={"text-center"}>
            <h1>ログイン</h1>
          </Card.Title>
          <Form className={"mt-5"}>
            <Form.Control
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Control
              type="button"
              onClick={async () => {
                const authApi = new AuthApi();
                try {
                  const response = await authApi.token(username, password);
                  const token = response.data;
                  console.warn(token);
                  navigate("main");
                } catch (error) {
                  console.warn(error);
                }
              }}
              className="d-block mx-auto mt-5 btn btn-primary"
              value="ログイン"
            />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
