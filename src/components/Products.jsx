import React from 'react'
import styled from 'styled-components'
import DetailPageEvent from './DetailPageEvent'

function Products({products}) {
    return (
        <>
            <ProductList className='productList'>
                {/* products -> */}
                {products && products.map((product) =>(
                    <li key={product.id} >
                        <DetailPageEvent product={product}/>
                    </li> //product.id로 productDetail이 아닌 전 단계 디테일 페이지 까지 이동해 줘야 한다.(컴포넌트 전달 -> 컴포넌트 전달)
                ))}
            </ProductList>
        </>
    )
}

export default Products

const ProductList = styled.ul`
    display: flex;
    gap: 20px 5%;
    flex-wrap: wrap;
    li{
        flex-shrink: 0; //줄어들지X
        flex-basis: 30%; //한 화면에 세 개씩
    }
`
