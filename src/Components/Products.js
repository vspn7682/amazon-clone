import React, { useState, useEffect } from "react";
import star_grey from "../img/star_grey.svg";
import start_filled from "../img/start_filled.svg";
import bg from '../img/bg.jpg'


import Axios from "axios";
import { random, commerce } from "faker";


const Products = ({ addtoCart }) => {
    const apiKey = "563492ad6f9170000100000109209b0268a9408981c9ebaa3c53a488";
    const url =
        "https://api.pexels.com/v1/search?query=portrait&per_page=8&page=1";

    const [products, setProducts] = useState([]);

    const fetchPhotos = async () => {
        const { data } = await Axios.get(url, {
            headers: {
                Authorization: apiKey,
            },
        });

        const { photos } = data;

        const allProducts = photos.map((photo) => ({
            smallImage: photo.src.medium,
            tinyImage: photo.src.tiny,
            productName: random.word(),
            productPrice: commerce.price(),
            id: random.uuid(),
        }));

        setProducts(allProducts);
    };

    const addItem = (product) => {
        addtoCart(product)
    }


    useEffect(() => {
        fetchPhotos();
    }, []);

    return (

        <>
            <button className="next"><img src="img/next.png" alt="" /></button>
            <button className="prev"><img src="img/prev.png" alt="" /></button>

            <section className="header">
                <div className="hero">
                    <img src={bg} alt="" />
                </div>
            </section>

            <section className="products">
                {/* <!--Row 1--> */}
                <div className="container">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            <img className="card-img" src={product.smallImage} alt="" />
                            <a href="#" className="card-title">{product.productName}</a>
                            <div className="stars">
                                <img src={start_filled} alt="" />
                                <img src={start_filled} alt="" />
                                <img src={start_filled} alt="" />
                                <img src={start_filled} alt="" />
                                <img src={star_grey} alt="" />
                            </div>
                            <p className="price">Rs. {product.productPrice}</p>
                            <button onClick={() => addItem(product)} className="addtoCart">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>
        </>


    );
};

export default Products;
