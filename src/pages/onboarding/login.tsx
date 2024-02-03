import React, { useState } from "react";
import style from '../css/homepage.module.css';
import InputField from "../../components/inputfields/input";
import PrimaryButton from "../../components/buttons/primaryButton";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
    const [userBio, setUserBio] = useState({ username: "", password: "" });
    const [errorLogin, setErrorLogin] = useState(false);
    const [show, setShow] = useState(false);

    const userInfo = {
        email: '',
        password: ''
    }

    const loginSchema = yup.object({
        email: yup.string().email(`Must be a valid email`).required(`Email is required`),
        password : yup.string().required(`Password can't be empty`)
    })

    const handleUserLogin = (val: any) => {
        console.log(val)
        // e.preventDefault();
        // if (userBio.username == "") {
        //     alert("Username cannot be empty");
        // } else {
        //     console.log(userBio);
        // }
    };

    return (
        <div className={`${style.container}`}>
            <div className={`${style.main}`}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Formik
                        initialValues={userInfo}
                        onSubmit={(val) => handleUserLogin(val)}
                        validationSchema={loginSchema}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            errors,
                            values }) =>
                        (<form
                            onSubmit={handleSubmit}
                            className={`${style.loginForm}`}
                        >
                            <h3 className="mb-4 text-primary">Login</h3>
                            {/* <img
            src={loginLogo}
            height="30em"
            style={{ marginBottom: "3em", marginTop: "3em" }}
          /> */}
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <InputField
                                    name='email'
                                    error={errors.email}
                                    icon={''}
                                    type={'email'}
                                    toggleShow={() => null}
                                    passInput={handleChange}
                                    placeholder={"Email"}
                                />
                                <InputField
                                    name='password'
                                    error={errors.password}
                                    title={'Password'}
                                    passInput={handleChange}
                                    placeholder={"Password"}
                                    icon={"show"}
                                    toggleShow={() => setShow(!show)}
                                    type={show ? "password" : 'text'}
                                />
                                <PrimaryButton title="Login" type="submit" />
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        marginTop: "5px",
                                    }}
                                >
                                    <span
                                        style={{
                                            border: "0.5px solid black",
                                            maxHeight: "0.01em",
                                            minWidth: "5em",
                                        }}
                                    ></span>{" "}
                                    OR
                                    <span
                                        style={{
                                            border: "0.5px solid black",
                                            maxHeight: "0.01em",
                                            minWidth: "5em",
                                        }}
                                    ></span>
                                </div>
                                <Link to={'#'}

                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }} className="text-primary">Login with facebook
                                </Link>
                                {errorLogin ? (
                                    <p
                                        style={{
                                            textAlign: "center",
                                            fontSize: "0.7em",
                                            color: "red",
                                            margin: "0px",
                                            padding: "0px",
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Sorry, your password or username was incorrect. Please
                                        double-check your password.
                                    </p>
                                ) : null}
                                <Link to={'#'}
                                    className="mt-3"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: "0.7em",
                                        textDecoration: 'none'
                                    }}
                                >Forgot password?</Link>

                                <Link className="mt-4" to={'/signup'}
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    <p className="p-0 m-0">New user?
                                        <span
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            className="text-secondary px-1">Register</span></p>
                                </Link>
                            </div>
                        </form>)}
                    </Formik>
                </div>



            </div>
        </div>
    )

}

export default LoginPage;