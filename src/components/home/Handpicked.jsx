import React from 'react'
import { products } from '../../assets/constants/constant'
import Typography from '../common/Typography'

const Handpicked = () => {
    return (
        <div>
            {
                products?.map((product) => {
                    return (
                        <div className='bg-[#F8F8F8] p-12 w-[400px] relative'>
                            <img src={product.image} alt={product.title} />
                            <Typography varient="small" >{product.category}</Typography>
                            <Typography varient="h6" >{product.category}</Typography>
                            <Typography varient="h3" style="text-[#2196F3] font-semibold absolute top-4 left-4" >{`${product.currency} ${product.price}`}</Typography>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Handpicked