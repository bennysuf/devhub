import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul style={{ marginLeft: "5%" }}>
        <li>
          <strong>Codify</strong>
        </li>
      </ul>
      <ul style={{ marginRight: "3%" }}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
