import React, { useState } from 'react'
import styled from 'styled-components'
import { addBoard } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

function WriteBoard() {
    const state = useLocation().state; //Qna.jsx addBoard에서 넘겨준 state를 받아온다. // useLocation() :현재 URL 정보 가져오기
    const email = state;
    // console.log(email)
    const [boardTitle, setBoardTitle] = useState('');
    const [boardText, setBoardText] = useState('');
    const navigate = useNavigate();

    const today = new Date();
    const date = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

    //불러올 거 있어서 async로해야함
    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            //firebase에서 만든 addBoard, 넘겨줄 거 많음!
            await addBoard(email, date, boardTitle, boardText);
            navigate('/board/qna')
        }catch(error){
            console.error(error)
        }
    }
    return (
        <BoardContainer className='container'>
            <h2>게시글 작성하기</h2>
            <form onSubmit={onSubmit}>
                <div className='write-box'>
                    <label htmlFor='boardTitle'>제목</label>
                    <input 
                        type='text' 
                        id='boardTitle' 
                        required 
                        value={boardTitle}
                        onChange={(e)=>setBoardTitle(e.target.value)}
                    />
                </div>
                <div className='write-box'>
                    <label htmlFor='boardText'>내용</label>
                    <textarea
                        id='boardText'
                        required
                        value={boardText}
                        onChange={(e)=>setBoardText(e.target.value)}
                    />
                </div>
                <button type="submit" className='submit-btn'>작성하기</button>
                
            </form>
        </BoardContainer>
    )
}

export default WriteBoard

const BoardContainer = styled.div`
    
`
