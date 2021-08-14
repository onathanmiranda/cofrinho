import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper/core';

import 'swiper/swiper.scss';
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

import CardAccount from "../../molecule/card-account"

import styles from './styles.module.scss'

SwiperCore.use([ EffectCoverflow ]);

export default function AccountsCarousel(){
  
  const accounts = useSelector(({ accounts }) => accounts.items );
  
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={'auto'}
      centeredSlides={true}
      freeMode={true}
      className={styles.swiper}
      effect={'coverflow'}
    >
      {accounts.map(( account, index ) => (
        <SwiperSlide key={ account.id } style={{ maxWidth: '32rem' }}>
          <CardAccount
            id={ account.id }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}