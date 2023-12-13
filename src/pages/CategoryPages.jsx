import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';

function CategoryPages() {
    const {category} = useParams(); //useParams로 클릭한 카테고리의 정보(카테고리명)를 얻음
    
    console.log(category);

    //클릭한 카테고리의 정보 -> 카테고리 명
    return (
        <div>
            {category}
            <CategoryProductList category={category} />
        </div>
    )
}

export default CategoryPages

