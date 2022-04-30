import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Modal,
  Row,
  Col,
  ButtonToolbar,
} from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { authUser } from "../../store/actions";
import "./style.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [dialogue_open_flag, setDialogue_open_flag] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const handleClose = () => {};

  useEffect(() => {
    setDialogue_open_flag(true);
  }, []);

  useEffect(() => {
    if(isAuthenticated) history.push('/grocery')
  }, [isAuthenticated]);

  return (
    <Container>
      <Modal
        show={dialogue_open_flag}
        onHide={handleClose}
        className="custom-card1"
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Log In to View your Grocery List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              <Button className="fb-btn mb-3 px-3 py-2">
                Login In with Facebook
              </Button>
              <Button className="google-btn px-3 py-2">
                Login In with Google
              </Button>
            </Col>
            <Col md={1} className="or">
              or
            </Col>
            <Col md={6} className="d-block right-panel">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(authUser({ setSubmitting, history, values }));
                }}
              >
                {({ handleChange, values, errors, touched, handleSubmit }) => (
                  <form className="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Your email"
                        onChange={handleChange}
                        autoComplete="username"
                        isInvalid={errors.email && touched.email}
                      />
                      {errors.email && touched.email && (
                        <small className="mt-1 block text-danger">
                          {errors.email}
                        </small>
                      )}
                    </div>
                    <div>
                      <Form.Control
                        type="password"
                        name="password"
                        isInvalid={errors.password && touched.password}
                        placeholder="Create a Password"
                        onChange={handleChange}
                        value={values.password}
                        autoComplete="new-password"
                      />
                      {errors.password && touched.password && (
                        <small className="mt-1 block text-danger">
                          {errors.password}
                        </small>
                      )}
                    </div>
                    <Form.Label className="lbl_text text-left" column md={12}>
                      <a className="forget" href="/forgotpass">
                        Forgot Password?
                      </a>
                    </Form.Label>
                    <ButtonToolbar>
                      <Button
                        variant="success"
                        type="submit"
                        size="md"
                        className="mt-3"
                      >
                        {isSubmitting && (
                          <div
                            class="spinner-border spinner-border-sm mr-2 text-light"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                        Login
                      </Button>
                    </ButtonToolbar>
                    <Form.Label
                      className="lbl_text mt-4 text-right pb-0"
                      column
                      md={12}
                    >
                      Don't have an account?{" "}
                      <a className="signup" href="/signup">
                        Sign Up
                      </a>
                    </Form.Label>
                    <Form.Label
                      className="lbl_text text-right pt-0"
                      column
                      md={12}
                    >
                      or{" "}
                      <a className="continue" href="/v2">
                        continue as guest
                      </a>
                    </Form.Label>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default withRouter(Login);
