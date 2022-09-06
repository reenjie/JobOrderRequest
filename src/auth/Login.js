import React,{ useState } from 'react';
import '../App.css';
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
    Avatar,

} from '@chakra-ui/react'




 function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    function  handleSubmit() {
      
        alert('A name was submitted');
       
    }

    function handleInputChange(props){
        console.log(props.inputtype.data);
    }


            return (
             
               <Container id='login_container'  maxW='md' mt={340}   color='#262626'>
                                   
                 <Center h='100px'  color='white' >
                  <Box id='login'>
                    <form onSubmit={handleSubmit} method='post'>
                        <FormControl >
                    <Center mt={4} ><Avatar w={'100px'} h={'100px'} src='https://bit.ly/broken-link' /></Center>
                     
                     <FormLabel  mt={"20px"}>Email</FormLabel>
                        <Input type='email' borderRadius={'3px'}  required  name ='email' placeholder='Enter Email' inputtype ='email' onChange={handleInputChange}  autoFocus />
                       <FormLabel mt={5}>Password</FormLabel>
                       <InputGroup size='md'>
                            <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            name ='password'
                            required
                            />
                            <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                      

                        <Button type='submit' colorScheme='blue' w="100%" mt={5} mb={"10px"}>Log in</Button>

                        <FormHelperText>
                            No Account? 
                            <Button ml={2} colorScheme='teal' variant='link'>
                            Register here
                             </Button>

                        </FormHelperText>
                        </FormControl>
                       
                    </form>
                     </Box>

                                    </Center>

                </Container>
              
              
            );
}

export default Login;
