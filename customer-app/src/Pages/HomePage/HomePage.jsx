import styles from "@pages/HomePage/HomePage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useDispatch } from "react-redux";
import {
    updateMainCategories,
    updateCategoriesTree,
} from "@slices/categoriesSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);

    const getAllCategoriesFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        try {
            const response = await axiosInstance.get("/v1/categories/tree");

            const mainCategories = response.data.map(
                ({ category_id, category_name }) => ({
                    category_id,
                    category_name,
                })
            );

            dispatch(updateMainCategories({ mainCategories: mainCategories }));
            dispatch(updateCategoriesTree({ categoriesTree: response.data }));
        } catch (error) {
            console.error(error);
        }

        setIsPageGettingLoaded(false);
    };

    useEffect(() => {
        getAllCategoriesFromDatabase();
    }, []);

    return (
        <>
            {isPageGettingLoaded && (
                <>
                    <LoadingIndicator
                        message="Page is being loaded..."
                        fontSize="3rem"
                    />
                </>
            )}

            {!isPageGettingLoaded && (
                <>
                    <NavBar />
                    <div className={styles.homepage_container}>
                        <img src="/logo.png" alt="ShopBerry Logo" />
                        <h1>Welcome to ShopBerry Page!</h1>
                    </div>
                </>
            )}
        </>
    );
}
