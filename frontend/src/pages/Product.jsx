import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Breadcums from '../components/Breadcums/Breadcums'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import Description from '../components/Description/Description'
import RelatedProduct from '../components/RelatedPRoduct/RelatedProduct'

const Product = () => { 
  const {all_product} = useContext(ShopContext) 
  const {productId} = useParams()   
  const product = all_product.find((e) => e.id === Number(productId)) 

  return (
    <div className='product'>
      <Breadcums product={product}/>
      <ProductDisplay product={product}/>
      <Description />
      <RelatedProduct />
    </div>
  )
}

export default Product
