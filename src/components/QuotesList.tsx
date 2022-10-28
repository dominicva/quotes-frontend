import { useState, useEffect } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { getAllQuotes } from '../modules/crud';

const Quote = ({ text, author }) => {
  return (
    <Box w="100%" maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
      <Text>{text}</Text>
      <Heading>{author}</Heading>
    </Box>
  );
};

const QuotesList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getAllQuotes()
      .then(quotes => setQuotes([...quotes]))
      .catch(e => {
        console.error(e);
        setQuotes([]);
      });
  }, []);

  return (
    <div>
      <h1>Quotes List</h1>
      {quotes.map(quote => {
        console.log('quote', quote);
        return (
          <Quote key={quote.id} text={quote.text} author={quote.authorName} />
        );
      })}
    </div>
  );
};

export default QuotesList;
