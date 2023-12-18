import React, { useEffect, useState } from 'react'
import DetailPageEvent from './DetailPageEvent';
import SortButton from './SortButton';
import PropTypes from 'prop-types';

//아이템 따로따로 나오는 컴포넌트(카테고리별 상품 리스트)
function CategoryProductList({category, product}) { //CategoryPages에서 보낸 category( 카테고리명)와 product 받아 옴. 전달됨
// console.log(product)
    /*
    슬라이더 이미지 출력 방식
    - 카테고리 별로 상품을 다르게 출력(상의: 상의 관련 슬라이드) ->우리가 할 것. 무작위로 이미지 뽑아서 슬라이더 대입할 것!!
    - 전체 페이지에 동일하게 출력(모든 페이지에서 같은 이미지 나오게, 다른 이미지 나오게 할려면 슬라이더 따로 주면 됨)
    */
    const [sortProducts, setSortProducts]  = useState(product); //아이템 넣고 시작.(정렬해야하기 때문)

    //마운트될때마다 정렬 바껴야 함(useEfffect)
    useEffect(()=>{
        setSortProducts(product)
    }, [product]);

    const sortName = () =>{
        const sortList = [...product].sort((a,b)=>{
            if(!a.title || !b.title){
                return 0
                //a,b 둘 중에 하나라도 이름이 정의되지 않았으면 순서를 변경하지 말 것!
            }
            return a.title.localeCompare(b.title)
            //localeCompare : 문자열과 문자열을 서로 비교하고, 정렬 순서에 따라 비교하는 함수다.(이름순정렬)
        })
        setSortProducts(sortList);
    }

    const sortPrice = () => {
        const sortList = [...product].sort((a,b)=>a.price - b.price);
        setSortProducts(sortList);
    }

    console.log(sortProducts)

    return (
        <div className='container'>
            <h2>{category}</h2>
            <SortButton sortName={sortName} sortPrice={sortPrice}/>
            <ul className='productList'>
                {sortProducts.map((product) => (
                    <li key={product.id}>
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

CategoryProductList.propTypes={
    category : PropTypes.string.isRequired,
    product : PropTypes.arrayOf(PropTypes.object).isRequired,

}

export default CategoryProductList
