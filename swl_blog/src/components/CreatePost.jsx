import React from "react";
import { useNavigate } from "react-router-dom";
// import { WriteUserData } from '../utils/firebaseUtils';
import { UserAuth } from "../context/authContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";
import { database, storage } from "../firebase";

export default function NewBlogPost() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState("");

    const navigate = useNavigate();
    const auth = React.useContext(UserAuth);

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
        navigate("/CreatePost");

        const handleImageChange = (event) => {
            const file = event.target.files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        };

        return (
            <div className="max-w-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-medium text-gray-900">Write a new Post about SWL!</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="title" className="font-medium text-gray-700 block">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                                required
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
                                <img
                                    src={imageUrl}
                                    alt="Selected file"
                                    className="block w-16 h-16 rounded-full object-cover ml-2"
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2"
                            onChange={(e) => setContent(e.target.value)}
                            onClick={handleSubmit}

                        >
                            Publish Blog Post
                        </button>
                    </div>
                </form>
            </div>
        );
    };
};
