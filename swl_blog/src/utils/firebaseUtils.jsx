import firebase from 'firebase';
import { database, storage } from './firebase';
import { UserAuth } from '../context/authContext'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { useState } from 'react';

// create write to database function here


export const WriteUserData = (userId, name, email) => {

  const auth = useContext(UserAuth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `blog_images/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    // Create a new blog post in the Firebase Realtime Database
    const blogRef = push(dbRef(database, "blog_post"));
    const blog = {
      title,
      content,
      imageUrl: url,
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName,
      timestamp: Date.now(),
    };
    await blogRef.set(blog);
    // Reset the form
    setTitle("");
    setContent("");
    setImage(null);
    setImageUrl("");
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  //   setImageUrl(URL.createObjectURL(file));
  // };

  // if (!auth.currentUser) {
  //   // Redirect to login page if user is not authenticated
  //   return <Navigate to="/login" />;
  // }


  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
  });
};

// create read from database function here
export const ReadUserData = (userId) => {
  firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {

  if (snapshot.exists()) {
    const username = snapshot.val().username;
    const email = snapshot.val().email;
    console.log(username, email);
  }
  else {
    console.log("No data available");
  }
  }).catch((error) => {
    console.error(error);
  });
};



