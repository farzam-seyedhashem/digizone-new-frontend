import ProductCardHorizontal from "@website/ProductCardHorizontal";
import Checkbox from "@m3/checkboxes/Checkbox";
import Button from "@m3/buttons/Button";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@m3/icon_buttons/IconButton";
import FAB from "@m3/floating_action_buttons/FAB";
import {API, ImageBaseURL} from "@/config";
import Layout from "@/Layout/layout";
import {useSearchParams} from "next/navigation";
import Icon from "@m3/assets/icons/Icon";
import {useState} from "react";

// const getLastProduct = cache(async (searchParams) => {
//     // const c = new URLSearchParams(searchParams)
//     if (searchParams) {
//         return JSON.parse(await getAllProducts({searchParams}))
//     }
//     return JSON.parse(await getAllProducts())
//
// })
// const getCategories = cache(async () => {
//     return JSON.parse(await getAllProductCategories({topCategory: null, pageNumber: 1, per_page: 12}))
// })
// const getSpecs = cache(async () => {
//     return JSON.parse(await getAllSpecs({topCategory: null, pageNumber: 1, per_page: 12}))
// })
export async function getServerSideProps(context) {

    const getProductCategories = await fetch(`${API}/product-category`)
    const getProductCategory = await fetch(`${API}/product-category/${context.params.slug}`)

    const productCategories = await getProductCategories.json()
    const productCategory = await getProductCategory.json()
    const getSpecs = await fetch(`${API}/product-specs?cat=${productCategory._id}`)
    const productSpecs = await getSpecs.json()


    return {
        props: {
            productCategories,
            productCategory,
            productSpecs
        },
    }
}

export default function ProductPage({
                                        productCategory,
                                        productCategories,
                                        productSpecs
                                    }) {
    // const lp = await getLastProduct(searchParams)
    // const [products] = await Promise.all([lp])
    //
    const [isOpenFilterDialog, setIsOpenFilterDialog] = useState(false);
    const searchParams = useSearchParams()
    // const categories = await getCategories()
    // const specs = await getSpecs()
    return (
        <Layout>
            <div className={" bg-surface-light dark:bg-surface-dark"}>
                {/*<FAB className={"fixed bottom-[calc(64px_+_24px)] right-6 z-999 md:hidden "} isExtended={true}*/}
                {/*     label={"فیلتر"}>*/}
                {/*    filter*/}
                {/*</FAB>*/}
                <div
                    className={"hidden md:flex items-center relative  md:py-3 py-2 md:px-6 md:border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                    <div className={"w-full items-center justify-center md:flex"}>
                        <Link href={"/products/"}
                              className={`md:text-title-small text-label-large font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                            همه محصولات
                        </Link>
                        {productCategories.data.filter(cat => !cat.topCategory).map(category => <Link
                            href={"/products/" + category.slug}
                            key={category._id}
                            className={productCategory._id === category._id ? 'md:h-[48px] h-[38px] text-label-large md:text-title-small font-bold px-6 items-center ml-2 inline-flex rounded-[8px]  md:rounded-full bg-secondary-container-light dark:bg-secondary-container-dark text-on-secondary-container-light dark:text-on-secondary-container-dark' : `md:text-title-small text-label-large font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                            {category.title}
                        </Link>)}
                    </div>
                </div>
                <div
                    className={"md:hidden border-b border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark"}>
                    <div
                        className={"flex text-on-surface-light font-medium dark:text-on-surface-dark  items-center border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                        <Link href={"/products/"}
                              className={`md:text-title-small text-label-large font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark items-center ml-2 rounded-[8px] inline-flex`}>
                            <IconButton>
                                chevron_right
                            </IconButton>
                        </Link>
                        همه دسته بندی ها
                    </div>
                    <div className={"w-full py-2 px-4 items-center justify-center md:flex"}>
                        {productCategories.data.filter(cat => !cat.topCategory).map(category => <Link
                            href={"/products/" + category.slug}
                            key={category._id}
                            className={productCategory._id === category._id ? 'md:h-[48px] h-[38px] text-label-large md:text-title-small font-bold px-6 items-center ml-2 inline-flex rounded-[8px]  md:rounded-full bg-secondary-container-light dark:bg-secondary-container-dark text-on-secondary-container-light dark:text-on-secondary-container-dark' : `md:text-title-small text-label-large font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                            {category.title}
                        </Link>)}
                    </div>
                </div>


                <div className={"py-6 md:px-6"}>

                    <div className={""}>
                        {productCategory.subCategory.map((subCategory, index) => (
                            <div className={"w-full "} key={index}>
                                <div
                                    className={"bg-surface-container-highest-light dark:bg-surface-container-highest-dark  h-fit relative rounded-[24px] overflow-hidden"}>
                                    <Image className={"z-40 mix-blend-color bg-black"} layout={"fill"}
                                           objectFit={"cover"} alt={""}
                                           src={ImageBaseURL + subCategory.thumbnail.url}/>
                                    <div
                                        className={"z-999 w-full h-fit relative md:py-10 py-6  md:px-10"}>

                                        <h2 className={"md:px-0 px-6 text-right md:text-center text-on-surface-light dark:text-on-surface-dark text-headline-medium font-black"}>
                                            {subCategory.title}
                                        </h2>
                                        <div className={"md:grid md:grid-cols-12 px-4 w-full  md:whitespace-normal whitespace-nowrap md:overflow-auto overflow-scroll mt-6 mb-4  md:gap-6"}>
                                            {subCategory.products.map(product =>
                                                <div key={product._id} className={"w-[260px] md:ml-0 ml-4 inline-flex  md:w-full md:col-span-2"}>
                                                    <ProductCardHorizontal product={product}/>
                                                </div>
                                            )}
                                        </div>
                                        <div className={"flex justify-center"}>
                                            <Link href={`/products/${productCategory.slug}/${subCategory.slug}`}>
                                                <Button variant={"outlined"}
                                                        className={"bg-surface-light *:!pl-4 dark:bg-surface-dark text-on-surface-light dark:text-on-surface-dark"}>
                                                    مشاهده همه
                                                    <Icon className={"mr-2"}>
                                                        chevron_left
                                                    </Icon>
                                                </Button>
                                            </Link>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    )
}