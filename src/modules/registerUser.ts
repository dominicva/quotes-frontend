const BASE_URL = 'http://localhost:3001';

export type AuthAction = 'signup' | 'login';

const registerUser = async ({
  username,
  password,
  action,
}: {
  username: string;
  password: string;
  action: AuthAction;
}) => {
  const response = await fetch(`${BASE_URL}/${action}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  return response.ok ? data : Promise.reject(data);
};

export default registerUser;
