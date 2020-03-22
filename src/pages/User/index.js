import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

// import { Container } from './styles';

export default class User extends Component {
  /**
   * Um funcao que retorna um objeto, para isso
   * usamos o parenteses
   */
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  /**
   * Carrega automaticamente quando acessar essa pagina,
   * para realizar a busca dos diretorios favoritos
   */
  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  // console.tron.log(props);
  render() {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <Stars
          data={stars} // o array de dados
          keyExtractor={star => String(star.id)} // passando uma key
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
