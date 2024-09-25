import ProductCardHorizontal from "@website/ProductCardHorizontal";
import Checkbox from "@m3/checkboxes/Checkbox";
import Button from "@m3/buttons/Button";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@m3/icon_buttons/IconButton";
import FAB from "@m3/floating_action_buttons/FAB";
import {API} from "@/config";
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

    const slug = context.params.slug
    console.log(slug)
    let getProductCategories;
    let getProductCategory;
    getProductCategories = await fetch(`${API}/product-category`)
    getProductCategory = await fetch(`${API}/product-category/${context.params.slug}`)
    const getProductSubCategory = await fetch(`${API}/product-category/${context.params.subSlug}`)

    // const getProductCategories =  ?  :await fetch(`${API}/product-category`)
    // const getProductCategory = Array.isArray(context.params.slug) ? await fetch(`${API}/product-category/${context.params.slug[1]}`) :

    const productCategories = await getProductCategories.json()
    const productCategory = await getProductCategory.json()
    const productSubCategory = await getProductSubCategory.json()
    console.log(productCategory)
    const getSpecs = await fetch(`${API}/product-specs?cat=${productSubCategory._id}`)
    const productSpecs = await getSpecs.json()
    const getProducts = await fetch(`${API}/products?category=${productSubCategory._id}`)
    const products = await getProducts.json()

    return {
        props: {
            productSubCategory,
            products,
            productCategories,
            productCategory,
            productSpecs
        },
    }
}

export default function ProductPage({
                                        productSubCategory,
                                        products,
                                        productCategories,
                                        productCategory,
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
                <FAB className={"fixed bottom-[calc(64px_+_24px)] right-6 z-999 md:hidden "} isExtended={true}
                     label={"فیلتر"}>
                    filter
                </FAB>
                <div
                    className={"md:flex items-center relative hidden py-3 px-6 border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                    <div className={"w-full items-center justify-center flex"}>
                        <Link href={"/products/"}
                              className={`text-title-small font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                            همه محصولات
                        </Link>
                        {productCategories.data.filter(cat => !cat.topCategory).map(category => <Link
                            href={"/products/" + category.slug}
                            key={category._id}
                            className={productCategory._id === category._id ? 'h-[48px] text-title-small font-bold px-6 items-center ml-2 inline-flex   rounded-full bg-secondary-container-light dark:bg-secondary-container-high-light dark:bg-secondary-container-high-dark text-on-secondary-container-light dark:text-on-secondary-container-dark' : `text-title-small font-medium h-[48px] text-on-surface-light dark:text-on-surface-dark px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                            {category.title}
                        </Link>)}
                    </div>
                </div>
                <div
                    className={"md:hidden bg-surface-light dark:bg-surface-dark border-b border-outline-light dark:border-outline-dark"}>
                    <div className={"flex items-center w-full h-[56px] border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                        <Link className={"ml-2"} href={"/products"}>
                            <IconButton icon={"chevron_right"}>
                                chevron_right
                            </IconButton>
                        </Link>
                        {"بازگشت به همه دسته بندی ها"}
                    </div>
                    <div className={"flex-1 py-2 px-4"}>
                        {productCategory.subCategory.map(category =>
                            <Link href={"/products/" + category.slug}
                                  key={category._id}
                                  className={`${category._id === productSubCategory._id ? "bg-secondary-container-light dark:bg-secondary-container-dark text-on-secondary-container-light dark:text-on-secondary-container-dark" : "text-on-surface-light dark:text-on-surface-dark"} text-title-small font-medium h-[38px]  px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                                {category.title}
                            </Link>)}
                    </div>
                    <Button className={"md:block hidden"} onClick={() => setIsOpenFilterDialog(true)} variant={"tonal"}
                            icon="filter_alt">
                        فیلتر
                    </Button>
                    {/*<div className={"absolute left-6 top-1/2 transform -translate-y-1/2"}>*/}
                    {/*    <Button variant={"outlined"} icon={"filter_alt"}>*/}
                    {/*        فیلتر محصولات*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
                <div
                    className={"md:flex items-center relative hidden py-3 px-6 border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                    {/*<Link href={"/products/" + productCategory.slug}>*/}
                    {/*    <Button icon={"chevron_right"}>*/}
                    {/*        {"بازگشت به دسته" + " " + productCategory.title}*/}
                    {/*    </Button>*/}
                    {/*</Link>*/}
                    <div className={"flex-1"}>
                        {productCategory.subCategory.map(category =>
                            <Link href={"/products/" + category.slug}
                                  key={category._id}
                                  className={`${category._id === productSubCategory._id ? "bg-secondary-container-light dark:bg-secondary-container-dark text-on-secondary-container-light dark:text-on-secondary-container-dark" : "text-on-surface-light dark:text-on-surface-dark"} text-title-small font-medium h-[38px]  px-6 items-center ml-2 rounded-[8px] inline-flex`}>
                                {category.title}
                            </Link>)}
                    </div>
                    <Button className={"md:block hidden"} onClick={() => setIsOpenFilterDialog(true)} variant={"tonal"}
                            icon="filter_alt">
                        فیلتر
                    </Button>
                    {/*<div className={"absolute left-6 top-1/2 transform -translate-y-1/2"}>*/}
                    {/*    <Button variant={"outlined"} icon={"filter_alt"}>*/}
                    {/*        فیلتر محصولات*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
                {isOpenFilterDialog && <div className={"fixed bg-scrim-dark/[40%] z-[999] inset-0 "}></div>}
                {isOpenFilterDialog && <div
                    className={"w-[560px] z-999 rounded-[28px] overflow-hidden bg-surface-container-high-light dark:bg-surface-container-high-dark fixed top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 "}>
                    <div className={'py-6'}>
                        <h3 className={"font-bold text-on-surface-light dark:text-on-surface-dark text-title-large text-center"}>فیلتر
                            کردن محصول
                        </h3>
                    </div>
                    <div className={"h-[400px] overflow-y-scroll"}>
                        <div
                            className={"bg-surface-container-high-light dark:bg-surface-container-high-dark w-full py-4 rounded-[24px]"}>
                            {productSpecs.data.map(spec => <div className={"mb-2 px-2"} key={spec._id}>
                                <h3 className={"px-4 mb-2 text-title-small text-on-surface-light dark:text-on-surface-dark  font-bold"}>
                                    {spec.title}
                                </h3>
                                {spec.values.map((value, index) =>
                                    spec.values.length - 1 > index && <Checkbox
                                        isCheck={Array.isArray(searchParams[spec._id]) ? searchParams[spec._id].findIndex(item => item === value._id) !== -1 : searchParams[spec._id] === value._id}
                                        value={value._id} name={spec._id} color={"primary"} label={value.title}
                                        key={value._id}/>
                                )}
                            </div>)}
                        </div>
                    </div>
                    <div className={"py-6 px-6 flex justify-end"}>
                        <Button onClick={() => setIsOpenFilterDialog(false)}>
                            انصراف
                        </Button>
                        <Button variant={"filled"}>
                            فیلتر
                        </Button>
                    </div>

                </div>}


                {/*<form action="/products" method="GET"*/}
                {/*      className={"rounded-[16px] bg-surface-container-high-light dark:bg-surface-container-high-dark  pt-6 pb-6"}>*/}

                {/*    <h3 className={"px-4 mb-6 text-title-large font-black"}>*/}
                {/*        فیلتر*/}
                {/*    </h3>*/}
                {/*    {specs.map(spec => <div className={"mb-2"} key={spec._id}>*/}
                {/*        <h3 className={"px-4 mb-2 text-title-small text-on-surface-light dark:text-on-surface-dark  font-bold"}>*/}
                {/*            {spec.title}*/}
                {/*        </h3>*/}
                {/*        {spec.values.map(value =>*/}
                {/*            <Checkbox*/}
                {/*                isCheck={Array.isArray(searchParams[spec._id]) ? searchParams[spec._id].findIndex(item => item === value._id) !== -1 : searchParams[spec._id] === value._id}*/}
                {/*                value={value._id} name={spec._id} color={"primary"} label={value.title}*/}
                {/*                key={value._id}/>*/}
                {/*        )}*/}
                {/*    </div>)}*/}
                {/*    <div className={"space-x-2 space-x-reverse flex items-center justify-end px-4 "}>*/}
                {/*        <Button variant={"outlined"}>*/}
                {/*            پاک کردن فیلتر ها*/}
                {/*        </Button>*/}
                {/*        <Button variant={"filled"} icon={"filter_alt"}>*/}
                {/*            اعمال فیلتر*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</form>*/}

                <div className={"py-6 px-6"}>
                    {/*<div*/}
                    {/*    className={"flex rounded-[24px] justify-end relative bg-surface-container-high-light dark:bg-surface-container-high-dark"}>*/}
                    {/*    <h1 className={"z-40 text-on-surface-container-light dark:text-on-surface-container-dark absolute transform top-1/2 -translate-y-1/2 text-center w-full text-page-title font-black mb-4"}>*/}
                    {/*        لیست محصولات*/}
                    {/*    </h1>*/}

                    {/*    <div className={" overflow-hidden h-[480px] w-6/12 relative rounded-[24px]"}>*/}
                    {/*        <div*/}
                    {/*            className={"absolute inset-0 z-20 bg-gradient-to-r  from-transparent to-surface-container-high-light dark:to-surface-container-high-dark"}/>*/}
                    {/*        <Image objectFit={"cover"} layout={"fill"} src={"/product-page.png"} alt={""}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={"grid grid-cols-12 gap-4"}>
                        <div className={"md:col-span-9 col-span-12 grid grid-cols-12 gap-4"}>
                            {products.data.map(product =>
                                <div key={product._id} className={"col-span-12 md:col-span-3"}>
                                    <ProductCardHorizontal product={product}/>
                                </div>
                            )}
                        </div>
                        {/*<div className={"col-span-3"}>*/}
                        {/*    <div*/}
                        {/*        className={"relative py-6 h-[calc(100vh_-_240px)] bg-surface-container-high-light dark:bg-surface-container-high-dark rounded-[24px]"}>*/}
                        {/*        <form action="/products" method="GET">*/}

                        {/*            <h3 className={"px-6 mb-6 text-title-large font-black"}>*/}
                        {/*                فیلتر*/}
                        {/*            </h3>*/}
                        {/*            {productSpecs.data.map(spec => <div className={"mb-2 px-2"} key={spec._id}>*/}
                        {/*                <h3 className={"px-4 mb-2 text-title-small text-on-surface-light dark:text-on-surface-dark  font-bold"}>*/}
                        {/*                    {spec.title}*/}
                        {/*                </h3>*/}
                        {/*                {spec.values.map(value =>*/}
                        {/*                    <Checkbox*/}
                        {/*                        isCheck={Array.isArray(searchParams[spec._id]) ? searchParams[spec._id].findIndex(item => item === value._id) !== -1 : searchParams[spec._id] === value._id}*/}
                        {/*                        value={value._id} name={spec._id} color={"primary"} label={value.title}*/}
                        {/*                        key={value._id}/>*/}
                        {/*                )}*/}
                        {/*            </div>)}*/}
                        {/*            <div className={"absolute py-6 w-full border-t border-outline-variant-light dark:border-outline-variant-dark bottom-0 left-0 space-x-2 space-x-reverse flex items-center justify-end px-6 "}>*/}
                        {/*                <Button variant={"outlined"}>*/}
                        {/*                    پاک کردن فیلتر ها*/}
                        {/*                </Button>*/}
                        {/*                <Button variant={"filled"} icon={"filter_alt"}>*/}
                        {/*                    اعمال فیلتر*/}
                        {/*                </Button>*/}
                        {/*            </div>*/}
                        {/*        </form>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"col-span-3"}>*/}

                        {/*    </div>*/}

                    </div>
                </div>
            </div>
        </Layout>
    )
}