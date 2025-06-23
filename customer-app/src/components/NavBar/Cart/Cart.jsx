import styles from "./Cart.module.scss";

import { useSelector } from "react-redux";
import CartIcon from "@icons/cart.svg?react";

export default function Cart() {
    const itemsInCartLength = useSelector((state) => state.cart.items.length);
    const totalCartPrice = useSelector((state) => state.cart.totalCartPrice);

    return (
        <div className={styles.cart_container}>
            <div className={styles.cart_icon_container}>
                <CartIcon className={styles.cart_icon} />
                {itemsInCartLength > 0 && (
                    <div className={styles.cart_items_counter}>
                        {itemsInCartLength}
                    </div>
                )}
            </div>
            <div className={styles.cart_price}>
                {totalCartPrice.toFixed(2)} zł
            </div>
        </div>
    );
}
