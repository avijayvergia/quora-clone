import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAEsBBiwa5urABeTTjCGBez1GI2PSK1pRY",
  authDomain: "test-firing-vue.firebaseapp.com",
  databaseURL: "https://test-firing-vue.firebaseio.com",
  projectId: "test-firing-vue",
  storageBucket: "test-firing-vue.appspot.com",
  messagingSenderId: "801468807455"
};

const app = Firebase.initializeApp(config);
const db = app.database();

const postsRef = db.ref('posts');
const userRef = db.ref('users');
const postStorageRef = app
.storage()
.ref();

export {
  postsRef,
  userRef,
  postStorageRef,
  Firebase
}
