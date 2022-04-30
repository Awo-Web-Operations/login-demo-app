import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  ButtonToolbar,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authUser } from "../../store/actions";
import { setTimeout } from "timers";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Phone is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const handleClose = (delay) => {
    setTimeout(() => {
      this.props.history.push("/grocery");
    }, delay || 0);
  };

  useEffect(() => {
    if(isAuthenticated) history.push('/grocery')
  }, [isAuthenticated]);

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="modal registerme"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          <div>Sign Up</div>
          <span style={{ fontSize: "11pt" }}>
            Already have an account?
            <Link className="link-guest-word" to="/login">
              Login
            </Link>
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg>
              <Formik
                initialValues={{
                  email: "",
                  phoneNumber: "",
                  username: "",
                  password: "",
                  emailNotification: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(
                    authUser({ setSubmitting, history, values, isSignup: true })
                  );
                }}
              >
                {({ handleChange, values, errors, touched, handleSubmit }) => (
                  <form className="" onSubmit={handleSubmit}>
                    <Form.Group>
                      <div>
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
                      <Form.Label></Form.Label>
                      <div>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          placeholder="Your Phone Number"
                          onChange={handleChange}
                          value={values.phone}
                          isInvalid={errors.phone && touched.phone}
                        />
                        {errors.phone && touched.phone && (
                          <small className="mt-1 block text-danger">
                            {errors.phone}
                          </small>
                        )}
                      </div>
                    </Form.Group>
                    <hr />
                    <Form.Group>
                      <div>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          onChange={handleChange}
                          value={values.username}
                          isInvalid={errors.username && touched.username}
                        />
                        {errors.username && touched.username && (
                          <small className="mt-1 block text-danger">
                            {errors.username}
                          </small>
                        )}
                      </div>
                      <Form.Label></Form.Label>
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
                    </Form.Group>
                    <Form.Group controlId="formHorizontalCheck">
                      <Form.Label></Form.Label>
                      <Form.Check
                        value={values.emailNotification}
                        checked={values.emailNotification}
                        onChange={handleChange}
                        name="emailNotification"
                        label="Sign Up for Email Notifications"
                      />
                    </Form.Group>
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
                        Sign Up
                      </Button>
                    </ButtonToolbar>
                    <Link className="" to="/signup">
                      or Sign up as driver
                    </Link>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
