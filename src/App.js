import Nav from './components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopBtn from './components/TopBtn';

const queryClient = new QueryClient(); //QueryClient를 새로 생성
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* 모든 경로에서 AuthContextProvider가 인증받을 수 있도록 전체를 감싸준다.*/}
        <AuthContextProvider> 
          <GlobalStyle/>
          <Nav />

          <Routes>
            <Route path='/' element = {<AllProduct/>}/>{/* '/'경로일 때만 AllProduct 보이게*/}
          </Routes>

          <TopBtn/>
          <Outlet />
        </AuthContextProvider>
          {/* Outlet : 상위 경로에서 하위 경로 요소 구성해주는 역할을 한다. index.js에서 children(하위요소)으로 넣은 애들 연결해줄려면 Outlet으로 처리해줘야 한다. 그래야 하위 요소 제대로 연결할 수 있다. */}
      </QueryClientProvider>
    </>
  );
}

export default App;
