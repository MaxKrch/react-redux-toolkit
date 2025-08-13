import { Provider } from 'react-redux'
import TaskManager from './components/TaskManager'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  )
}

export default App
