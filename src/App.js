import Nav from './components/Nav';
import { Outlet, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';

function App() {
  return (
    <>
    {/* 모든 영역을 감싸서 */}
    <AuthContextProvider> 
      <GlobalStyle/>
      <Nav />
      {/* <Route path='/' element = {AllProduct}/> */}
      <AllProduct />
      <Outlet />
    </AuthContextProvider>
      
      {/* Outlet : 상위 경로에서 하위 경로 요소 구성해주는 역할을 한다. index.js에서 children으로 넣은 애들 연결해줄려면 Outlet으로 처리해줘야 한다. 그래야 하위 요소 제대로 연결할 수 있다. */}
    </>
  );
}

export default App;
