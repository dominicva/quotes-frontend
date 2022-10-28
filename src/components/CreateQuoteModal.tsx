import { useState, useRef } from 'react';

import {
  useDisclosure,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  Input,
  ButtonGroup,
  FormControl,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { postNewQuote } from '../modules/crud';

const CreateQuoteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const toast = useToast();

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { data: newQuote } = await postNewQuote({ author, text: quote });
      toast({
        title: 'Success',
        description: `Stored quote by ${newQuote.authorName}successfully`,
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      setQuote('');
      setAuthor('');
      onClose();
    } catch (e) {
      toast({
        title: 'Error',
        description: e.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="twitter" onClick={onOpen}>
        Create quote
      </Button>

      <Modal isOpen={isOpen} initialFocusRef={firstField} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Quote</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="quote">Quote</FormLabel>
              <Input
                ref={firstField}
                id="quote"
                value={quote}
                onChange={e => setQuote(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                id="author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <ButtonGroup spacing={3}>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="twitter"
                  isLoading={isSubmitting}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQuoteModal;
