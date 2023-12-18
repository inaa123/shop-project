import React from 'react'
import PropTypes from 'prop-types'


//yarn add prop-types
function SortButton({sortName, sortPrice}) {
    return (
        <>
        <button onClick={sortName}>이름순</button>
        <button onClick={sortPrice}>가격순</button>
        </>
    )
}

SortButton.propTypes = {
    sortName : PropTypes.func.isRequired,
    sortPrice : PropTypes.func.isRequired,
}

/*
propTypes : 타입에 대한 검증 라이브러리다.(어떤 타입이냐에 따라 정렬이 달라짐, 타입순으로 정렬해줌)
sortName,sortPrice 변수에 isRequired 필수적이다.
*/

export default SortButton
