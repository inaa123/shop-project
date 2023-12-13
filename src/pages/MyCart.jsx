import React from 'react'
import UseCart from '../context/UseCart'
import CartItem from '../components/CartItem';
import styled from 'styled-components';

//로그인시 장바구니 내역 남아있어야 함, 선택한 옵션들이 장바구니에 담겨야 함.
//구매하려는 상품들 리스트 MyCart에 보낼 것.
function MyCart() {
    const {cartInfo : {data : products}} = UseCart();
    const isItem = products && products.length > 0;//data에서 받아온 products(제품의 개수를 받아옴) -> item이 있다.
    return (
        <div className='container'>
            <h2 className='itemTitle'>장바구니 리스트</h2>
            {!isItem && <p>장바구니에 담긴 상품이 없습니다.</p>}
            {isItem && ( //장바구니에 상품이 있으면 출력해준다.
                <CartList className='cartList'>
                    {products && products.map((el, index)=> (
                        <CartItem key={el.id} product={el} index={index}/>//컴포넌트로 전달시켜준다.(CartItem 컴포넌트는 li가 된다.)
                    ))}
                </CartList>
            )}
        </div>
    )
}

export default MyCart

const CartList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-top: solid 1px rgba(0,0,0,0.2);
    padding: 24px 0px;
    li{
        display: flex;
        align-items: center;
        border-bottom: solid 1px rgba(0,0,0,0.2);
        padding: 12px 0px;
        gap: 12px;
        img{
            width: 100px;
            display: block;
        }
    }
    .quantityWrap{
        display:flex;
        gap: 10px;
    }
`
