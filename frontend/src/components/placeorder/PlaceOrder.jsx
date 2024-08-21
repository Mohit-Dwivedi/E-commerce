import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom' 
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'

const PlaceOrder = () => {
   const {all_product, cartItems, token, removetocart, gettotalcartamount} = useContext(ShopContext)
  //  token, food_list, cartItems, url 
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city:'',
    state: '',
    zipcode: '',
    phone: '',
    country: ''
  })             

  const onChangeHandler = (event) => {  
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data, [name]:value}))
  }  

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    all_product.map((item) => {
      if(cartItems[item?._id] > 0){ 
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }  
    }) 

    let orderData = {
      address: data,
      items: orderItems,
      amount: gettotalcartamount()+2
    }
    let response = await axios.post('http://localhost:4000/api/order/place', orderData, {headers: {token}})  
    if(response.data.success){ 
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }
  }

  //   useEffect(() => {
  //     if(!token){
  //       navigate('/cart')
  //     }
  //     else if(getTotalCartAmount() === 0){
  //       navigate('/cart')
  //     }
  // }, [token])
 
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
        <input required onChange={onChangeHandler} name='firstName' type="text" value={data.firstName} placeholder='First Name'/>
        <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address'/>
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fileds">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fileds">
          <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='zip Code'/>
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone'/>
      </div>

      <div className="cartItem-dowm">
      <div className="cartItem-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartItem-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartItem-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartItem-total-item">
                    <h3>Total</h3>
                    <h3>${gettotalcartamount()}</h3>
                </div>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
