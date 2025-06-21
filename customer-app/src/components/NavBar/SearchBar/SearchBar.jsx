import styles from "./SearchBar.module.scss";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Search from "@icons/search.svg?react";

export default function SearchBar() {
    const categories = useSelector((state) => state.categories.mainCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const searchButtonRef = useRef(null);

    const searchForItem = () => {
        const searchBarData = {
            searchTerm: searchTerm,
            selectedCategory: selectedCategory,
        };

        console.log(searchBarData);

        if (searchButtonRef.current) {
            searchButtonRef.current.blur();
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
