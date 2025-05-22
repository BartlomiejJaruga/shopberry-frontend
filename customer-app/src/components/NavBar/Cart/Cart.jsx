import { useSelector } from "react-redux";
import CartIcon from "@icons/cart.svg?react"

import styles from "./Cart.module.scss";

export default function Cart(){
    const itemsInCartLenght = useSelector((state) => state.cart.items.length);
    const itemsInCartPrice = useSelector((state) => state.cart.items.reduce((acc, item) => acc + item.price, 0));

    return (
        <div className={styles.cart_container}>
            <div className={styles.cart_icon_container}>
                <div><CartIcon/></div>
                {itemsInCartLenght > 0 && <div className={styles.cart_items_counter}>{itemsInCartLenght}</div>}
            </div>
            <div className={styles.cart_price}>{itemsInCartPrice} zł</div>
        </div>
    );
}