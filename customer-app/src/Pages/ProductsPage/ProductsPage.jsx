import NavBar from "@components/NavBar/NavBar";
import Product from "@components/Product/Product";
import styles from "@pages/ProductsPage/ProductsPage.module.scss";

export default function Products() {
    const products = [
        {
            id: 1,
            producer: "LG",
            name: 'TV 65QNED85T3C QNED 64" 4K Ultra HD WebOS 24',
            price: 2899,
        },
        {
            id: 2,
            producer: "Samsung",
            name: "Smartwatch Galaxy Watch 4 Aluminum 44mm",
            price: 1199,
        },
    ];

    return (
        <>
            <NavBar />
            <div className={styles.product_page_container}>
                <h1>Products Page</h1>
                {products.map((product) => (
                    <Product key={product.id} productData={product} />
                ))}
            </div>
        </>
    );
}
