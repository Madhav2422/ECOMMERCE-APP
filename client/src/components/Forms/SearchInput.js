import React from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate();
    const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate('/search');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword} // Fix the typo here
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchInput;
