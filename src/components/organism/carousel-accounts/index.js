import { useState } from "react";
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper/core';

import 'swiper/swiper.scss';
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

import CardAccount from "../../molecule/card-account"

import styles from './styles.module.scss'
import { useEffect } from "react";

SwiperCore.use([ Mousewheel ]);

export default function AccountsCarousel(){
  
  const accounts = useSelector(({ accounts }) => accounts.items );
  const [ slidesPerView, setSlidesPerView ] = useState( getSlidersPerView() );

  useEffect(() => {
    window.addEventListener('resize', function(){
      setSlidesPerView(getSlidersPerView())
    })
  }, []);

  function getSlidersPerView(){
    return Math.ceil(window.innerWidth / 610);
  }

  return (
    <section className={styles.section}>
      <Swiper
        spaceBetween={5}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        centerInsufficientSlides={true}
        freeMode={true}
        className={styles.swiper}
        grabCursor={true}
        mousewheel={true} 
        freeModeSticky={true}
        freeModeMomentumRatio={0.1}
      >
        {accounts.map(( account, index ) => (
          <SwiperSlide key={ account.id } className={styles.slide}>
            <CardAccount
              id={ account.id }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}