import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase'
import UserData from './UserData';
import { FaPen } from "react-icons/fa";


function Nav() {
    const [user, setUser] = useState(); 
    //유저는 계속 바뀜

    const login = () => {
        googleLogin().then(setUser); //여기서 googleLogin이 api/firebase에 있는 googleLogin, setUser를
    }

    const logout = () => {
        //googleLogout을 불러와서 then setUser의 값을 넣어준다. -> 
        googleLogOut().then(setUser);
    }

    useEffect(()=>{
        //user의 값을 담아서 setUser에 user의 값을 담아 준다. ([] : 최초 마운트 시에만)
        onUserState((user) => {
            setUser(user);
        })
    },[])

    console.log(user)
    //관리자 지정 : 수동으로 만들어 줘야 한다.(데이터베이스 접근해서)

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop </Link> {/*Link로 로고만들*/}</h1>

            {/*로그인버튼 -> 로그인 할 수 있도록, login버튼 누르면 로그인 실행되게(구글 로그인 창 불러오기)*/}
            <div className='userWrap'>
                {user && user.isAdmin && 
                    (<Link to='/product/upload' className='uploadLink'><FaPen /></Link>)
                } {/*조건문에서 ()넣는이유는 보통 true와 false에 따라 값을 넣기 위함. 여기선 false값은 생각 안하기 때문에 안넣어도 된다. */} {/*관리자가 아니면 업로드 버튼이 뜨지 않지만 경로를 알고 있으면 관리자가 아닌 유저도 관리자페이지에 들어갈 수 있음 ->강제로 경로 이동하려 하면? index에서 지정해준다. */}

                {user ? ( //user가 있으면
                    <>
                        <UserData user={user}/> {/*user가 있으면 UserData를 불러온다.user엔 user값을 */}
                        <button className='logoutBtn' onClick={logout}>logout</button>{/*user가 있으면 logout버튼 */}
                    </>
                ) : (
                    <button className='loginBtn' onClick={login}>login</button>
                    //!user:false, user가 없으면 로그인버튼 -> 새로고침하면(새로 마운트됐기 때문에)로그인이 풀림.(유지하도록 하는 요소 추가해야 함 firbase에서 onUserState를만들 )
                )}
                {/* 
                {user && <UserData user={user}/>} 
                {!user && <button className='loginBtn' onClick={login}>login</button>} 
                {user && <button className='logoutBtn' onClick={logout}>logout</button>}  */}
            </div>
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
                background: pink;
            }
            &.logoutBtn{
                background: gray;
            }
        }
        .uploadLink{
            color: black;
        }
    }
`
