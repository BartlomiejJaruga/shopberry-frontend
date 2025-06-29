import styles from "./ProductsList.module.scss";

import { useEffect, useState } from "react";
import ProductTile from "@components/ProductTile/ProductTile";

export default function ProductsList({ ProductsDataList }) {
    return (
        <div className={styles.main_container}>
            {ProductsDataList.map((item) => {
                return (
                    <ProductTile
                        key={item.product.product_id}
                        productData={item.product}
                        attributesData={item.attributes}
                    />
                );
            })}
        </div>
    );
}
