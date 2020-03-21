// Cria um container onde fica toda a navegação da nossa aplicaçãp
// possui varios tipos de navegações
// cada tipo navegação tem sua propria lib
//import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'


import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  /**
   Qualquer tipo de navegação tem que vir dentro do createAppContainer,
   senão não funcona
   */
  createStackNavigator(
  {
    Main,
    User,
  },
  {
    headerLayoutPreset: 'center',
    /**
      No ios ele fica mostrando o nome da pagina
      anterior
    */
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159c1'
      },
      // cor dos textos, botoes etc
      headerTintColor: '#FFF',
    },
  },
),
);

export default Routes;

