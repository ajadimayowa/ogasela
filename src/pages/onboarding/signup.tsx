import React, { useState } from "react";
import style from '../css/homepage.module.css';
import InputField from "../../components/inputfields/input";
import PrimaryButton from "../../components/buttons/primaryButton";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

const SignUpPage = () => {
    const [userBio, setUserBio] = useState({ username: "", password: "" });
    const [errorLogin, setErrorLogin] = useState(true);
    const [show, setShow] = useState(false);

    const userInfo = {
        fullname: '',
        email: '',
        phoneNumber : '',
        password: '',
        confirmPassword : ''
    }

    const signupSchema = yup.object({
        fullname : yup.string().min(10).required(`Field cannot be empty`),
        email: yup.string().email(`Must be a valid email`).required(`Email is required`),
        phoneNumber : yup.string().max(11).required(`Field cannot be empty`),
        password : yup.string().required(`Password is required`),
        confirmPassword : yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(`Field cannot be empty`)
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
                    onSubmit={(val)=>handleUserLogin(val)}
                    validationSchema={signupSchema}
                    >

                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        validateOnBlur,
                        errors
                    })=>(<form
                        onSubmit={handleSubmit}
                        className={`py-5 ${style.loginForm}`}
                    >
                        <h3 className="mb-4 text-primary">Register</h3>
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
                                gap: 7,
                                alignItems: "center",
                            }}
                        >
                            <InputField
                                title={''}
                                name={'fullname'}
                                error={errors.fullname}
                                label={'Fullname'}
                                icon={''}
                                type={'text'}
                                toggleShow={() => null}
                                passInput={handleChange}
                                placeholder={"jhon doe samuel"}
                            />

                            <InputField
                                label={'Email'}
                                name={'email'}
                                error={errors.email}
                                icon={''}
                                type={'email'}
                                toggleShow={() => null}
                                passInput={handleChange}
                                placeholder={"user@mail.com"}
                            />

                            <InputField
                                label={'Phone number'}
                                name={'phoneNumber'}
                                passInput={handleChange}
                                error={errors.phoneNumber}
                                placeholder={"8166064166"}
                                icon={""}
                                toggleShow={() => setShow(!show)}
                                type={'number'}
                            />

                            <InputField
                                label={'Password'}
                                passInput={handleChange}
                                name={'password'}
                                error={errors.password}
                                placeholder={"User12@##"}
                                icon={"show"}
                                toggleShow={() => setShow(!show)}
                                type={show ? "password" : 'text'}
                            />

                            <InputField

                                label={'Confirm password'}
                                name={'confirmPassword'}
                                error={errors.confirmPassword}
                                passInput={handleChange}
                                placeholder={"User12@##"}
                                icon={"show"}
                                toggleShow={() => setShow(!show)}
                                type={show ? "password" : 'text'}
                            />

                            <PrimaryButton title="Register" type="submit" />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    marginTop: "5px",
                                }}
                            >
                                {/* <span
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
                                ></span> */}
                            </div>
                            <Link to={'/login'}
                            style={{
                                textDecoration:'none'
                             }}
                            >
                            <p className="p-0 m-0">Already a member? 
                            <span 
                            style={{
                               cursor:'pointer'
                            }}
                            className="text-secondary px-1">Login</span></p>
                            </Link>
                            {errorLogin ? (
                                <p
                                className="px-4"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "0.7em",
                                        color: "red",
                                        margin: "0px",
                                        padding: "0px",
                                    }}
                                >
                                    Sorry a user with that email already exist. try a new email.
                                </p>
                            ) : null}
                            <div className="d-flex mt-3 px-4 w-100 justify-content-between" style={{fontSize:'0.7em'}}>
                                <Link to={'#'} 
                                style={{cursor:'pointer'}}
                                className="p-0 m-0">Privacy policy
                                </Link>
                                <Link to={'#'}  className="p-0 m-0">Terms and conditions</Link>
                            </div>
                        </div>
                    </form>)}
                    </Formik>
                </div>



            </div>
        </div>
    )

}

export default SignUpPage;