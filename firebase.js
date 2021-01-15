import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATCwuiO9oZG9mHW8idSZDdFDe8Ls7OyWI",
  authDomain: "vuestagram-706fb.firebaseapp.com",
  projectId: "vuestagram-706fb",
  storageBucket: "vuestagram-706fb.appspot.com",
  messagingSenderId: "1051763570984",
  appId: "1:1051763570984:web:6f7e2fdeb37ddd0563381d",
  measurementId: "G-81BGSCR1FG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export { db, auth, usersCollection, postsCollection, commentsCollection, likesCollection };
