import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom' 
import axios from 'axios' 

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId") 
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const response = await axios.post('http://localhost:4000/api/order/verify', {success,orderId}) 
        if(response.data.success){ 
          alert("payment successfull")
            navigate('/')
        }
        else{
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
}, [])

  return (
    <div className='verify'>
      <div>

      </div>
    </div>
  )
}

export default Verify
