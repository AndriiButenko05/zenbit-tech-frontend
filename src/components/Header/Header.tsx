"use client";
import { useState } from "react";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    if (menuOpen) toggleMenu();
  };
  return (
    <header className={css.header}>
      <a href="/" className={css.logo}>
        Real Estate Investment
      </a>
      <ul className={css.buttons}>
        {!isAuth ? (
          <>
            <li>
              <Link to="/login" className={css.button}>
                Log in
              </Link>
            </li>
            <li>
              <Link to="/register" className={`${css.button} ${css.signUp}`}>
                Sign up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className={css.userEmail}>{userEmail}</span>
            </li>
            <li>
              <button className={css.button} onClick={handleLogout}>
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
      <button
        className={`${css.hamburger} ${menuOpen ? css.open : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <div className={css.iconWrapper}>
          {menuOpen ? (
            <svg width="20" height="20" className={css.icon} aria-hidden="true">
              <use href="/symbol-defs.svg#icon-close"></use>
            </svg>
          ) : (
            <svg width="28" height="20" className={css.icon} aria-hidden="true">
              <use href="/symbol-defs.svg#icon-burger"></use>
            </svg>
          )}
        </div>
      </button>
      <ul className={`${css.mobileMenu} ${menuOpen ? css.open : ""}`}>
        {!isAuth ? (
          <>
            <li>
              <button
                className={css.button}
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
              >
                Log in
              </button>
            </li>
            <li>
              <button
                className={`${css.button}  ${css.signUp}`}
                onClick={() => {
                  navigate("/register");
                  toggleMenu();
                }}
              >
                Sign up
              </button>
            </li>
          </>
        ) : (
          <li className={css.userInfo}>
            <span className={css.userEmail}>{userEmail}</span>
            <button className={css.button} onClick={handleLogout}>
              Log out
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}
