import styles from "./ProductTile.module.scss";

import { useDispatch } from "react-redux";
import { addToCart } from "@slices/cartSlice";
import Star from "@icons/star.svg?react";
import Heart from "@icons/heart.svg?react";

export default function ProductTile({ productData, attributesData }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const productObject = {
            productId: productData.product_id,
            productName: productData.product_name,
            producerName: productData.producer.producer_name,
            productPrice: productData.product_price,
            productImage: productData.image,
            productCount: 1,
        };

        dispatch(addToCart(productObject));
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.image_container}>
                {productData.image ? (
                    <img
                        src={`data:image/jpeg;base64,${productData.image}`}
                        alt={productData.product_name}
                        className={styles.product_image}
                    />
                ) : (
                    <span>No image</span>
                )}
            </div>
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
                                ? productData.rating_value.toFixed(2)
                                : "0.00"}
                        </span>
                        <span>
                            {`(${
                                productData.ratings_count
                                    ? productData.ratings_count.toFixed(0)
                                    : "0"
                            })`}
                        </span>
                        <Star className={styles.star_icon} />
                    </div>
                </div>
                <div className={styles.product_name}>
                    {productData.product_name} (ID = {productData.product_id})
                </div>
                <div className={styles.top_attributes_container}>
                    <ul>
                        {attributesData.slice(0, 4).map((attr, index) => (
                            <li key={index}>
                                {`${attr.attribute?.attribute_name ?? "?"}: ${
                                    attr.value ?? "?"
                                }`}
                            </li>
                        ))}
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
