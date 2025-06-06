import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import  logo  from '../assets/logo.png';

export default function Header() {
    const location = useLocation();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
     const urlParams = new URLSearchParams(location.search);
     const searchTermFromUrl = urlParams.get('searchTerm');
     if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
     }
    }, [location.search]);
    

    const handleSignout = async () => {
        try{
           const res = await fetch('/api/user/signout',{
            method: 'POST',
           });
           const data = await res.json();
           if(!res.ok){
            console.log(data.message);
           }else{
           dispatch(signoutSuccess());
           }
        }catch(error){
          console.log(error.message);
        }
      }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }  
    return (
        <Navbar className='border-b-2 '>
            <Link to="/" className='self-center whitespace-nowrap  rounded-md'>
                <img src={logo} alt="Logo" className="w-32" />
            </Link>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/community"} as={'div'}>
                    <Link to='/community'>Community</Link>
                </Navbar.Link>
                {
                    currentUser ? ( <Navbar.Link active={path === "/create-post"} as={'div'}>
                        <Link to='/create-post'>Create</Link>
                    </Navbar.Link>) : ( <Navbar.Link active={path === "/create-post"} as={'div'}>
                    <Link to='/sign-up'>Create</Link>
                </Navbar.Link> )
                }
                
            </Navbar.Collapse>
            
            <div className='flex gap-2 md:order-2'>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            
                <Button className='border-2 border-grey  sm:inline' color='grey' pill
                    onClick={() => dispatch(toggleTheme())}>
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
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button gradientDuoTone='greenToBlue' outline>
                            Sign-in
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle/>
            </div>
            


        </Navbar>
    )
}
