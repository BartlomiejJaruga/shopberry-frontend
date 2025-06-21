import styles from "@pages/HomePage/HomePage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useDispatch } from "react-redux";
import {
    updateMainCategories,
    updateCategories,
} from "@slices/categoriesSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);

    const getAllCategoriesFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        try {
            const response = await axiosInstance.get("/v1/categories");

            const { mainCategories, categories } = response.data.reduce(
                (acc, category) => {
                    if (category.parent_category === null) {
                        acc.mainCategories.push(category);
                    } else {
                        acc.categories.push(category);
                    }
                    return acc;
                },
                { mainCategories: [], categories: [] }
            );

            dispatch(updateMainCategories({ mainCategories: mainCategories }));
            dispatch(updateCategories({ categories: categories }));
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
