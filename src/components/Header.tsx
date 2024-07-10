import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="home">Home</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
