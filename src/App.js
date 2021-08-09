import * as css from './App.css';
import Carousel from './components/Carousel'

function App() {
  return (
    <div className={css.app}>
      <div className={css.sidebar}></div>
      <div className={css.content}>
        <Carousel />
      </div>
    </div>
  )
}

export default App