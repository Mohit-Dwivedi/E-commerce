import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../Assets/cross_icon.png'

const Listproduct = () => {

    const [allproducts, setallproducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {setallproducts(data)}) 
        console.log(allproducts)
    }

    useEffect(() => {
        fetchInfo() 
    }, [])

    const removeproduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        })
        await fetchInfo()
    }

  return (
    <div className='listproduct'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index) => {
            return <>
             <div className="listproduct-format-main listproduct-format">
                <img key={index} className='listproduct-product-icon' src={product.image} alt="" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => {removeproduct(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
            <hr />
            </>
        })}
      </div>
    </div>
  )
}

export default Listproduct
