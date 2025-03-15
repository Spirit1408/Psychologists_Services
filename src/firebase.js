import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const specialistsRef = ref(database, "specialists");

export { database, specialistsRef, auth };
