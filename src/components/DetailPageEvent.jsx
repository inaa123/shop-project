import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function DetailPageEvent({product}) { //Products에서 받아온 product

    const colorItem = product.colors;
    /*
    값을 변수에 담아서 사용했을 때와 아닐 때 차이
    장점 : 가독성 차이(변수가 가독성 좋음) , 재사용성에도 장점 
    주의점 : 변수에 담긴 값은 변수에 저장이 된다.
            product.colors의 값이 달라진다면 colorItem의 값은 변동이 없다.
            (product.colors와 colorItem의 값이 달라진다. 별개의 값)->Object의 특징이다.
            Object는 값을 복사하고 끝(값을 공유하지 않음)
    */

    /*
    단순한 페이지의 이동이 목적이라면 Link태그를 사용하면 되지만,
    페이지를 이동하면서 데이터의 이동도 포함해야 한다면 Link대신 useNavigate를 사용해야 한다.(클릭한 요소의 정보값이 필요한 경우라면)
    */

    const navigate = useNavigate();
    const detailNavigate = () => {
        navigate(`/products/detail/${product.id}`, {
            state : {
                title : product.title,
                id : product.id,
                image : product.image,
                price : product.price,
                option : product.option,
                category : product.category,
                colors : product.colors,
                description : product.description
            }//넘기면서 상태값(state), 정보값도 넘길 수 있다.
        })
        
    }
   console.log(product)
    return (
        <DetailItem onClick={detailNavigate}>
            
                <img src={product.image}/>
                <div className='textWrap'>
                    <h3 className='itemTitle'>{product.title}</h3>
                    <div className='itemFlex'>
                        <p className='itemPrice'>{product.price}</p>
                        <p className='itemOpt'>{product.option}</p>
                    </div>
                    <div className='itemColor'>
                        {/* {product.colors} */}
                        {/* 컬러 배열로 출력하기 */}
                        {/* {product.colors && product.colors.map((color, index) => (
                            <div 
                                key={index} 
                                style={{backgroundColor:color}}
                            ></div>
                        ))} */}
                        {colorItem && colorItem.map((color, index) => (
                            <div
                                key={index} 
                                style={{backgroundColor:color}}
                            ></div>
                        ))}
                    </div>
                </div>
            
        </DetailItem>
    )
}

export default DetailPageEvent

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    .textWrap{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .itemTitle{
            font-size: 20px;
            font-weight: normal;
            transition : 500ms;
            color: rgba(0,0,0,0.5);
            &:hover{
                color: rgba(0,0,0,1);
            }
        }
        .itemFlex{
            display: flex;
            justify-content: space-between;
        }
        .itemColor{
            display: flex;
            height: 20px;
            gap: 2px;
            div{
                width: 20px;
                height: 20px;
            }
        }
    }
`