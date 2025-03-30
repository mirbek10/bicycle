import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBicycles } from "../../store/bikeSlice";
import Card from "../Card/Card";
import './Block3.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Block3() {
    const { bicycles } = useSelector((state) => state.bike);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBicycles());
    }, [dispatch]);

    useEffect(() => {
        console.log(bicycles);
    }, [bicycles]);

    return (
        <div className="products">
            {bicycles?.length > 0 ? (
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
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
}

export default Block3;
