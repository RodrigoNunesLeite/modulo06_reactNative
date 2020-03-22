import React, { Component } from 'react';
import PropTypes from 'prop-types';
// ActivityIndicator é o loading
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

// import { Container } from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  // validacao
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // executa quando há alteraçoes na variavel users
  // _ descarta as props
  // prevState = o estado anterior

  /**
   Não usamos o async porque se trata de verificar se houve mudanças,
   depois do clique do usuario

   Convertemos o array para json, porque o metodo não aceita array
   */
  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    // faz o teclado sumir ao final da chamada
    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    // User, é o nome da pagina
    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users} // onde estarao os dados da minha lista
          keyExtractor={user => user.login} // pega cada usuario e retorna um item unico
          renderItem={({ item }) => (
            // item é o usuario
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
