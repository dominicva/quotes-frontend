export const getAllQuotes = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/quote', {
      method: 'GET',
      credentials: 'include',
    });

    const { data: quotes } = await response.json();
    return quotes;
  } catch (e) {
    console.log(e);

    return [];
  }
};

export const postNewQuote = async ({ text, author }) => {
  const response = await fetch('http://localhost:3001/api/quote', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, author }),
  });

  const data = await response.json();

  return response.ok ? data : Promise.reject(data);
};
