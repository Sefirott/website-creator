import './App.css'
import Pen from './toolbar-props/pen.tsx';
import Trash from './toolbar-props/trash.tsx';
import Toolbar from './toolbar.tsx';

function App() {



  return (
    <>
    <Toolbar 
    Pen={Pen} 
    Trash={Trash}
    />
    </> 
  )
}

export default App
