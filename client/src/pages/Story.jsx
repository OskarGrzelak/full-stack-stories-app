import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useLoggedUser } from '../contexts/LoggedUser'

const Layout = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

const Post = styled.div`
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

  & p:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const Story = () => {
  const { storyId } = useParams()
  const { loggedUser } = useLoggedUser()
  const [story, setStory] = useState()
  useEffect(() => {
    const fetchStoryById = async (id) => {
      const response = await axios.get(`/api/v1/stories/${id}`)
      setStory(response.data.data.story)
    }
    fetchStoryById(storyId)
  }, [storyId])

  return (
    <Layout>
      {story && (
        <Post>
          {loggedUser && story.authorId === loggedUser._id ? (
            <button>Edit</button>
          ) : null}
          <PostHeader>
            <h3>{story.title}</h3>
            <h6>{story.author}</h6>
          </PostHeader>
          <PostContent>
            {story.text.split('\\n\\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </PostContent>
        </Post>
      )}
    </Layout>
  )
}

export default Story
