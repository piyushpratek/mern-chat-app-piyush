import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/chatProvider';
import { isDevelopm̥ent̥ } from '../../constants';

const Login = () => {
  const [show, setShow] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean | undefined | any>(false);
  const handleClick = () => setShow(!show);
  const { setUser } = ChatState();

  const toast = useToast();
  const navigate = useNavigate();
  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );
      toast({
        title: 'Login Succesful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      // set user login details in `react-context`
      setUser?.(data);
      setLoading(false);
      navigate('/chats');
    } catch (error: any) {
      // When 404 (NOT_FOUND) we need to show username/email not found.
      // When 401 (UNAUTHORIZED) we need to show bad username or password.
      let message = '';

      if (error.response.status === 404) {
        message = 'Email/Username not found. Please SignUp first !';
      }
      if (error.response.status === 401) {
        message = 'Username and password do not match.';
      }

      toast({
        title: message ? message : 'Error Occured',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing='5px' color='black'>
      <>
        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
      </>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        style={{ margin: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        color='white'
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
