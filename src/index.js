import React from 'react';

import './config/ReactotronConfig';
/**
 É sempre bom colocar a importação das rotas, abaixo da
 importação do reactotron, porque assim, ele vai conseguir
 capturar os erros e exibir no console
 */
import Routes from './routes';

export default function App(){
  return <Routes />;
}
