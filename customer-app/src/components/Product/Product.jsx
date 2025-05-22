import { useDispatch } from "react-redux"
import { addToCart } from "@slices/cartSlice"
import styles from "./Product.module.scss"

export default function Product({ productData }){
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(productData));
    }

    return (
        <div className={styles.product_container}>
            <div className={styles.image}>Image</div>
            <div className={styles.description}>
                <div>{productData.producer}</div>
                <div>{productData.name}</div>
                <div>Parama 1: value</div>
                <div>Parama 2: some value</div>
                <div>Parama 3: some other value</div>
                <div>Parama 4: even some other value</div>
            </div>
            <div className={styles.price_container}>
                <div className={styles.price}>{productData.price} zł</div>
                <button className={styles.add_to_cart_button} onClick={handleAddToCart}>ADD TO CART</button>
            </div>
        </div>
    )
}