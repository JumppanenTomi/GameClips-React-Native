import {StatusBar} from 'react-native';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigations/Navigator';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
