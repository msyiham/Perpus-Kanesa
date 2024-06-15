// utils/logout.js
import { signOut } from "firebase/auth";
import {FIREBASE_AUTH} from "../../firebaseConfig";

const logout = async () => {
    const auth = FIREBASE_AUTH;
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out: ", error);
        alert("Error logging out: " + error.message);
    }
};

export default logout;
