import Reactotron from 'reactotron-react-native';

/*
__DEV__ = variabel global do react native, que retorna
true quando o usuario está emulando em desenvolvimento
*/
if (__DEV__) {
  const tron = Reactotron.configure().useReactNative().connect();

  /*
    Criando uma nova propriedade dentro da variabel global
    console, isso vai possibilitar usar console.tron
    em toda a aplicação

    console.log.tron
  */
  console.tron = tron;

  /*
    Limpa todo meu console,sempre que eu recarregar meu app
  */
  tron.clear()
}
