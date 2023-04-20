import React from "react";

const TheBlog = () => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // fetch data from the Firebase API
        fetch("https://swl-blog.firebaseio.com/posts.json")
        .then((response) => response.json())
        .then((data) => {
            // transform the data into an array
            const postsArray = [];
            for (const key in data) {
                postsArray.push({
                    id: key,
                    ...data[key],
                });
            }
            // set the posts state
            setPosts(postsArray);
            setLoading(false);
        });
    }, []);
    
    return (
        <div>
        <h1>The Blog</h1>
        </div>
    );
    }

export default TheBlog;