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
function Block8() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.equipment);
    useEffect(() => {
        dispatch(getEquipment());
    }, [dispatch])

    return (
                <div className="products">
            {data?.length > 0 ? (
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
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    )
}

export default Block8
