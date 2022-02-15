import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper/core";

import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

import CardAccount from "../../molecule/card-account";

import styles from "./styles.module.scss";

SwiperCore.use([Mousewheel]);

export default function AccountsCarousel() {
  const accounts = useSelector(({ accounts }) => accounts.items);
  const [slidesPerView, setSlidesPerView] = useState(getSlidersPerView());
  const [slidesShowClassName, setSlidesShowClassName] = useState([]);

  useEffect(() => {
    const windowEventListener = window.addEventListener("resize", function () {
      setSlidesPerView(getSlidersPerView());
    });
    return () => window.removeEventListener("resize", windowEventListener);
  }, [setSlidesPerView]);

  useEffect(() => {
    const index = slidesShowClassName.length;
    if (index < accounts.length) {
      const timeout = setTimeout(() => {
        let _slidesShowClassName = [...slidesShowClassName];
        _slidesShowClassName[index] = styles.show;
        setSlidesShowClassName(_slidesShowClassName);
      }, 100 * index);

      return () => clearTimeout(timeout);
    }
  }, [setSlidesShowClassName, slidesShowClassName, accounts]);

  function getSlidersPerView() {
    return Math.ceil(window.innerWidth / 610);
  }

  return (
    <section className={styles.section}>
      <Swiper
        spaceBetween={5}
        slidesPerView={slidesPerView}
        centerInsufficientSlides={true}
        freeMode={true}
        className={styles.swiper}
        grabCursor={true}
        mousewheel={true}
        freeModeSticky={true}
        freeModeMomentumRatio={0.1}
      >
        {accounts.map((account, index) => (
          <SwiperSlide key={account.id} className={`${styles.slide}`}>
            <CardAccount
              id={account.id}
              className={`${styles.cardAccount} ${slidesShowClassName[index]}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
