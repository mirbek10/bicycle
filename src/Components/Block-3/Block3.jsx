import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBicycles } from "../../store/bikeSlice";
import './Block3.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BikeLoader from "../../shared/loader/BikeLoader";
import Card from "../Card/Card";

function Block3() {
    const { bicycles, status } = useSelector((state) => state.bike);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBicycles());
    }, [dispatch]);
    if (status === "loading") {
        return <BikeLoader />;
    }

    return (
        <div className="products">
            <h1 className="title">Новинки</h1>
            
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {bicycles.slice(0, 8).map((bicycle) => (
                        <SwiperSlide key={bicycle.id}>
                            <Card el={bicycle} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                
            
        </div>
    );
}

export default Block3;
