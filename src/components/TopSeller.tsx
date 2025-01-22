import axios from "axios";
import { useEffect, useState } from "react";
import Author from "../types/Author";

const TopSeller = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    const fetchAuthors = async () => {
        axios.get('https://randomuser.me/api/?results=5')
            .then((res) => {
                const authorData: Author[] = res.data.results.map((author: any) => ({
                    id: author.login.uuid,
                    name: `${author.name.first} ${author.name.last}`,
                    isFollowing: false,
                    image: author.picture.medium
                }));
                setAuthors(authorData);
            })
            .catch((error) => { console.log(error) });
    }

    const handleFollowClick = (id: string) => {
        const updatedAuthors = authors.map((author) => {
            if (author.id === id) {
                return { ...author, isFollowing: !author.isFollowing }
            }
            return author;
        });
        setAuthors(updatedAuthors);
    }

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <>
            <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
                <h2 className="text-xl font-bold mb-5">Top sellers</h2>
                <ul>
                    {authors.map((author) => (
                        <li key={author.id} className="flex items-center justify-between mb-4">
                            <section className="flex justify-center items-center">
                                <img src={author.image} alt={author.name} className="w-[25%] h-[25%] justify-center rounded-full" />
                                <span className="ml-4">{author.name}</span>
                            </section>
                            <button className={`py-1 px-3 rounded ${author.isFollowing
                                ? 'bg-red-500 text-white'
                                : 'bg-black text-white'
                                } `} onClick={() => handleFollowClick(author.id)}>{author.isFollowing ? "Unfollow" : "Follow"}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TopSeller