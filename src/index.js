//hook
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

//컴포넌트
import App from './App';
import NotFound from './pages/NotFount';
import MyCart from './pages/MyCart';
import ProductDetail from './pages/ProductDetail';
import UploadProduct from './pages/UploadProduct';
import CategoryPages from './pages/CategoryPages';

//css
import './index.css';
import Search from './pages/Search';
import WriteBoard from './pages/WriteBoard';
import { element } from 'prop-types';
import Qna from './pages/Qna';
import DetailBoard from './pages/DetailBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));

//관리자 인증(조건에 하나라도 만족하지 못하면 페이지를 이동할 수 없게 하고, 강제로 홈으로 이동시킨다.(경고창 띄우지않음))
const ProtectRouter = ({checkAdmin, children}) => {//checkAdmin과 children을 체크한다.
  const { user } = useAuthContext(); //{user}유저에 대한 정보를 받아서 useAuthContex를 불러온다.
  if(!user || (checkAdmin && !user.isAdmin)){ //user가 아니거나 (체크어드민과 user.isAdmin이 없으면 = 관리자가 아닌 경우) 강제로 홈으로 이동
    return <Navigate to='/' replace/>
  }
  return children
}

const routes = createBrowserRouter([
  {
    path : '/',
    element : <App/>, //맨 처음에 App페이지 나오게?
    errorElement : <NotFound/>,

    children : [ //하위요소들
      
      {path : '/cart', element: <MyCart/>},
      {path : '/board/write', element: <WriteBoard/>},
      {path : '/board/qna', element : <Qna/>},
      {path : '/board/qna/:id', element: <DetailBoard/>},
      {path : '/products/detail/:id', element : <ProductDetail/>},
      //상세페이지 : 고유의 아이디 값을 받아, 여기선 아이템 등록할 때마다 아이디를 생성해야 함. -> 그 아이디를 detail페이지에 뿌려야함, id는 고정값X 변동되는 값
      {path : 'products/:category', element : <CategoryPages/>},
      {path : '/search', element : <Search/>},
      {
        path : '/product/upload', 
        element :
        <ProtectRouter checkAdmin>
          <UploadProduct /> 
        </ProtectRouter>

          //UploadProduct에 들어갈 때 ProtectRouter를 실행(checkAdmin을 따지고 실행)
      }, // product/upload경로로 이동하게 되면 <UploadProduct>가 나오도록
    ]
  }
])

root.render(
  <React.StrictMode>
    {/* <App /> -> 이 아니라 Link로 뿌려진애들 넣어줘야함. */}
    {/* Provider는 최상위 요소에 link정보들을 하위요소로 뿌릴려고(index나App(최상위 요소)에서 작성 후 하위요소에 뿌려야함.) */}
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
