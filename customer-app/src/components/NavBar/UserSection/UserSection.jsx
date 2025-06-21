import styles from "./UserSection.module.scss";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import User from "@icons/user.svg?react";
import SignIn from "@icons/sign-in.svg?react";
import Account from "@icons/account.svg?react";
import { logoutUser } from "@slices/authSlice";
import { tokenNamesENUM } from "@enums";
import Heart from "@icons/heart.svg?react";

export default function UserSection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector((state) => state.auth);

    const handleSignIn = () => {
        navigate("/auth?authType=sign_in");
    };

    const handleSignUp = () => {
        navigate("/auth?authType=sign_up");
    };

    const handleLogOut = () => {
        dispatch(logoutUser());

        localStorage.removeItem(tokenNamesENUM.ACCESS_TOKEN_NAME);
        localStorage.removeItem(tokenNamesENUM.REFRESH_TOKEN_NAME);
    };

    return (
        <>
            {!isAuthenticated && (
                <div className={styles.buttons_container}>
                    <button onClick={handleSignUp}>
                        <User className={styles.user_icon} />
                        Sign Up
                    </button>
                    <button onClick={handleSignIn}>
                        Sign In
                        <SignIn className={styles.sign_in_icon} />
                    </button>
                </div>
            )}

            {isAuthenticated && (
                <>
                    <div className={styles.favourite_products_container}>
                        <Heart className={styles.heart_icon} />
                        <div>
                            <p>Favourite</p>
                            <p>Products</p>
                        </div>
                    </div>
                    <div className={styles.account_wrapper}>
                        <div className={styles.account_container}>
                            <Account className={styles.account_icon} />
                            <div className={styles.user_names_container}>
                                <p>{userData.firstName}</p>
                                <p>{userData.lastName}</p>
                            </div>
                        </div>
                        <div className={styles.dropdown_menu}>
                            <div>Account</div>
                            <div>Orders</div>
                            <div>Favourites</div>
                            <div onClick={handleLogOut}>Log out</div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
