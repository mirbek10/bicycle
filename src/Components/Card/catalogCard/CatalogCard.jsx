import React from 'react'

function CatalogCard({ el }) {
    return (
        <div className="bike-card">
            <div className={`sold-out-label ${el.buying === true ? 'В-наличии' : 'Распродано'}`}>
                {el.buying === true ? 'В наличии' : 'Распродано'}
            </div>

            <div className="bike-image-container">
                <img src={el.image} alt="" className="bike-image" />
            </div>

            <div className="bike-info">
                <h2 className="bike-model">{el.name}</h2>
                <p className="bike-price">{el.price}$</p>
            </div>
            <butto>В карзину</butto>
        </div>
    )
}

export default CatalogCard
