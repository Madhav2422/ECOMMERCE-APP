import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { Navigate, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map(item => { total = total + item.price })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    }
    catch (err) {
      console.log(err);
    }
  }


  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-3 mb-1'>
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='row'>
              {
                cart?.map((p) => (
                  <div className='row mb-3'>
                    <div className='col-4'>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className='card-img-top'
                        alt={p.name}

                      />
                    </div>
                    <div className='col-8'>
                      <h4>{p.name}</h4>
                      <p>{p.description}</p>
                      <h4>Price :{p.price}</h4>
                      <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}
                      >Remove </button>

                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <hr />
            <p>Total|Checkout|Payment</p>
            <hr />
            <h4>Total:{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning'
                    onClick={() => navigate('/dashboard/user/profile')}
                  >Update Address</button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {
                  auth?.token ? (
                    <button onClick={() => navigate('/dashboard/user/profile')} className='btn btn-outline'>Update Address</button>
                  ) : (
                    <button onClick={() => navigate('/login',{state:"/cart"})} className='btn btn-outline-warning'>Please login to checkout</button>
                  )
                }
              </div>

            )}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default CartPage