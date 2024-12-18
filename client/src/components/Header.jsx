import React from 'react'
import { Button, Navbar } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';

export default function Header() {
    const path = useLocation().pathname;
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
            <Button className='border-2 border-grey w-12 h-10 sm:inline' color='grey' pill>
                <FaMoon className='text-gray-700'/>
            </Button>
            <Link to="/sign-in">
            <Button gradientDuoTone='greenToBlue' outline>
                Sign-in
            </Button>
            </Link>
            <Navbar.Toggle/>
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
