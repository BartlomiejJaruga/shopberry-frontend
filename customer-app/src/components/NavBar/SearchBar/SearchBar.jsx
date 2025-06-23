import styles from "./SearchBar.module.scss";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Search from "@icons/search.svg?react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.mainCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const searchButtonRef = useRef(null);

    const searchForItem = () => {
        if (searchButtonRef.current) {
            searchButtonRef.current.blur();
        }

        if (!searchTerm) return;

        sessionStorage.removeItem("cached_category_products");

        if (selectedCategory) {
            const foundCategory = categories.find(
                (cat) => cat.category_id == selectedCategory
            );

            navigate(
                `/category?search=${searchTerm}&id=${selectedCategory}&name=${foundCategory.category_name}`
            );
        } else {
            navigate(
                `/category?search=${searchTerm}&id=${-1}&name=All Categories`
            );
        }
    };

    return (
        <div className={styles.main_container}>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={styles.select_container}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option
                            key={category.category_id}
                            value={category.category_id}
                        >
                            {category.category_name}
                        </option>
                    ))}
                </select>
                <span className={styles.custom_arrow} />
            </div>

            <div
                className={styles.search_icon_container}
                onClick={searchForItem}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        searchForItem();
                    }
                }}
                tabIndex={0}
                ref={searchButtonRef}
            >
                <Search className={styles.search_icon} />
            </div>
        </div>
    );
}
