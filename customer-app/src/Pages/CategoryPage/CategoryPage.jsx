import styles from "./CategoryPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import CategoriesDropdownMenu from "@components/CategoriesDropdownMenu/CategoriesDropdownMenu";
import { useSearchParams } from "react-router-dom";

export default function CategoryPage() {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("id");
    const categoryName = searchParams.get("name");
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);
    const [loadedProducts, setLoadedProducts] = useState([]);

    const getAllCategoryProductsFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        try {
            const response = await axiosInstance.get(
                `/v1/categories/${categoryId}/products`
            );

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
                                    CATEGORY: {categoryName} (ID ={categoryId})
                                </span>
                                <span>
                                    ({loadedProducts.length} items found)
                                </span>
                            </div>
                            <div className={styles.product_list}>
                                {loadedProducts.map((item) => {
                                    const p = item.product;
                                    return (
                                        <div
                                            key={p.product_id}
                                            className={styles.product_card}
                                        >
                                            <h3>{p.product_name}</h3>
                                            <p>
                                                Producer:
                                                {p.producer
                                                    ? p.producer.producer_name
                                                    : "Unknown"}
                                            </p>
                                            <p>
                                                Price: $
                                                {p.product_price.toFixed(2)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
