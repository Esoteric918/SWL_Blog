import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import "./index.css"


const TheBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Initialize Firebase storage
  const storage = getStorage();

  useEffect(() => {
    // Fetch data from the Firebase API
    fetch("https://swl-blog-default-rtdb.firebaseio.com/blog_post.json")
      .then((response) => response.json())
      .then(async (data) => {
        // Transform the data into an array
        const postsArray = await Promise.all(
          Object.entries(data).map(async ([key, post]) => {
            const imageRef = ref(storage, post.imageUrl);
            const imageUrl = await getDownloadURL(imageRef);
            return {
              id: key,
              ...post,
              imageUrl: imageUrl,
            };
          })
        );

        setPosts(postsArray);
        setLoading(false);
        setSelectedPost(postsArray[0]?.id || "");
      });
  }, [storage]);

  const handlePostSelect = (postId) => {
    setSelectedPost(postId);
  };

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  

  return (
    <><div
      className="grid grid-cols-1 justify-center mx-auto w-full h-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-r from-red-400 to-blue-500 text-slate-300">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">
          {posts.find((post) => post.id === selectedPost)?.title}
        </h2>

        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="relative">
              <input
                type="checkbox"
                id="toggleMenu"
                className="hidden md:hidden"
                checked={isMenuVisible}
                onChange={toggleMenu} />
              <label htmlFor="toggleMenu" className="md:hidden">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" />
              </label>
              <ul
                className={`${isMenuVisible ? "visible" : "invisible"} md:visible absolute top-12 right-0 w-56 bg-none shadow-lg rounded`}
              >
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <li key={post.id} className="hover:bg-gray-100">
                      <button
                        className={`${post.id === selectedPost ? "bg-gray-100" : ""} w-full text-left px-4 py-2`}
                        onClick={() => handlePostSelect(post.id)}
                      >
                        {post.title}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No posts available</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <img
        className="my-4 w-36  rounded-full flex justify-center"
        src={posts.find((post) => post.id === selectedPost)?.imageUrl}
        alt={posts.find((post) => post.id === selectedPost)?.title}
        style={{ maxWidth: "100%" }} />
      <p className="mr-32">{posts.find((post) => post.id === selectedPost)?.content}</p>
    </div><div>
        <img src="assets/swl-hero.jpg" alt="Jessica and info about SWL" />
      </div></>
  );
};

export default TheBlog;