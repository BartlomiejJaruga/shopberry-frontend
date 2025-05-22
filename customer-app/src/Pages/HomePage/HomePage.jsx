import styles from '@pages/HomePage/HomePage.module.scss';

export default function HomePage(){
    return (
        <div className={styles.homepage_container}>
            <img src="/logo.png" alt="ShopBerry Logo"/>
            <h1>Welcome to ShopBerry Page!</h1>
        </div>
    )
}