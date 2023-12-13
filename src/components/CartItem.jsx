import React from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import UseCart from '../context/UseCart';

function CartItem({product, index}) {
    const {addItemCart, removeCart} = UseCart(); //useCart에서 addItemCart와 removeCart를 불러온다.

    const plusItem = () => {
        //addItemCart를 불러와서 새로 업데이트 해준다.(값을 적용해서 배열에 새로 추가하는 방식)
        addItemCart.mutate({...product, quantity : product.quantity + 1})
    }

    const minusItem = () => {
        //조건 : 제품 최소수량은 1
        if(product.quantity < 2) {
            alert('상품 갯수는 1보다 적을 순 없습니다.')
            return //2보다 적어지면 minustItem함수를 빠져나감(아래의 addItemCart를 안 만나게 하기 위함)
        }
        addItemCart.mutate({...product, quantity : product.quantity - 1})
    }

    const itemDelete = () => {
        removeCart.mutate(product.id);
    }
    /*
    mutation과 dispatch의 사이
    matation은 useMutation에서 비동기 작업을 실행하며,  데이터를 생성,추가,업데이트,삭제와 같이 데이터를 '변경'하는 작업에서 사용한다.

    dispatch는 redux에서 action을 내보내는 데 사용하는 함수다. action은 type을 포함한다.
    action을 받아서 store에 전달하는 역할을 한다.
    reducer에서는 action을 받아서 현재 상태에서 새로운 상태로 변경
    주로 테마변경과 같은 UI의 상태 변경에 자주 쓰인다.(테마변경, 로그인상태같은 요소에서 dispatch를 많이 사용한다.)

    차이점:
    mutattion은 주로 외부에 있는 데이터의 이용에 사용되며, dispatch는 앱 내부에서 상태 관리를 할 때 쓰인다.
    */

    return (
        <li>
            <p>{index}</p>
            <img src={product.image} alt={product.title}/>
            <p>{product.title}</p>
            <p>{product.option}</p>
            <p>{product.price}</p>
            <div className='quantityWrap'>
                <p>수량 : {product.quantity}</p>
                <button onClick={plusItem}><IoMdArrowDropup /></button>
                <button onClick={minusItem}><IoMdArrowDropdown /></button>
            </div>
            <button onClick={()=>itemDelete(product.id)}>삭제</button>
            {/* product의 id를 넘겨서 */}
        </li>
    )
}

export default CartItem
