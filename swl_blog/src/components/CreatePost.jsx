import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { storage, db } from "../.env/firebase";  
import { useState } from "react";
import {ref as dbRef, push, set, onValue } from "firebase/database";



// import { ref as dbRef, push } from "firebase/database";

//create a function that use the writeBlog function from firebase.js and pass the data from the form to it

const CreateBlogPost = () => {
    const { user, logout } = UserAuth()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        
        event.preventDefault();
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `blog_images/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        // Create a new blog post in the Firebase Realtime Database
        const db = getDatabase(); // get the database instance
        const blogRef = push(dbRef(db, "blog_post"));
        const blogPostRef = dbRef(db, `blog_post/${blogRef.key}`);
        const blog = {
          title,
          content,
          imageUrl: url,
          authorId: user.uid,
          authorName: user.displayName,
          timestamp: Date.now(),
        };
        await set(blogPostRef, blog);
        // Reset the form
        setTitle("");
        setContent("");
        setImage(null);
        setImageUrl("");
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImageUrl("");
        }
    // navigate("/blog");
    };

    return (
        <div className="max-w-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-gray-900">Write a new Post about SWL!</h2>
            <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
            >
                <div className="space-y-2">
                    <label htmlFor="title" className="font-medium text-gray-700 block ">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={title}
                        maxLength="50"
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full shadow-lg sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="image" className="font-medium text-gray-700 block">
                        Image
                    </label>
                    <div className="flex items-center">
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                        >
                            Select Image
                        </label>
                        {imageUrl && (
                            <div className="flex items-center">
                                <img
                                    src={imageUrl}
                                    alt="Selected file"
                                    className="block w-16 h-16 rounded-full object-cover mr-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageChange({ target: { files: [] } })}
                                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Unselect Image
                                </button>
                            </div>
                        )}
                    </div>
                    <label htmlFor="content" className="block font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className="w-full shadow-lg px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
       <div className="mt-4">
            <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2"
                onChange={(e) => setContent(e.target.value)}
            // onClick={navigate("/TheBlog")}


            >
                Publish Blog Post
            </button>
                </div>

        </div>
            </form >
 
        </div>
    );
};

export default CreateBlogPost;