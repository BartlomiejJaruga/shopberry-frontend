import { Link } from 'react-router-dom';
import Cart from '@components/NavBar/Cart/Cart';
import UserSection from '@components/NavBar/UserSection/UserSection';


import styles from './NavBar.module.scss';

export default function NavBar() {
    return (
        <nav className={styles.navbar_container}>
            <Link to="/"><img src="/logo.png" alt="ShopBerry Logo" className={styles.navbar_logo} /></Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            <UserSection/>
            <Cart/>
        </nav>
    )
}