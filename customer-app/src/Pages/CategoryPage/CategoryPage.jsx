import styles from "./CategoryPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import CategoriesDropdownMenu from "@components/CategoriesDropdownMenu/CategoriesDropdownMenu";
import { useSearchParams } from "react-router-dom";
import ProductsList from "./ProductsList/ProductsList";

export default function CategoryPage() {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("id");
    const categoryName = searchParams.get("name");
    const searchTerm = searchParams.get("search");
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);
    const [loadedProducts, setLoadedProducts] = useState([]);

    const createRequestURL = (categoryId, searchTerm) => {
        let requestURL = "/v1/products";
        let alreadyConcatted = false;

        if (searchTerm) {
            requestURL = requestURL.concat(`?productName=${searchTerm}`);
            alreadyConcatted = true;
        }

        if (categoryId && alreadyConcatted && categoryId !== "-1") {
            requestURL = requestURL.concat(`&categoryId=${categoryId}`);
            alreadyConcatted = true;
        } else if (categoryId && categoryId !== "-1") {
            requestURL = requestURL.concat(`?categoryId=${categoryId}`);
        }

        return requestURL;
    };

    const getAllCategoryProductsFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        try {
            const requestURL = createRequestURL(categoryId, searchTerm);
            const response = await axiosInstance.get(requestURL);

            setLoadedProducts(response.data);
            sessionStorage.setItem(
                "cached_category_products",
                JSON.stringify(response.data)
            );
        } catch (error) {
            console.error(error);
        }

        setIsPageGettingLoaded(false);
    };

    useEffect(() => {
        const cachedProducts = sessionStorage.getItem(
            "cached_category_products"
        );
        if (cachedProducts) {
            setLoadedProducts(JSON.parse(cachedProducts));
            setIsPageGettingLoaded(false);
        } else {
            getAllCategoryProductsFromDatabase();
        }
    }, [categoryId]);

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <aside>
                    <CategoriesDropdownMenu isDropDownOpened={false} />
                </aside>
                <main>
                    {isPageGettingLoaded && (
                        <>
                            <LoadingIndicator
                                message="Page is being loaded..."
                                fontSize="2rem"
                            />
                        </>
                    )}

                    {!isPageGettingLoaded && (
                        <>
                            <div className={styles.category_name_container}>
                                <span>
                                    CATEGORY: {categoryName} (ID = {categoryId})
                                </span>
                                <span>
                                    ({loadedProducts.length} items found)
                                </span>
                            </div>
                            <ProductsList ProductsDataList={loadedProducts} />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
