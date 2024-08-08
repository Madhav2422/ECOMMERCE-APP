import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password })

            if (res && res.data.success) {
                toast.success(res.data.msg)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.msg)
            }


        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title={"Login Page"}>
            <div className='form-container'>
                <h1> Login </h1>
                <form onSubmit={handleSubmit} >


                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputName" placeholder=' Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <button type="button" onClick={() => {
                            navigate("/forgot-password");
                        }} className="btn btn-primary">Forgot Password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>



            </div>
        </Layout>
    )
}

export default Login