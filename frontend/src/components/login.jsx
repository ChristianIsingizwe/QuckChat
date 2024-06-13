
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <form action="">
      <label htmlFor="email">Email: </label>
      <input type="email" />
      <label htmlFor="password">Password: </label>
      <input type="password" />
      <button type="submit">LOGIN</button>
      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </form>
  );
}

export default LoginForm;