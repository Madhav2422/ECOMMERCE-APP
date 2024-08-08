import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState(""); // Fix casing here
    const [question, setQuestion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgotpassword', { email, question, newPassword });

            if (res && res.data.success) {
                toast.success(res.data.msg);
                navigate('/login');
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Forgot Password"}>
            <div className='form-container'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder='Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder='Enter your Favorite Sport'
                            value={question} onChange={(e) => setQuestion(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
