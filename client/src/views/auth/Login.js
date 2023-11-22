import React, { useState } from 'react'
import './style.css'
import Axios from 'axios';
import logo from "../../images/logo.png";
import { authenticate } from '../../data/api';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Row, Col } from "reactstrap";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
    const { getLoggedIn } = useAuth();


    async function loginFunc(e) {
        setMessage("");
        e.preventDefault();
        let nemail = (email.toLowerCase()).replace(/ /g, '');
        const loginData = { email: nemail, password };

        try {
            const { data } = await Axios.post(authenticate.userAuth, loginData);
            if (data.auth === true) {
                window.localStorage.setItem('token', data.token);
                await getLoggedIn();
                history.push('/admin/dashboard');
            } else {
                setMessage(data.msg);
            }
        } catch (err) {
            setMessage(err.response.data.msg + '!');
        }

    }

    return (
        <Row className='l' style={{ margin: 0, padding: 0, backgroundColor: "#F5F5F5" }}>
            <Col>
                <Row style={{ padding: "10px" }}>
                    <Col md={2}>   <img src={logo} style={{ width: "100px" }} alt={"logo"} /></Col>
                    <Col style={{ paddingTop: "27px", fontSize: "25px", fontWeight: "700" }}><span style={{ color: "#25A05C" }}>CMS</span> Elderly Homes</Col>
                </Row>
                <h4 style={{ color: 'red', textAlign: 'center' }}>{message}</h4>
                <div className="llogin-container">



                    <p className="ltitle">Welcome back</p>
                    <div>Login to ECMS</div>
                    <div className="lseparator"></div>

                    <form className="llogin-form" onSubmit={loginFunc}>
                        <div className="lform-control" style={{}}>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="lform-control">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <i className="fas fa-lock"></i>
                        </div>

                        <button className="lsubmit">Login</button>
                    </form>
                </div>
            </Col>
            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} className="side-image">
                <h4 style={{ color: "white" }}> Online Elderly Care Management System</h4>
                <img src={logo} style={{ width: "150px" }} alt={"logo"} />
            </Col>
        </Row >
    )
}

export default Login;