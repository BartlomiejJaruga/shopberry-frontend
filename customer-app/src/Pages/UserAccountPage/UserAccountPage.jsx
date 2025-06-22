import styles from "./UserAccountPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { userAccountSectionNamesENUM } from "@enums";

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
                                onClick={() => {
                                    navigate(
                                        `/account?section=${userAccountSectionNamesENUM.YOUR_ACCOUNT}`
                                    );
                                }}
                            >
                                Your Account
                            </li>
                            <li
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
                        <div>Your Account</div>
                    )}

                    {searchParams.get("section") ===
                        userAccountSectionNamesENUM.ORDERS && <div>Orders</div>}
                </main>
            </div>
        </>
    );
}
