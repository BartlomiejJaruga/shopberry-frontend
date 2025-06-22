import styles from "./CategoriesDropdownMenu.module.scss";

import { useState, useRef } from "react";
import ArrowRight from "@icons/arrow-right.svg?react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CategoriesDropdownMenu({ isDropDownOpened }) {
    const navigate = useNavigate();
    const categoriesTree = useSelector(
        (state) => state.categories.categoriesTree
    );
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] =
        useState(isDropDownOpened);
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

    const handleCategoryClick = (categoryId, categoryName) => {
        setHoveredCategory(null);
        navigate(`/category?id=${categoryId}&name=${categoryName}`);
    };

    const getSubcategories = (tree, categoryId) => {
        let result = null;

        const dfs = (nodes) => {
            for (const node of nodes) {
                if (node.category_id === categoryId) {
                    result = node.children || [];
                    return;
                }
                if (node.children && node.children.length > 0) {
                    dfs(node.children);
                    if (result) return;
                }
            }
        };

        dfs(tree);
        return result || [];
    };

    const renderSubcategories = (subcategories, level = 1) => {
        return subcategories.map((subcat) => (
            <div
                key={subcat.category_id}
                className={`${styles["subcategory-item"]} ${
                    styles[`level-${level}`]
                }`}
            >
                <div
                    className={styles["subcategory-name"]}
                    onClick={() =>
                        handleCategoryClick(
                            subcat.category_id,
                            subcat.category_name
                        )
                    }
                >
                    {subcat.category_name}
                </div>
                {subcat.children?.length > 0 && (
                    <div>{renderSubcategories(subcat.children, level + 1)}</div>
                )}
            </div>
        ));
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
                            {categoriesTree.map((category) => (
                                <li
                                    key={category.category_id}
                                    className={styles.category_item}
                                    onClick={() =>
                                        handleCategoryClick(
                                            category.category_id,
                                            category.category_name
                                        )
                                    }
                                    onMouseEnter={() =>
                                        setHoveredCategory(category.category_id)
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
                            {renderSubcategories(
                                getSubcategories(
                                    categoriesTree,
                                    hoveredCategory
                                )
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
