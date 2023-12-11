import React from 'react'
import styled from 'styled-components'

function UserData({user}) {//로그인을 했으면 정보를 받아오기 위해 UserData에 {user}를 받아오고 필요한 것을 꺼내서 쓸 수 있다.(user.어쩌구) return div에 이미지(user.photoURL}와
    //받아온 유저의 정보들을 컴포넌트?로 출력함?
    
    return (
        <UserInfo>
           <img src={user.photoURL} alt={user.displayName}/>  {/* {user}를 받아오고 필요한 것을 꺼내서 쓸 수 있다.(user.어쩌구) -> Nav에서 출력 */}
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
