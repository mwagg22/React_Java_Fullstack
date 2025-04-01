import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import { store } from 'react-notifications-component';

export default function Register({ userStatus }) {
    const [user, setUser] = useState([])
    const [errors, setErrors] = useState([]);

    const history = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        const response = await fetch("http://groopbackend.us-east-1.elasticbeanstalk.com/authenticate/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.values(user)),
        });

        if (response.status === 200 || response.status === 201) {
            store.addNotification({
                title: "Registration Success",
                message: "User Created",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            });
            history('/');
            console.log("Successful Registration!")
        } else if (response.status === 400) {
            const errors = await response.json();
            setErrors(errors);
        } else if (response.status === 403) {
            setErrors(["Registration failed."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

  
    //Using Notification from https://www.npmjs.com/package/react-notifications-component
    return (
        <div className="container">
            <Errors errors={errors} />           
            <h2>Register New User</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input id="username" className="form-control" name="username" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        id="password" className="form-control" name="password" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        id="firstName" className="form-control" name="firstName" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        id="lastName" className="form-control" name="lastName" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        id="email" className="form-control" name="email" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        id="location" className="form-control" name="location" type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <br/>
                <div className="form-group">
                    <button className="btn btn-info" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};