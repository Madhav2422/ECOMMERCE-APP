import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from "../components/Layout/UserMenu"
import { useAuth } from '../context/auth'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();

    // get User data
    useEffect(()=>{
        const{name,email,phone,address}=auth.user;
        setName(name)
        setAddress(address)
        setEmail(email)
        setPhone(phone)
    },[auth.user])

    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const{data} = await axios.put('/api/v1/auth/profile', { name, email, password, address, phone });
            if(data?.error){
                toast.error(data?.error)
            }
            else
            {
                setAuth({...auth,user:data?. updatedUser})
                let ls= localStorage.getItem("auth");
                ls=JSON.parse(ls)
                ls.user =data.updatedUser;
                localStorage.setItem('auth',JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }



        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }


    return (
        <Layout title={"DashBoard"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>

                        <div className='form-container'>
                        <form onSubmit={handleSubmit} >
                            <h4>User Profile</h4>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="exampleInputName" placeholder=' Name'
                                    value={name} onChange={(e) => setName(e.target.value)}  />
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" id="exampleInputName" placeholder=' Email'
                                    value={email} onChange={(e) => setEmail(e.target.value)} 
                                    disabled />
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                            </div>

                            <div className="mb-3">
                                <input type="number" className="form-control" id="exampleInputName" placeholder='Phone number'
                                    value={phone} onChange={(e) => setPhone(e.target.value)}  />
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" id="exampleInputName" placeholder='Address'
                                    value={address} onChange={(e) => setAddress(e.target.value)}  />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile