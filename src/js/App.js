import React from 'react';
import './../css/App.css'
import WelcomPage from './components/WelcomePage'
// import 'resize-observer-polyfill/dist/ResizeObserver.global';
const App=()=> {
  
  return (
    <div>
    {/* <Panel horario={horario}></Panel> */}
    <WelcomPage></WelcomPage>
    </div>
    
  // <Cell 
  //   name={"Clase prueba"}
  //   group={4}
  //   professor={'Profesor de prueba'}
  //   classroom={[423,101]}>
  //   </Cell>
  )

}
export default App;


