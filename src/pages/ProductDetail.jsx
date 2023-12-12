import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function ProductDetail() {
    //DetaiPageEvent에서 클릭한 요소의 정보를 받아야한다.(Parameter값으로 넘겨줘야 한다.)
    // const {id} = useParams();

    const state= useLocation().state; //useLocation : Navigate에서 받아온 값을 연결하겠다.
    const {id, image, price, option, colors} = state; //받아온 요소들을 state에 담아둔다.
    return (
        <div>
           <img src={image}/>
        </div>
    )
}

export default ProductDetail
