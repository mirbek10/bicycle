import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import '../Block-3/Block3.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getEquipment } from "../../store/Equipmentslice/EquipmentSLice";
import BikeLoader from "../../shared/loader/BikeLoader";
function Block8() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.equipment);
    useEffect(() => {
        dispatch(getEquipment());
    }, [dispatch])

    if (loading) return <BikeLoader />;

    return (
        <div className="products">
            <h1 className="title">Экипировка</h1>
           
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
                    {data.slice(0, 8).map((el) => (
                        <SwiperSlide key={el.id}>
                            <Card el={el} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            
        </div>
    )
}

export default Block8
