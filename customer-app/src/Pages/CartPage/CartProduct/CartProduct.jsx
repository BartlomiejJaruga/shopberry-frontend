import styles from "./CartProduct.module.scss";

export default function CartProduct({ productData }) {
    return (
        <div className={styles.main_container}>
            <div className={styles.image_container}>
                {productData.productImage ? (
                    <img
                        src={`data:image/jpeg;base64,${productData.productImage}`}
                        alt={productData.productName}
                        className={styles.product_image}
                    />
                ) : (
                    <span>No image</span>
                )}
            </div>
            <div className={styles.description}>
                <span>{productData.producerName}</span>
                <span>{productData.productName}</span>
                <span>Count: {productData.productCount}</span>
                {/* <div className={styles.quantity_controls_container}>
                    <div>-1</div>
                    <input></input>
                    <div>+1</div>
                </div> */}
                <span>Price: {productData.productPrice} zł</span>
            </div>
        </div>
    );
}
