import { MouseEventHandler, useState } from 'react';
import postUser from './modules/postUser';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState([]);
  const isError = inputErrors.length > 0;

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();

    try {
      await postUser({ username, password });
      setInputErrors([]);
    } catch (e) {
      // @ts-ignore-next-line
      setInputErrors([...e.message]);
    }
  };

  return (
    <form>
      <div className="column">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className="column">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>

      {isError ? (
        <div className="errors">
          {inputErrors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      ) : null}
    </form>
  );
};

export default Signup;
