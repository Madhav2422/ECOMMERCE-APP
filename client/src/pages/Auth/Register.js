import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [question, setQuestion] = useState("")

  const navigate = useNavigate()
  
  //form
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', { name, email, password, address, phone,question })

      if ( res && res.data.success) {
        toast.success(res.data.msg)
        navigate('/login');
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
    <Layout title={"Register Page"}>
      <div className='form-container'>
        <h1>Register Page </h1>
        <form  onSubmit={handleSubmit} >
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputName" placeholder=' Name'
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputName" placeholder=' Email'
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="number" className="form-control" id="exampleInputName" placeholder='Phone number'
              value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputName" placeholder='Address'
              value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputName" placeholder='Favorite Sports'
              value={question} onChange={(e) => setQuestion(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>



      </div>
    </Layout>
  )
}

export default Register