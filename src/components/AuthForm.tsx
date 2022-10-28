import React, { useState } from 'react';

import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormHelperText,
  Link,
  Stack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import registerUser, { AuthAction } from '../modules/registerUser';

type CustomError = { type: string; value: ''; msg: string; field?: string };

type AuthErrors = {
  error?: CustomError & CustomError[];
};

const AuthForm = ({ action }: { action: AuthAction }) => {
  const [authAction, setAuthAction] = useState(action);
  const toggleAuthAction = () => {
    setAuthAction(authAction === 'login' ? 'signup' : 'login');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({} as AuthErrors);

  const singleError = errors.error && !Array.isArray(errors.error);
  const multipleErrors = errors.error && Array.isArray(errors.error);
  const isError = singleError || multipleErrors;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await registerUser({ username, password, action: authAction });
      setErrors({});
    } catch (e) {
      console.log(e);
      setErrors(e);
    }

    setIsSubmitting(false);
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
    <Box w="100%" maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h1" size="lg" mb={4}>
        {authAction === 'signup' ? 'Sign Up' : 'Login'}
      </Heading>
      <FormControl isInvalid={isError}>
        <Stack spacing={4}>
          <InputGroup>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
          </InputGroup>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>

        <Button
          mt={4}
          colorScheme="twitter"
          isLoading={isSubmitting}
          loadingText="Submitting"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        {isError && errorsElement}

        <FormHelperText>
          {authAction === 'signup'
            ? 'Already have an account?'
            : 'Need an account?'}{' '}
          <Link onClick={toggleAuthAction}>
            {authAction === 'signup' ? 'Log in' : 'Sign up'}
          </Link>
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default AuthForm;
