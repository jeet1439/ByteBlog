import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
export default function FooterCom() {
  return (
      <Footer container className='border border-t-8 border-teal-400 '>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid-w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-2xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 rounded-md text-white'>Byte</span>
        Blog
        </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/jeet1439' target='_blank' rel='noopener nofeferrer'>Projects</Footer.Link>
                <Footer.Link href='/' target='_blank' rel='noopener nofeferrer'>ByteBlog</Footer.Link>
                </Footer.LinkGroup>
                </div>

                <div>
                <Footer.Title title='Follow us' />
                <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/jeet1439' target='_blank' rel='noopener nofeferrer'>Github</Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener nofeferrer'>Discord</Footer.Link>
                </Footer.LinkGroup>
                </div>

                <div>
                <Footer.Title title='Legal' />
                <Footer.LinkGroup col>
                <Footer.Link href='#'  >Privacy</Footer.Link>
                <Footer.Link href='#' >Terms & Condition</Footer.Link>
                </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright href='#' by="ByteBlog" year={new Date().getFullYear()}/>
        <div className='flex gap-6 sm:mt-0 mt-3 sm:justify-center'>
            <Footer.Icon href='https://github.com/jeet1439' target='_blank' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='https://www.linkedin.com/in/jeetkangsabanik/' target='_blank' icon={BsLinkedin}/>
        </div>
        </div>
        </div>
      </Footer>
  );
}
