import React from 'react'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    return (
        <Navbar className='border-b-2 '>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 rounded-md text-white'>Byte</span>
                Blog
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden border-2 border-gray' color='grey' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='border-2 border-grey  sm:inline' color='grey' pill
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === 'light' ? <FaSun className='text-gray-700 ' /> : <FaMoon className='text-gray-700 dark:text-white' />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar
                            rounded
                            img={currentUser?.profilePic?.url}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                            }}
                          />}>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                        </Dropdown.Header>
                        <Dropdown.Header>
                            <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button gradientDuoTone='greenToBlue' outline>
                            Sign-in
                        </Button>
                    </Link>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
