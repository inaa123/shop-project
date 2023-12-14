import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';
import { getCategoryProduct } from '../api/firebase';
import CategorySlider from '../components/CategorySlider';

function CategoryPages() {
    const {category} = useParams(); //useParams로 클릭한 카테고리의 정보(카테고리명)를 얻음
    //카테고리가 가지고 있는 상품도 넘겨야 함, 여러개 들어가야 하니 배열로
    const [products, setProducts] = useState([]);
    const [randomImages, setRandomImages] = useState([]);

    //console.log(category);
    //클릭한 카테고리의 정보 -> 카테고리 명

    useEffect(() => {
        getCategoryProduct(category).then((product)=>{
            setProducts(product);
        }).catch((error)=>{
            console.error(error)
        })
    }, [category]) //useEffect는 category가 바뀔 때만 마운트
    // const slideItem = products.map((product)=>product.image)
    // console.log(slideItem)
    
    useEffect(() => {
        if(products.length > 0){
            const randomImg = [...products].sort(()=> 0.5-Math.random())
            // console.log(randomImg)
            const selectImg = randomImg.slice(0,4).map((el)=>el.image)
            setRandomImages(selectImg);
            console.log(randomImages)
        }
    }, [products]) //products일때 한번만 마운트
    /*
    sort 정렬 방식??
    a와b를 비교해서 누가 앞으로 갈 지,
    함수가 0보다 작은 값을 출력하면 a가 앞으로
    함수가 0보다 큰 값이면 b가 앞으로 갈 것이다.

    Math.random() : 0 ~ 1 사이의 무작위 값에
    0.5 에서 Math.random()을 빼서 a,b를 정렬하는 방식이다.

    */

    return (
        <div>
            {category}
            <CategorySlider imgs={randomImages} />
            <CategoryProductList category={category} product={products}/>
            {/*CategoryProductList 실제로 카테고리별 리스트 보여주는 녀석, category,product(는 products를)넘겨줘야 함  */}
        </div>
    )
}

export default CategoryPages

