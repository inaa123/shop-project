import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';
import UseCart from '../context/UseCart';
import ProductReview from '../components/ProductReview';

function ProductDetail() {
    //DetaiPageEvent에서 클릭한 요소의 정보를 받아야한다.(Parameter값으로 넘겨줘야 한다.)
    // const {id} = useParams();

    const {addItemCart} = UseCart();
    const state= useLocation().state; //useLocation : Navigate에서 받아온 값을 연결하겠다.
    const {id, image, price, option, colors, title, description, category} = state; //받아온 요소들을 state에 담아둔다.
    //console.log({option}) //{option: 'S,M,L,XL'} -> ,를 기준으로 쪼개서 배열로 담는다.
    const setOpt = option.split(',').map((option) => option.trim())
    //console.log(setOpt) //['S', 'M', 'L', 'XL'] : 배열로 나온다.
    const [selected , setSelected] = useState(setOpt && setOpt[0]) //기본값 setOpt의 첫번째 요소를 선택하게
    const [success, setSuccess] = useState('');//장바구니 아이템 전송 여부 값을 담기 위한 state변수,
    //장바구니 담겼다 = firebase에도 내역이 전송되어야 함. -> firebase

    //console.log(selected)
    const selectOpt = (e) => {
        //console.log(selected)
        setSelected(e.target.value)
    }

    const cartItem = () => {
        // {}안에 어떤 값을 보낼지 - >option만 적으면 option다 넘어가니까 selected된 option만 넘긴다.
        const product = {id, image, title, price, option:selected, quantity : 1} //quantity는 수량(기본값1)

        addItemCart.mutate(product, {
            onSuccess : () => {
                setSuccess('장바구니에 아이템이 추가되었습니다.')
                
                setTimeout(()=>{
                    setSuccess('')
                }, 2000)
            }
        })
    }

    return (
        <div className='container'>
            <DetailPage>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>
                <div className='detailText'>
                    <h3>{title}</h3>
                    <p className='price'>가격 <span>{price}</span></p>
                    <p className='description'>{description}</p>

                    <div className='detailOpt'>
                        {/* 리액트에서는 label의 for대신 htmlFor로 변경하여 사용한다. */}
                        <label className='labelText' htmlFor='optSelect'>사이즈</label>
                        <select id='optSelect' onChange={selectOpt} value={selected}>
                            {/* option의 개수만큼 option으로 출력해준다. */}
                            {setOpt && setOpt.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                // option에서 선택한 값 저장하려면 value와 onChange이벤트 필요
                            ))}
                        </select>
                        {/* value = {selected} : selected된 애들 선택되게 */}
                    </div>
                </div>
                <div className='detailBtns'>
                    <button className='cartBtn' onClick={cartItem}>장바구니 담기</button>
                    <button className='buyBtn'>구매하기</button>
                </div>
                {success && <p>{success}</p>}
            </DetailPage>
            <ProductReview productId={id}/>
        </div>
    )
}

export default ProductDetail

const DetailPage = styled.div`
    width: 100%;
    display: flex;
    gap: 60px;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        h3{
            font-size: 24px;
            width: 100%;
            font-weight: normal;
            border-bottom: solid 1px rgba(0,0,0,0.1);
            padding-bottom: 20px;
        }
        .price{
            display: flex;
            gap: 30px;
        }
        .description{

        }
    }
`
