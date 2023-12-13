import React from 'react'

//아이템 따로따로 나오는 컴포넌트(카테고리별 상품 리스트)
function CategoryProductList({category}) { //카테고리명 전달됨
    return (
        <div>
            {category}
        </div>
    )
}

export default CategoryProductList
