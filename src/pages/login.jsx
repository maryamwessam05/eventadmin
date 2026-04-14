import React, { useState } from 'react';
import "./login.css"
import logoicon from "../assets/iconlogo.svg"
import mail from "../assets/inputicon01.svg"
import lock from "../assets/inputicon02.svg"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = "user@admin.com";
const ADMIN_PASSWORD = "12345";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            navigate("/dashboard");
        } else {
            setErrors({ auth: "Invalid email or password" });
        }
    };

    return (
        <>
            <div className="logincont">
                <img src={logoicon} alt="" />

                <form className='login' onSubmit={handleSubmit}>
                    <h1>Sign in</h1>

                    {errors.auth && <span className="error">{errors.auth}</span>}

                    <div className="inpgroup">
                        <label htmlFor="">Email</label>
                        <div className="inputlogin">
                            <img src={mail} alt="" />
                            <input
                                type="text"
                                placeholder='your@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="inpgroup">
                        <label htmlFor="">Password</label>
                        <div className="inputlogin">
                            <img src={lock} alt="" />
                            <input
                                type="password"
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <Link className='cont' to={"/home"}>
                    <button type="submit">Continue</button>
                    </Link>

                    <h4>By continuing, you agree to our <span>Terms & Privacy Policy</span></h4>
                </form>
            </div>
        </>
    );
};

export default Login;