import React from 'react'

import './ProductList.scss'
import Card from '../Card/Card'




function ProductList({ data }) {

    return (
        <div className='corausel container'>
            {
                data.map((item, index) => (
                        <Card 
                        key={index}
                        el={item}
                        />
                ))
            }
        </div>
    )
}

export default ProductList
