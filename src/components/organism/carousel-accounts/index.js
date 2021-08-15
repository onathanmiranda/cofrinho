import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Mousewheel } from 'swiper/core';

import 'swiper/swiper.scss';
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

import CardAccount from "../../molecule/card-account"

import styles from './styles.module.scss'

SwiperCore.use([ EffectCoverflow, Mousewheel ]);

export default function AccountsCarousel(){
  
  const accounts = useSelector(({ accounts }) => accounts.items );
  
  return (
    <section className={styles.section}>
      <Swiper
        spaceBetween={5}
        slidesPerView={'auto'}
        centeredSlides={true}
        freeMode={true}
        className={styles.swiper}
        grabCursor={true}
        effect={'coverflow'}
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