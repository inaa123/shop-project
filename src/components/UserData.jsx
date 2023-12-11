import React from 'react'
import styled from 'styled-components'

//받아온 유저의 정보들을 컴포넌트로 출력해주기 위함
function UserData({user}) {//로그인을 했으면 정보를 받아오기 위해 UserData에 {user}를 받아오고, return에 이미지와 이름을 받아온다. user의 키값을 이용해서 필요한 것을 꺼내서 쓸 수 있다.(user.email, user.phoneNumber 등등)
    
    return (
        <UserInfo>
           <img src={user.photoURL} alt={user.displayName}/>
            <span>{user.displayName}</span>
        </UserInfo>
    )
}

export default UserData

const UserInfo = styled.div`
    display : flex;
    align-items: center;
    gap: 6px;
    img{
        width: 36px;
        border-radius: 100%;
    }
`
