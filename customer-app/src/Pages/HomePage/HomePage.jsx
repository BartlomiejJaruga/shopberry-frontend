import styles from "@pages/HomePage/HomePage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <div className={styles.homepage_container}>
                <img src="/logo.png" alt="ShopBerry Logo" />
                <h1>Welcome to ShopBerry Page!</h1>
            </div>
        </>
    );
}
