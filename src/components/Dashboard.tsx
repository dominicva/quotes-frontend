import { Box, Heading } from '@chakra-ui/react';
import QuotesList from './QuotesList';
import CreateQuoteModal from './CreateQuoteModal';

const Dashboard = () => {
  return (
    <Box>
      <Heading>Dashboard</Heading>

      <CreateQuoteModal />
      <QuotesList />
    </Box>
  );
};

export default Dashboard;
