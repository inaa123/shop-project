import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase'
import UserData from './UserData';
import { FaPen } from "react-icons/fa";
import MainMenu from './MainMenu';


function Nav() {
    const [user, setUser] = useState(); //유저는 계속 바뀜(user, setUser를 usestate값으로 관리)
    const [menuName, setMenuName] = useState('');

    const login = () => {
        googleLogin().then(setUser); //여기서 googleLogin은 api/firebase에 있는 googleLogin, setUser의 값을 새로 담는다.
        
    }

    const logout = () => {
        //googleLogout을 불러와서 then, setUser의 값을 넣어준다. 
        googleLogOut().then(setUser);
    }

    useEffect(()=>{
        //user의 값을 담아서 setUser에 user의 값을 담아 준다. ([] : 최초 마운트 시에만)
        onUserState((user) => {
            setUser(user);
        })
    },[])
    console.log(user); //isAdmin = true
    //관리자 지정 : 수동으로 만들어 줘야 한다.(데이터베이스 접근해서)

    // const selectMenu = (e) => {
    //     return setMenuName(e.target.value)
    // }

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop </Link> {/*Link로 로고만들*/}</h1>
            <MainMenu/>
            <Link to='/board/qna' value='qna' className={menuName === 'qna' ? 'active' : ''} onClick={()=>setMenuName('qna')}>QnA</Link>

            {/*로그인버튼 -> 로그인 할 수 있도록, login버튼 누르면 로그인 실행되게(구글 로그인 창 불러오기)*/}
            <div className='userWrap'>
                <Link to='/search' value='search' className={menuName === 'search' ? 'active' : ''} onClick={()=>setMenuName('search')}>검색</Link>
                {/* <Link to='/product/upload'></Link> */}
                {user && user.isAdmin && 
                    <Link to='/product/upload' className='uploadLink' value='upload' ><FaPen /></Link>
                }
                {user ? ( //user가 있으면
                    <>
                        <UserData user={user}/> {/*user가 있을 때만 UserData를 불러오고, 받아 오는 정보 user는 {user}의 값을 넘겨준다. (user 없으면 undefined출력될 것) */}
                        <button className='logoutBtn' onClick={logout}>logout</button>{/*user가 있으면 logout버튼 */}
                    </>
                ) : (
                    <button className='loginBtn' onClick={login}>login</button>
                    //!user:false, user가 없으면 로그인버튼 -> 새로고침하면(새로 마운트됐기 때문에)로그인이 풀림.(유지하도록 하는 요소 추가해야 함 firbase에서 onUserState를만들 )
                )}
            </div>
             {/*조건문에서 ()넣는이유는 보통 true와 false에 따라 값을 넣기 위함. 여기선 false값은 생각 안하기 때문에 안넣어도 된다. */} 
             {/*관리자가 아니면 업로드 버튼이 뜨지 않지만 경로를 알고 있으면 관리자가 아닌 유저도 관리자 페이지에 들어갈 수 있음 ->강제로 경로 이동하려 하면 index에서 지정해준다. */}
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header` //header에다 만든다.
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    border-bottom: solid 1px rgba(0,0,0,0.1);

    .userWrap{
        display: flex;
        margin-left: auto; //오른쪽으로 밀어넣기
        align-items: center;
        gap: 12px;
        button{
            padding: 6px 12px;
            border-radius: 6px;
            &.loginBtn{
                background: #c69f9a;
            }
            &.logoutBtn{
                background: #c17c74;
            }
        }
        .uploadLink{
            color: black;
        }
    }

    a{
        color: black;
        &.active{
            color : #c17c74;
        }
    }
`
