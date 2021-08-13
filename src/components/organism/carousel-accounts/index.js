import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';

import CardAccount from "../../molecule/card-account"

import styles from './styles.module.scss'

export default function AccountsCarousel(){
  
  const accounts = useSelector(({ accounts }) => accounts.items );
  
  return (
    <Swiper
      spaceBetween={21}
      slidesPerView={2}
      centeredSlides={true}
      freeMode={true}
    >
      {accounts.map(( account, index ) => (
        <SwiperSlide key={ account.id }>
          <CardAccount
            id={ account.id }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}