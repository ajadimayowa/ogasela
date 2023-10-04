import React, { useState } from "react";
import style from '../css/homepage.module.css';
import InputField from "../../components/inputfields/input";
import PrimaryButton from "../../components/buttons/primaryButton";

const LoginPage = () => {
    const [userBio, setUserBio] = useState({ username: "", password: "" });
    const [errorLogin, setErrorLogin] = useState(false);
    const [show, setShow] = useState(false);

    const handleUserLogin = (e: any) => {
        e.preventDefault();
        if (userBio.username == "") {
            alert("Username cannot be empty");
        } else {
            console.log(userBio);
        }
    };
    return (
        <div className={`${style.container}`}>
            <div className={`${style.main}`}>
                <div style={{ width: '60%' }}>
                    <form
                        onSubmit={(e) => handleUserLogin(e)}
                        className={`${style.loginForm}`}
                    >
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
                                title={'Username'}
                                icon={''}
                                type={'text'}
                                toggleShow={() => null}
                                passInput={(e: any) =>
                                    setUserBio({ ...userBio, username: e.target.value })
                                }
                                placeholder={"Username"}
                            />
                            <InputField
                                title={'Password'}
                                passInput={(e: any) =>
                                    setUserBio({ ...userBio, password: e.target.value })
                                }
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
                            <span>Login with facebook</span>
                            {errorLogin ? (
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: "0.7em",
                                        color: "red",
                                        margin: "0px",
                                        padding: "0px",
                                    }}
                                >
                                    Sorry, your password or username was incorrect. Please
                                    double-check your password.
                                </p>
                            ) : null}
                            <p>Forgot password?</p>
                        </div>
                    </form>
                </div>


                
            </div>
        </div>
    )

}

export default LoginPage;