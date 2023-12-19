import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBoard, onUserState } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import BoardListItem from '../components/BoardListItem';
import styled from 'styled-components';

function Qna() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    /*useNavigate와 Link로 이동할 때 차이
        왜 버튼에 함수로 해서 작성자 전달하기 위함
        Link는 페이지만 이동할 수 있고 데이터는 넘어가지X
        useNavigate 를 이용해야지 데이터도 넘어감
        */
    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    })
    const onWriteEvent = () => {
        navigate(`/board/write`, {state : {email : user.email}}) //board/write페이지로 이동하고 데이터도 넘겨준다.(state : 식별할 수 있는 걸로(여기선 이메일로!))

    }
    const {data : board, isLoading, iseError} = useQuery({
        queryKey : 'board',
        queryFn : getBoard
    })

    //console.log(user)

    return (
        <QnaContainer className='container'>
            <div className='board-top'>
                <h2>QnA 게시판</h2>
                { user && user.isAdmin && (
                    <button className='writeBtn' onClick={onWriteEvent}>작성하기</button>
                )}
                
            </div>

            <ul className='boardList'>
                {board && board.map((el)=>(
                    <BoardListItem key={el.id} post={el}/>
                ))}
            </ul>
        </QnaContainer>
    )
}

export default Qna

const QnaContainer = styled.div`
    .board-top{
        display: flex;
        
    }
    .boardList{
        li{
            display: flex;
            gap: 10px;
            border-bottom: solid 1px black;
        }
    }
`
