import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import registerUser from '../modules/registerUser';

type CustomError = { type: string; value: ''; msg: string; field?: string };

type AuthErrors = {
  error?: CustomError & CustomError[];
};

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({} as AuthErrors);

  const singleError = errors.error && !Array.isArray(errors.error);
  const multipleErrors = errors.error && Array.isArray(errors.error);
  const isError = singleError || multipleErrors;

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();

    try {
      await registerUser({ username, password, action: 'signup' });
      setErrors({});
    } catch (e) {
      console.log(e);
      setErrors(e);
    }
  };

  const errorsElement = (
    <div>
      {singleError && (
        <div>
          <p>{errors.error?.msg}</p>
        </div>
      )}
      {multipleErrors &&
        errors.error?.map(error => <div key={error.msg}> {error.msg} </div>)}
    </div>
  );

  return (
    <div>
      <h1>Sign up</h1>
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

        {isError ? errorsElement : null}
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
