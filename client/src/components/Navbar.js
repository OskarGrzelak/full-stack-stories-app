import axios from 'axios'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useLoggedUser } from '../contexts/LoggedUser'

import logo from '../images/logo.png'
import { ReactComponent as MenuIcon } from '../images/menu-icon.svg'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background-color: #fff;
  z-index: 1
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
  position: relative;
  padding: 20px;
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

const MenuList = styled.ul`
  list-style: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  padding: 90px 10px 10px;
  background-color: #eee;
  transform: ${props => props.active ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${props => props.active ? '1' : '0'};
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  transition: all 0.2s;
  z-index: -1;
`

const MenuItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #fff;
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  height: 15px;
  color: #333;
`

const Navbar = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenuList = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleLogout = async () => {
    await axios.get('/api/v1/users/logout')
    setLoggedUser(null)
  }
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
              <MenuButton onClick={toggleMenuList}>
                <StyledMenuIcon />
              </MenuButton>
              <MenuList active={isMenuOpen}>
                <MenuItem>
                  <span onClick={handleLogout}>Log out</span>
                </MenuItem>
              </MenuList>
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
