import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {FaBarsStaggered, FaBlog, FaXmark} from 'react-icons/fa6';
import { AuthContext } from '../../contexts/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const {user} = useContext(AuthContext);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    }, [])
    //nav items
    const navItems = [
        {link: "Home", path: "/"},
        {link: "About", path: "/about"},
        {link: "Shop", path: "/shop"},
        {link: "Blog", path: "/blog"},
        {link: "Sell your book", path: "/admin/dashboard"},
    ]

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all duration-300 ease-in '>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky? 'sticky top-0 left-0 right-0 bg-blue-200' : ''}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2' ><FaBlog className='inline-block'/>Books</Link>
                <ul className='md:flex space-x-12 hidden' >
                    {navItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{item.link}</Link>
                            </li>
                        )
                    })}
                </ul>
                {/* mobile menu */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
                    {
                        user?user.email:""
                    }
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black'/>
                        }
                    </button>
                </div>
            </div>
            {/* navitems for sm devices */}
            <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen? 'block fixed top-9 right-0 left-0' : 'hidden'}`}>
                {
                    navItems.map((item, index) => {
                        return (
                            <Link to={item.path} key={index} className='block text-base text-white uppercase cursor-pointer hover:text-blue-700'>{item.link}</Link>
                        )
                    })
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar
