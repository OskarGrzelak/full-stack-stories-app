import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useLoggedUser } from '../contexts/LoggedUser'

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginForm = styled.form`
  width: 600px;
`

const InputGroup = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 16px;
  position: relative;
`

const Label = styled.span`
  position: absolute;
  top: 0;
  left: 20px;
  background-color: #fff;
  padding: 0 5px;
  transform: translateY(-50%);
  font-size: 14px;
`

const Input = styled.input`
  border: 2px solid #333;
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
`

const SubmitButton = styled.button`
  width: 100%;
  background-color: #fff;
  padding: 10px 15px;
  border: 2px solid #333;
  cursor: pointer;
  font-size: 18px;
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setLoggedUser } = useLoggedUser()
  let history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/users/login', {
        email,
        password,
      })
      setLoggedUser(response.data.user)
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  return (
    <Layout>
      <LoginForm onSubmit={handleLogin}>
        <InputGroup>
          <Label>Email</Label>
          <Input
            type="email"
            id="email"
            onChange={(e) => handleEmailChange(e)}
            value={email}
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <Input
            type="password"
            id="password"
            onChange={(e) => handlePasswordChange(e)}
            value={password}
          />
        </InputGroup>
        <SubmitButton type="submit">Log in</SubmitButton>
      </LoginForm>
    </Layout>
  )
}

export default Login
