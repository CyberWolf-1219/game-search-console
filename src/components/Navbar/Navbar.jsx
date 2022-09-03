import { navLinks } from "../../resources";
import "./navbar.css";

function Navbar() {
  return (
    <nav>
      <img src="" alt="" id="logo" />
      <span>
        {navLinks.map((link) => {
          return (
            <li key={link.id} id={link.id} className="nav-link hf">
              <a href={link.link}>{link.title}</a>
            </li>
          );
        })}
      </span>
    </nav>
  );
}

export default Navbar;
