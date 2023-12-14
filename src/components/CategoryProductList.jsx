import React from 'react'
import DetailPageEvent from './DetailPageEvent';
//아이템 따로따로 나오는 컴포넌트(카테고리별 상품 리스트)
function CategoryProductList({category, product}) { //CategoryPages에서 보낸 category( 카테고리명)와 product 받아 옴. 전달됨
// console.log(product)
    /*
    슬라이더 이미지 출력 방식
    - 카테고리 별로 상품을 다르게 출력(상의: 상의 관련 슬라이드) ->우리가 할 것. 무작위로 이미지 뽑아서 슬라이더 대입할 것!!
    - 전체 페이지에 동일하게 출력(모든 페이지에서 같은 이미지 나오게, 다른 이미지 나오게 할려면 슬라이더 따로 주면 됨)
    */


    
    return (
        <div className='container'>
            <h2>{category}</h2>
            
            <ul className='productList'>
                {product.map((product) => (
                    <li key={product.id}>
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryProductList
