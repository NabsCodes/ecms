import React, { useState } from 'react'
import './style.css'
import Axios from 'axios';
import signupImage from './login.png';
import { authenticate } from '../../data/api';
import { Link } from 'react-router-dom';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [message, setMessage] = useState('');


    async function registerFunc(e) {
        e.preventDefault();

        try {
            let nemail = email.toLowerCase().replace(/ /g, '');
            const registerData = { name, email: nemail, phone, address, password };
            const response = await Axios.post(authenticate.addUser, registerData);
            setMessage(response.data.msg + '.');
            setTimeout(() => {
                setMessage("");
            }, 5000);
        } catch (err) {
            setMessage(err.response.data.msg + '!');
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }

    }

    return (
        <div className="lbody l">
            <section className="lside">
                <img src={signupImage} style={{}} alt="" />
            </section>

            <section className="lmain" style={{ marginTop: "-45px" }}>
                <div className="llogin-container">
                    <h4 style={{ color: 'red', textAlign: 'center' }}>{message}</h4>
                    <p className="ltitle">Register</p>
                    <Link to="/">Already have an account? Login</Link>
                    <div className="lseparator"></div>

                    <form className="llogin-form" onSubmit={registerFunc}>
                        <div className="lform-control">
                            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="lform-control">
                            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="lform-control">
                            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                            <i className="fas fa-home"></i>
                        </div>
                        <div className="lform-control">
                            <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                            <i className="fas fa-phone"></i>
                        </div>
                        <div className="lform-control">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <i className="fas fa-lock"></i>
                        </div>

                        <button className="lsubmit">Register</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register;
