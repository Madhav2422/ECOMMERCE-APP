import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { Navigate, useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart,setCart]=useCart();
    const[auth,setAuth]=useAuth();
    const navigate =useNavigate();
  return (
    
    <Layout>
       <div className='container'>
        <div className='row'>
         <div className='col-md-12'>
            <h1 className='text-center bg-light p-3 mb-1'>
                {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className='text-center'>
                {cart?.length>1 ? `You have ${cart.length} in your cart ${auth?.token? "" :"Please login to checkout"} ` :"Your cart is empty" }
            </h4>
         </div>
        </div>
        <div className='row'>
          <div className='col-md-9'>
          <div className='row'>
            {
              cart?.map((p) =>(
                <div className='row'>
                  <div className='col-4'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                    
                  />
                  </div>
                  <div className='col-8'>details</div>
              </div>
              ))
            }
          </div>
          </div>
          <div className='col-md-3'>
            <button>Check | Payment</button>
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default CartPage