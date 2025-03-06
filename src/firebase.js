import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyBc2n7s8OnGN9eSxbNPuFtnq0Zre8yX7ec",
	authDomain: "psychologists-services-bcea3.firebaseapp.com",
	databaseURL:
		"https://psychologists-services-bcea3-default-rtdb.firebaseio.com",
	projectId: "psychologists-services-bcea3",
	storageBucket: "psychologists-services-bcea3.firebasestorage.app",
	messagingSenderId: "624506661953",
	appId: "1:624506661953:web:88069570d82efe9f0e2ac0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const specialistsRef = ref(database, "specialists");

export { database, specialistsRef };
