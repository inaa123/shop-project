import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function TopBtn() {
    const [isVisible, setIsVisible] = useState(false)

    const onScrollTop = () => {
        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        })
    }

    const toggleVisible = () => {
        //스크롤 값이 200보다 많으면 버튼 나오게 하고, 200보다 작으면 버튼 숨김 처리 한다.
        //상태변수 값 필요
        console.log(window.pageYOffset);
        if(window.pageYOffset > 200){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }
        
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {//중첩 이벤트 방지
            window.removeEventListener('scroll',toggleVisible) 
        }
    }, [])

    return (
        isVisible && (
            <Top onClick={onScrollTop} id='top-button'>
            top
            </Top>
        )
        
    )
}

export default TopBtn

const Top = styled.button`
    position : fixed;
    bottom : 30px;
    right : 30px;
    background-color: cadetblue;
    color: white;
` 
