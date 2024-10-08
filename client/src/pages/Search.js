import React from 'react'
import Layout from "../components/Layout/Layout"
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={"Search Results"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Products found"
                        : `Found  ${values?.results.length}`}</h6>
                    <div className='d-flex flex-wrap mt-4'>
                        {values?.results.map((p) => (
                            <div className='product-card' key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className='card-img-top'
                                    alt={p.name}
                                />
                                <div className='card-body'>
                                    <h5 className='card-title'>{p.name}</h5>
                                    <p className='card-text'>{p.description}</p>
                                    <p className='card-text'>${p.price}</p>
                                    <button className='btn btn-primary ms-1'>More details</button>
                                    <button className='btn btn-secondary ms-1'>Add to Cart</button>
                                </div>
                            </div>

                        ))
                        }

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search