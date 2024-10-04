import {useRef, useState} from "react";
import Image from "next/image";
import {ImageBaseURL} from "@/config";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import IconButton from "@m3/icon_buttons/IconButton";
import Button from "@m3/buttons/Button";
import {Dialog} from "@headlessui/react";
import {Navigation} from "swiper/modules";
import Icon from "@m3/assets/icons/Icon";

export default function ProductSlider({product}) {
    const [images, setImages] = useState([product.thumbnail, ...product.images]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFullScreenDialogOpen,setIsFullScreenDialogOpen] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className={"flex"}>
            <div className={"md:w-2/12 md:flex hidden items-center justify-center"}>
                <div className={"space-y-2 "}>
                    {images.map((image, index) => (
                        <div onClick={() => setSelectedImage(index)} key={index}
                             className={`${selectedImage === index && "outline outline-primary-light outline-2 outline-offset-2"} border px-2 py-1 border-outline-variant-light dark:border-outline-variant-dark bg-surface-light dark:bg-surface-dark flex items-center justify-center overflow-hidden w-[60px] h-[60px] rounded-full`}>
                            <Image width={48} height={48} layout={"responsive"} src={ImageBaseURL + image.url}
                                   alt={""}/>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={"hidden relative md:flex items-center justify-center  overflow-hidden w-full md:w-10/12  md:h-[600px] rounded-[24px] bg-surface-container-light dark:bg-surface-container-dark"}>
                <Image layout={"fill"} src={ImageBaseURL + images[selectedImage].url}
                       alt={""}/>
                <Button onClick={()=>setIsFullScreenDialogOpen(true)} icon={"fullscreen"} variant={"tonal"} className={"absolute z-10 right-4 bottom-4"}>
                    تمام صفحه
                </Button>
            </div>
            <Dialog className="z-[1001] fixed inset-0 bg-scrim-light/[25%]" open={isFullScreenDialogOpen} onClose={() =>setIsFullScreenDialogOpen(false)}>
                <div
                    className={"flex h-screen  items-center w-full mx-auto  fixed inset-0 bg-surface-container-high-light dark:bg-surface-container-high-dark"}>
                   <IconButton onClick={()=>setIsFullScreenDialogOpen(false)} groupClassName={"absolute z-10 top-4 left-4"}>
                       close
                   </IconButton>

                    <Swiper
                        className={"md:w-8/12 !hidden md:!flex relative  rounded-[24px] !h-fit bg-surface-container-light dark:bg-surface-container-dark"}
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide className={"h-fit"} onClick={() => setSelectedImage(index)} key={index}
                                         >
                                <Image width={1920} height={1440} layout={"responsive"} src={ImageBaseURL + image.url}
                                       alt={""}/>
                            </SwiperSlide>
                        ))}
                        <button  className={"w-[48px] flex items-center justify-center h-[48px] swiper-next text-primary-light dark:text-primary-dark bg-surface-container-highest-light dark:bg-surface-container-highest-dark rounded-full absolute z-20 left-4 top-1/2 transform -translate-y-1/2 "}>
                            <Icon>
                            chevron_left
                            </Icon>
                        </button>
                        <button className={"w-[48px] h-[48px] flex items-center justify-center swiper-prev text-primary-light dark:text-primary-dark bg-surface-container-highest-light dark:bg-surface-container-highest-dark rounded-full absolute z-20 right-4 top-1/2 transform -translate-y-1/2 "}>
                            <Icon>
                            chevron_right
                            </Icon>
                        </button>
                        {/*<div ref={prevRef}>Prev</div>*/}
                        {/*<div ref={nextRef}>Next</div>*/}

                    </Swiper>
                    <Swiper
                        className={"relative flex md:!hidden w-11/12 rounded-[24px] h-fit bg-surface-container-light dark:bg-surface-container-dark"}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide onClick={() => setSelectedImage(index)} key={index}
                                         className={`h-fit`}>
                                <Image width={1920} height={1440} layout={"responsive"} src={ImageBaseURL + image.url}
                                       alt={""}/>
                            </SwiperSlide>
                        ))}



                    </Swiper>

                </div>
            </Dialog>
            <Swiper
                className={"md:!hidden  rounded-[24px] bg-surface-container-light dark:bg-surface-container-dark"}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {images.map((image, index) => (
                    <SwiperSlide onClick={() => setSelectedImage(index)} key={index}
                                 className={`h-fit`}>
                        <Image width={1920} height={1440} layout={"responsive"} src={ImageBaseURL + image.url} alt={""}/>
                    </SwiperSlide>
                ))}

                <Button onClick={()=>setIsFullScreenDialogOpen(true)} icon={"fullscreen"} variant={"tonal"} className={"absolute z-10 right-4 bottom-4"}>
                    تمام صفحه
                </Button>
            </Swiper>
        </div>
    )
}