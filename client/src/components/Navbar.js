import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useLoggedUser } from '../contexts/LoggedUser'

import logo from '../images/logo.png'
import { ReactComponent as MenuIcon } from '../images/menu-icon.svg'

const Nav = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
`

const Logo = styled.img`
  height: 60px;
`

const LoginButton = styled(Link)`
  color: #333;
  font-weight: 600;
  border-radius: 5px;
  padding: 0.5em 0.8em;
  transition: all 0.2s;

  &:link,
  &:visited {
    border: 2px solid #333;
  }

  &:hover,
  &:active {
    border: 2px solid #aaa;
  }
`

const List = styled.ul`
  list-style: none;
`

const UserName = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: 18px;
`

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`

const MenuButton = styled.span`
  width: 30px;
  height: 30px;
  border: 2px solid #333;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border: 2px solid #aaa;
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  height: 15px;
  color: #333;
`

const Navbar = () => {
  const { loggedUser } = useLoggedUser()
  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} alt="Logo strony" />
      </Link>
      <List>
        <li>
          {loggedUser ? (
            <UserMenu>
              <UserName>{loggedUser.name}</UserName>
              <MenuButton>
                <StyledMenuIcon />
              </MenuButton>
            </UserMenu>
          ) : (
            <LoginButton to="/login">Log in</LoginButton>
          )}
        </li>
      </List>
    </Nav>
  )
}

export default Navbar
