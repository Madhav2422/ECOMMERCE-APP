import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams(); 
    const [product, setProduct] = useState({});

   
    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);

    // Get product details from API
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product || {}); // Ensure a default empty object is set
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <div className='row container'>
                <div className='col-md-6'>
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                    />
                </div>
                <div className='col-md-6 text-center'>
                    <h1>Product Details</h1>
                    <h4>Name: {product.name}</h4>
                    <h4>Description: {product.description}</h4>
                    <h4>Price: {product.price}</h4>
                    {product.category && (
                        <h4>Category: {product.category.name}</h4> // Display category name
                    )}
                     <button className='btn btn-secondary ms-1'>Add to Cart</button>
                </div>
            </div>
           
        </Layout>
    );
};

export default ProductDetails;
