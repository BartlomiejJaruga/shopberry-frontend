import styles from "./CartPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct/CartProduct";

export default function CartPage() {
    const { items, totalCartPrice } = useSelector((state) => state.cart);

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                {items.length > 0 &&
                    items.map((item) => {
                        return <CartProduct productData={item} />;
                    })}

                {items.length <= 0 && <div>No items in cart!</div>}
            </div>
        </>
    );
}
