import React, { useEffect, useState } from 'react'
import { searchProducts } from '../api/firebase';
import DetailPageEvent from '../components/DetailPageEvent';
import styled from 'styled-components';

function Search() {
    //검색 -> 데이터베이스 서버에서 찾아서 화면에 출력시켜줌
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]); //결과값, 여러개일수도 있으니 배열로
    useEffect(()=>{
        const fetchProducts = async () => {
            if(query.trim() === ''){
                setResult([])
            }else{
                try{
                    const txt = await searchProducts(query);
                    setResult(txt);
                    console.log(result)
                }
                catch(error){
                    console.error(error)
                }
            }
        }
        fetchProducts()
    },[query])

    const onSearchEvent = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        console.log(query)
    }
    
    return (
        <div className='container'>
            <SearchForm>
            <input type='text' value={query} onChange={onSearchEvent} className='searchForm' placeholder='상품명을 입력하세요.'/>
            <ul className='productList'>
                {result.map((product)=>(
                    <li>
                        <DetailPageEvent key={product.id} product={product}/>
                    </li>
                ))}
            </ul>
            </SearchForm>
        </div>
    )
}

export default Search

const SearchForm = styled.div`
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    .searchForm{
        width: 300px;
        height: 30px;
        border-radius: 10px;
        border: solid 2px;
        border-color: #c17c74;
    }
`