import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import HomeImg from "../assets/HomeImg.webp"
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])
   
    useEffect(() => {
        
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
       
    }, [])
  
    if (posts.length == 0) {
        return (
            <div
                className="w-full p-5  text-center"
                style={{
                    backgroundImage: `url(${HomeImg})`,
                    backgroundSize: "cover", // Ensures the full image is visible
                    backgroundRepeat: "no-repeat", // Prevents the image from repeating
                    backgroundPosition: "center -40px", 
                    color: 'white', // Ensure the text is readable
                    height: '100vh', // Adjust height to your needs
                }}
            >
                <Container>
                    <div className="flex flex-wrap">
                     
                        <div className="p-20 w-full">
                        <Link to={'/login'}>
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            </Link>
                        </div>
                       
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className='w-full py-3'>
            <Container>
                <div className='flex flex-wrap gap-0'>
                    {posts.slice().reverse().map((post) => (
                        <div key={post.$id} className='p-4'>
                            <PostCard {...post} />
                        </div>
                    ))}  
                </div>
            </Container>
        </div>
    )
}

export default Home