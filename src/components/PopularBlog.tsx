import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlog = () => {

    const blog = [
        {
            id: 1,
            title: "Blog 1",
            author: "Author 1",
            likes: 100,
            comments: 10,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut metus sit amet turpis fermentum tincidunt. Sed et purus at felis lacinia aliquam. Nullam nec semper purus. Pellentesque habitant morbi tristique sen et netus et malesuada fames ac turpis egestas. Nulla facilisi. Sed nec metus nec orci congue tincidunt. Nulla facilisi. Sed nec metus nec orci congue tincidunt."
        },

        {
            id: 2,
            title: "Blog 2",
            author: "Author 2",
            likes: 150,
            comments: 20,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut metus sit amet turpis fermentum tincidunt."
        },
        {
            id: 3,
            title: "Blog 3",
            author: "Author 3",
            likes: 200,
            comments: 30,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut metus sit amet turpis fermentum tincidunt."
        },
        {
            id: 4,
            title: "Blog 4",
            author: "Author 4",
            likes: 120,
            comments: 15,
            content: "Cras nec dui nec ligula aliquam interdum. Curabitur ut purus sit amet lorem facilisis aliquam. Quisque placerat, neque sed facilisis faucibus, urna enim tincidunt urna, et facilisis purus lorem at lectus."
        },
        {
            id: 5,
            title: "Blog 5",
            author: "Author 5",
            likes: 250,
            comments: 45,
            content: "Integer consectetur magna in massa convallis, a auctor erat lacinia. Nunc pretium, turpis eget fermentum volutpat, urna nunc ultricies est, eu placerat velit odio vel lorem. Morbi vitae cursus ipsum."
        }
    ];


    return (
        <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
            <h2 className="text-xl font-bold mb-5">
                Popular blog
            </h2>
            <ul>
                {blog.map((blog) => (
                    <li key={blog.id} className="mb-4">
                        <div className="flex justify-center items-center">
                            <span className="font-bold mb-2">{blog.title}</span>
                        </div>
                        <span className="text-gray-600">Published by: {blog.author}</span>
                        <div className="flex items-center mt-2">
                            <MessageCircle size={16} />
                            <span className="text-gray-500 mr-5 ml-1">{blog.likes}</span>
                            <ThumbsUp size={16} />
                            <span className="text-gray-500 mr-2 ml-2">
                                {blog.comments}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PopularBlog