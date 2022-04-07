import { NativeBaseProvider } from 'native-base';
import { FunctionComponent } from 'react';
import AddToDo from './components/AddToDo/AddToDo';

const App: FunctionComponent = () => {
  return (
    <NativeBaseProvider>
        <AddToDo />
    </NativeBaseProvider>
  );
}

export default App;
