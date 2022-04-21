/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useLayoutEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {Container, Input, Button, ButtonText} from './styles';
import {AuthContext} from '../../contexts/auth';

function NewPost() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      console.log('seu post esta vazio');
    }

    let avatarUrl = null;

    try {
      let response = await storage()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();
      avatarUrl = response;
    } catch (err) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost('');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo?"
        value={post}
        onChangeText={text => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#DDD"
        maxLength={300}
      />
    </Container>
  );
}

export default NewPost;
