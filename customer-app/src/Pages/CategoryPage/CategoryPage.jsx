import styles from "./CategoryPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useDispatch } from "react-redux";
import CategoriesDropdownMenu from "@components/CategoriesDropdownMenu/CategoriesDropdownMenu";
import { useSearchParams } from "react-router-dom";

export default function CategoryPage() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);

    const getAllCategoriesFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        // try {
        //     const response = await axiosInstance.get("/v1/categories/tree");

        //     const mainCategories = response.data.map(
        //         ({ category_id, category_name }) => ({
        //             category_id,
        //             category_name,
        //         })
        //     );

        //     dispatch(updateMainCategories({ mainCategories: mainCategories }));
        //     dispatch(updateCategoriesTree({ categoriesTree: response.data }));
        // } catch (error) {
        //     console.error(error);
        // }

        setIsPageGettingLoaded(false);
    };

    useEffect(() => {
        getAllCategoriesFromDatabase();
    }, []);

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
                        <div className={styles.category_name_container}>
                            <span>
                                CATEGORY: {searchParams.get("name")} (ID =
                                {searchParams.get("id")})
                            </span>
                            <span>(xxx items found)</span>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
