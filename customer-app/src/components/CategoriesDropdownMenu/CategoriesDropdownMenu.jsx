import styles from "./CategoriesDropdownMenu.module.scss";

import { useState, useRef } from "react";
import ArrowRight from "@icons/arrow-right.svg?react";
import { useSelector } from "react-redux";

export default function CategoriesDropdownMenu() {
    const categoryTree = useSelector(
        (state) => state.categories.categoriesTree
    );
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(true);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const closeSubMenuTimeoutRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropDownMenuOpen((prev) => !prev);
        setHoveredCategory(null);
    };

    const handleCategoryListMouseLeave = () => {
        closeSubMenuTimeoutRef.current = setTimeout(() => {
            setHoveredCategory(null);
        }, 250);
    };

    const handleSubMenuMouseEnter = () => {
        if (closeSubMenuTimeoutRef.current) {
            clearTimeout(closeSubMenuTimeoutRef.current);
            closeSubMenuTimeoutRef.current = null;
        }
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.dropdown_trigger} onClick={toggleDropdown}>
                CATEGORIES
            </div>

            {isDropDownMenuOpen && (
                <>
                    <div className={styles.drop_down_menu}>
                        <ul
                            className={styles.category_list}
                            onMouseLeave={handleCategoryListMouseLeave}
                        >
                            {categoryTree.map((category) => (
                                <li
                                    key={category.category_id}
                                    className={styles.category_item}
                                    onMouseEnter={() =>
                                        setHoveredCategory(
                                            category.category_name
                                        )
                                    }
                                >
                                    {category.category_name}
                                    <ArrowRight
                                        className={styles.arrow_right_icon}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {hoveredCategory && (
                        <div
                            className={styles.sub_menu}
                            onMouseEnter={handleSubMenuMouseEnter}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <h3>{hoveredCategory}</h3>
                            <p>Here goes sub-menu content...</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
