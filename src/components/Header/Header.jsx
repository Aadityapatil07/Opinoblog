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
    {
      name: 'Home',
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#b59d7d] relative">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden px-4 py-2 text-[#4B3022] hover:text-[#f4d6a1b8] transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Desktop Navigation */}
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
                <LogoutBtn />
              </li>
            )}
            {authStatus && (
              <li>
                <ProfileBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {isMenuOpen && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-[#b59d7d] shadow-lg lg:hidden z-10">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="border-b border-gray-300 last:border-none">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false); // Close menu on navigation
                        navigate(item.slug);
                      }}
                      className="block w-full text-left px-6 py-2 text-[#1E3A5F] hover:text-[#66A5AD] hover:bg-gray-100 transition-all"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {authStatus && (
              <li>
                <ProfileBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
