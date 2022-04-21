/* eslint-disable no-alert */
import React, {useState, useContext} from 'react';
import {Alert, Text} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import {
  Container,
  Title,
  SecondaryText,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';

export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp, signIn} = useContext(AuthContext);

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  async function handleSign() {
    if (email === '' || password === '') {
      console.log('Atenção!', 'campos não foram preenchidos');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignup() {
    if (name === '' || email === '' || password === '') {
      console.log('Atenção!', 'campos não foram preenchidos');
      return;
    }

    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev
          <SecondaryText>Post</SecondaryText>
        </Title>
        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="*********"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button onPress={handleSign}>
          <ButtonText>Acessar</ButtonText>
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Dev
        <SecondaryText>Post</SecondaryText>
      </Title>
      <Input
        placeholder="Seu nome"
        onChangeText={text => setName(text)}
        value={name}
      />
      <Input
        placeholder="seuemail@teste.com"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="*********"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button onPress={handleSignup}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta?</SignUpText>
      </SignUpButton>
    </Container>
  );
}
