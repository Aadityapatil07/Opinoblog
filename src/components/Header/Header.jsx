import React, { useState } from 'react';
import { Container, Logo, LogoutBtn, ProfileBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="shadow bg-[#b59d7d] relative">
      <Container>
        <nav className="flex items-center justify-between">

          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>


          <button
            className="lg:hidden px-4 py-2 text-[#4B3022] hover:text-[#f4d6a1b8] transition-all"
            onClick={toggleMenu}
          >
            ☰
          </button>

          <ul className="hidden lg:flex items-center ml-auto gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 text-[#4B3022] hover:text-[#f4d6a1b8] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
             {authStatus && (
              <li>
                <ProfileBtn onClick={toggleMenu} />
              </li>
            )}
            {authStatus && (
              <li>
                <LogoutBtn onClick={toggleMenu} />
              </li>
            )}
           
          </ul>
        </nav>
        {isMenuOpen && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-[#b59d7d] shadow-lg lg:hidden z-10">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="border-b border-gray-300">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(item.slug);
                      }}
                      className="block w-full text-left px-6 py-2 text-[#4B3022] hover:text-[#f4d6a1b8] hover:bg-gray-100 transition-all"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="border-b border-gray-300">
                <ProfileBtn onClick={toggleMenu}  />
              </li>
            )}
            {authStatus && (
              <li >
                <LogoutBtn onClick={toggleMenu} />
              </li>
            )}
            
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
