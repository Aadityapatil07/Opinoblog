import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'


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
                className="w-full py-8 mt-4 text-center"
                style={{
                    backgroundImage: 'url("")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white', // Ensure the text is readable
                    height: '100vh', // Adjust height to your needs
                }}
            >
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
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
                    {posts.map((post) => (
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