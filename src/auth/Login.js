import React from 'react';

import {
            Box,
            Container,
            FormControl,
            FormLabel,
            FormHelperText,
            Input,
            Center,
            Button,
            Heading,
            InputGroup,
            InputRightElement,

} from '@chakra-ui/react'

function PasswordInput() {
            const [show, setShow] = React.useState(false)
            const handleClick = () => setShow(!show)
          
            return (
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )
          }

export default function Login() {
            return (
                        <Container maxW='md' mt={"250px"} bg='' color='#262626'>
                                    <Center h='100px' color='white'>
                  <Box bg='white' borderWidth='1px' boxShadow='2xl' w='100%' p={4} color='grey' borderRadius={'7px'}>
                        <FormControl>
                        <Heading  mt={"30px"} color='gray' fontWeight={'normal'}>
                                  
                                    Sign In
                                    
                        </Heading>
                     <FormLabel  mt={"20px"}>Email</FormLabel>
                        <Input type='email' borderRadius={'3px'} size="md" autoFocus />
                       <FormLabel>Password</FormLabel>
                     {/*  <Input type='password'  borderRadius={'3px'} size="sm"/> */}
                        <PasswordInput/>
                      

                        <Button colorScheme='blue' w="100%" mt={"10px"} mb={"10px"}>Log in</Button>

                        <FormHelperText>No Account? Click Here</FormHelperText>
                         </FormControl>
                       

                                                </Box>
                                    </Center>

                        </Container>

            );
}
