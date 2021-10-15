import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useLoggedUser } from '../contexts/LoggedUser'
import Navbar from '../components/Navbar'

const Layout = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 70px auto 0;
  overflow-x: hidden;
`

const Posts = styled.ul`
  list-style: none;
`

const Post = styled.li`
  width: clamp(45ch, 50%, 75ch);
  margin: 5rem auto;
`

const PostHeader = styled.div`
  margin-bottom: 2rem;

  & h3 {
    font-size: 2.2rem;
  }

  & h6 {
    font-size: 1.6rem;
    font-weight: 400;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    border-radius: 10px;
    background-color: #aaa;
    width: 50%;
    padding-top: 2px;
    margin-top: 5px;
  }
`

const PostContent = styled.div`
  margin-bottom: 2rem;
`

const Home = () => {
  const { loggedUser } = useLoggedUser()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get('/api/v1/stories')
      setPosts(response.data.data.stories)
    }
    fetchStories()
  }, [loggedUser])

  return (
    <Layout>
      <Navbar />
      {posts && (
        <Posts>
          {posts.map((post, index) => {
            return (
              <Post key={index}>
                {loggedUser && post.authorId === loggedUser._id ? (
                  <button>Edit</button>
                ) : null}
                <PostHeader>
                  <h3>{post.title}</h3>
                  <h6>{post.author}</h6>
                </PostHeader>
                <PostContent>
                  <p>{post.excerpt}</p>
                </PostContent>
                <Link to={`/story/${post._id}`}>Czytaj dalej</Link>
              </Post>
            )
          })}
        </Posts>
      )}
    </Layout>
  )
}

export default Home
