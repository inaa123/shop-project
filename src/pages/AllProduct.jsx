//모든 상품 보여주는 것 (카테고리분류X)
import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/firebase';

function AllProduct() {
    const [product, setProduct] = useState([]);

    //마운트가 되면 리스트를 뽑아줘야함 -> useEffect
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const products = await getProducts();
                setProduct(products); 
            }catch(error){
                console.error(error);
            }
        }
        fetchProducts()
    }, []) //AllProduct는 한 번만 출력하면 됨. 최초 마운트시 한 번만!

    return (
        <div>
            {/* product가 있으면 productmap으로 출력 */}
            {product && product.map(el => (
                <div key={el.id}>
                    {/* <img src={el.image} /> */}
                    <p>{el.title}</p>
                </div>
            ))}
        </div>
    )
}

export default AllProduct
