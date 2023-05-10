import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const TheBlog = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedPost, setSelectedPost] = React.useState(null);

  // Initialize Firebase storage
  const storage = getStorage();

  React.useEffect(() => {
    // fetch data from the Firebase API
    fetch("https://swl-blog-default-rtdb.firebaseio.com/blog_post.json")
      .then((response) => response.json())
      .then(async (data) => {
        // transform the data into an array
        const postsArray = [];
        for (const key in data) {
          // get the image URL from Firebase storage
          const imageRef = ref(storage, data[key].imageUrl);
          const imageUrl = await getDownloadURL(imageRef);

          postsArray.push({
            id: key,
            ...data[key],
            imageUrl: imageUrl,
          });
        }
        console.log(postsArray);
        // set the posts state
        setPosts(postsArray);
        setLoading(false);
        setSelectedPost(postsArray[0].id);
      });
  }, [storage]);

  const handlePostSelect = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="grid grid-cols-1 justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-r from-red-400 to-blue-500">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{posts.find(post => post.id === selectedPost)?.title}</h2>
        <div className="">
       
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="invisible md:visible absolute top-12 right-0 w-56 bg-white shadow-lg rounded">
              {posts.map((post) => (
                <li key={post.id} className="hover:bg-gray-100">
                  <button
                    className={`${
                      post.id === selectedPost ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2`}
                    onClick={() => handlePostSelect(post.id)}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <img
        className="my-4 w-36  rounded-full flex justify-center"
        src={posts.find(post => post.id === selectedPost)?.imageUrl}
        alt={posts.find(post => post.id === selectedPost)?.title}
        style={{ maxWidth: "100%" }}
      />
      <p>{posts.find(post => post.id === selectedPost)?.content}</p>
    </div>
  );
};

export default TheBlog;
