const BASE_URL = 'http://localhost:3001';

const postUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/user`, {
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

export default postUser;
