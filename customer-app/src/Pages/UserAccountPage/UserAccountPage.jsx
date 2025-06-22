import styles from "./UserAccountPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { userAccountSectionNamesENUM } from "@enums";
import YourAccountSection from "./YourAccountSection/YourAccountSection";

export default function UserAccountPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <aside>
                    <div className={styles.user_account_tabs_container}>
                        <ul>
                            <li
                                className={
                                    searchParams.get("section") ===
                                    userAccountSectionNamesENUM.YOUR_ACCOUNT
                                        ? styles.active_tab
                                        : styles.inactive_tab
                                }
                                onClick={() => {
                                    navigate(
                                        `/account?section=${userAccountSectionNamesENUM.YOUR_ACCOUNT}`
                                    );
                                }}
                            >
                                Your Account
                            </li>
                            <li
                                className={
                                    searchParams.get("section") ===
                                    userAccountSectionNamesENUM.ORDERS
                                        ? styles.active_tab
                                        : styles.inactive_tab
                                }
                                onClick={() => {
                                    navigate(
                                        `/account?section=${userAccountSectionNamesENUM.ORDERS}`
                                    );
                                }}
                            >
                                Orders
                            </li>
                        </ul>
                    </div>
                </aside>
                <main>
                    {searchParams.get("section") ===
                        userAccountSectionNamesENUM.YOUR_ACCOUNT && (
                        <YourAccountSection />
                    )}

                    {searchParams.get("section") ===
                        userAccountSectionNamesENUM.ORDERS && <div>Orders</div>}
                </main>
            </div>
        </>
    );
}
