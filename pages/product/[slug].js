import Image from 'next/image'
import Button from "@m3/buttons/Button";

import ProductSlider from "@website/ProductSlider";
import {API} from "@/config";
import Layout from "@/Layout/layout";
import Icon from "@m3/assets/icons/Icon";

export async function getServerSideProps(context) {
    // const getProducts = await fetch(`${API}/products`)
    // const getProductCategories = await fetch(`${API}/product-category`)
    const getProduct = await fetch(`${API}/products/${context.params.slug}`)
    const product = await getProduct.json()

    return {
        props: {
            product,

        },
    }
}

export default function ProductPage({product}) {
    return (
        <Layout>
            <div className={" bg-surface-light dark:bg-surface-dark px-2 md:px-6 py-6 "}>
                <div className={"container mx-auto"}>
                    <div className={"grid grid-cols-12 gap-6"}>
                        <div className={"md:col-span-8 col-span-12"}>
                            {product?.thumbnail ? <ProductSlider product={product}/> : <div
                                className={"relative h-[300px] md:h-[600px] bg-surface-container-high-light dark:bg-surface-container-high-dark rounded-[24px]"}>
                                <Icon fill={1} className={"text-on-surface-variant-light dark:text-on-surface-variant-dark text-[56px] absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2"}>
                                    image
                                </Icon>
                            </div>}
                        </div>
                        <div className={"md:col-span-4 col-span-12"}>
                            <h1 className={"text-headline-large text-on-surface-light dark:text-on-surface-dark mb-2 font-black"}>
                                {product.title}
                            </h1>
                            <div
                                className={"rounded-[24px] bg-surface-container-light dark:bg-surface-container-dark px-4 py-6"}>
                                <h5 className={" text-on-surface-light dark:text-on-surface-dark font-medium text-headline-small"}>
                                    {product.price}
                                    <span className={"mr-1"}>
                                    تومان
                                </span>
                                </h5>
                                <h6 className={"mt-2 mb-3  flex items-center text-on-surface-light dark:text-on-surface-dark font-medium text-title-small"}>
                                    دسته بندی :
                                    <div
                                        className={"px-4 mr-1  h-[32px] text-label-large rounded-full w-fit flex items-center text-on-tertiary-container-light dark:text-on-tertiary-container-dark bg-tertiary-container-light dark:bg-tertiary-container-dark"}>
                                        {product.category.title}
                                    </div>
                                </h6>
                                <p className={"text-body-large text-on-surface-variant-light dark:text-on-surface-variant-dark"}>
                                    لطفا جهت دریافت مشاوره و خرید با ما تماس بگیرید.
                                </p>
                                <Button icon={"call"} variant={"filled"} className={"mt-2 w-full"}>
                                    تماس با ما
                                </Button>
                            </div>
                            <div className={"mt-6"}>
                                <h2 className={"text-title-medium text-on-surface-light dark:text-on-surface-dark font-black "}>
                                    مشخصات محصول
                                </h2>
                                <p className={"mb-3 text-body-large text-on-surface-variant-light dark:text-on-surface-variant-dark font-normal"}>
                                    مشخصات دقیق محصول در زیر آمده درصورت داشتن سوال جهت خرید و کسب اصلاعات بیشتر با ما
                                    تماس
                                    بگیرید
                                </p>
                                <div className={" overflow-hidden rounded-[24px] border border-outline-light"}>

                                    <table className={"w-full "}>
                                        <thead>
                                        <tr className={"text-right *:text-title-small *:font-bold *:text-on-surface-light *:dark:text-on-surface-dark border-b border-outline-variant-light dark:border-outline-variant-dark *:bg-secondary-container-light *:dark:bg-secondary-container-dark *:w-6/12 *:px-6 *:py-4"}>
                                            <th className={"border-l border-outline-variant-light dark:border-outline-variant-dark"}>مشخصه</th>
                                            <th>مقدار</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {product.spec.map((spec, index) =>
                                            <tr
                                                className={`${(true) && "border-b border-outline-variant-light dark:border-outline-variant-dark"} *:text-body-large *:w-6/12 *:px-6 *:py-4`}
                                                key={spec.id}>
                                                <td className={"text-on-surface-light dark:text-on-surface-dark border-l border-outline-variant-light dark:border-outline-variant-dark"}>
                                                    {spec.key.title}
                                                </td>
                                                <td
                                                    className={"font-medium  text-on-surface-light dark:text-on-surface-dark "}>
                                                    {spec.key.values.find(item => item._id === spec.value)?.title}
                                                </td>
                                            </tr>
                                        )}
                                        {product.customSpec.map((spec, index) =>
                                            <tr
                                                className={`${index !== product.customSpec.length - 1 && "border-b border-outline-variant-light dark:border-outline-variant-dark"} *:text-body-large *:w-6/12 *:px-6 *:py-4`}
                                                key={spec.id}>
                                                <td className={"text-on-surface-light dark:text-on-surface-dark border-l border-outline-variant-light dark:border-outline-variant-dark"}>
                                                    {spec.key}
                                                </td>
                                                <td
                                                    className={"font-medium  text-on-surface-light dark:text-on-surface-dark "}>
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </Layout>
    )
}