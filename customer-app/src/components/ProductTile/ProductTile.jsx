import styles from "./ProductTile.module.scss";

import { useDispatch } from "react-redux";
import { addToCart } from "@slices/cartSlice";
import Star from "@icons/star.svg?react";
import Heart from "@icons/heart.svg?react";

export default function ProductTile({ productData }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        //dispatch(addToCart(productData));
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.image_container}>Image Placeholder</div>
            <div className={styles.description_container}>
                <div className={styles.producer_and_rating}>
                    <span>
                        {productData.producer
                            ? productData.producer.producer_name
                            : "Unknown Producer"}
                    </span>
                    <div>
                        <span>
                            {productData.rating_value
                                ? productData.rating_value
                                : "0"}
                        </span>
                        <span>
                            {`(${
                                productData.rating_count
                                    ? productData.rating_count
                                    : "0"
                            })`}
                        </span>
                        <Star className={styles.star_icon} />
                    </div>
                </div>
                <div className={styles.product_name}>
                    {productData.product_name}
                </div>
                <div className={styles.top_attributes_container}>
                    <ul>
                        <li>Attr 1: value</li>
                        <li>Attr 2: some value</li>
                        <li>Attr 3: some other value</li>
                        <li>Attr 4: even some other value</li>
                    </ul>
                </div>
            </div>
            <div className={styles.price_and_buttons_container}>
                <div className={styles.favourite_button_container}>
                    <Heart className={styles.heart_icon} />
                </div>
                <div className={styles.price}>
                    {productData.product_price.toFixed(2)} zł
                </div>
                <button
                    className={styles.add_to_cart_button}
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </button>
            </div>
        </div>
    );
}
