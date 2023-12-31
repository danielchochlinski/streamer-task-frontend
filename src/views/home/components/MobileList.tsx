import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import Card from "./Card";
import { IStreamer } from "../../../types/types";
interface IMobileList {
  data: IStreamer[];
}
const MobileList = ({ data }: IMobileList) => {
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((el: IStreamer, i: number) => (
          <SwiperSlide>
            <Card streamer={el} i={i} key={`${el.name}+${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default MobileList;
