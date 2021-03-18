import React from 'react'
import bg from '../img/bg.jpg'


const Header = () => {
    return (
        <>
            <button className="next"><img src="img/next.png" alt="" /></button>
            <button className="prev"><img src="img/prev.png" alt="" /></button>

            <section className="header">
                <div className="hero">
                    <img src={bg} alt="" />
                </div>
            </section>

        </>
    )
}

export default Header
