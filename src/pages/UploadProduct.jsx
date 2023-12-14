//새 제품 올리는 페이지
import React, { useContext, useRef, useState } from 'react'
import { upLoadImg } from '../api/imgupload';
import { addProducts } from '../api/firebase';
import styled from 'styled-components';
import { CategoryContext } from '../context/CategoryContext';

function UploadProduct() {
    const [file, setFile] = useState(null);
    //upload가 잘 되면 success를 이용해서 잘 업로드 됐다고 알려주고, 실패하면 error를 띄우게 할 거임(cloudinary들어가서 확인하지 않고도ㄴ)
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const fileRef = useRef(); //업로드한 파일명 초기화하려고(돔에 직접접근위해 useRef)
    const {categoryList} = useContext(CategoryContext); //{categoryList는 useContext안 CategoryContext}

    const colors = [
        '#c3cfe2', '#d299c2', '#fef9d7', '#fddb92', '#0ba360', '#accbee', '#8989ba', '#453a94', '#f43b47'
    ]

    const [product, setProduct] = useState({
        title : '',
        price : '',
        option : '',
        category : '',
        description : '',
        colors : [],
    }) //모든 상품의 상태를 빈 문자열로 초기화할 때 사용한다. (상품 업로드되면 썼던 정보들 없애기 위해 기본 상태값 지정함)
    
    const productInfoChange = (e) => {
        const {name, value, files} = e.target; //e.target.files 이렇게 따로 잡지 않고 하나로 통일한다. 따로잡으면 이벤트?도 다 따로 줘야함
        if(name === 'file' && files &&  files[0]){
            setFile(files[0]) //name이 file이면 setFile로 
        }else{ //아니면 setProduct에 
            setProduct((prev) => ({...prev, [name]:value}))
        }
    }

    const colorPicker = (color) => {
        //컬러를 선택했으면 setProduct안에
        setProduct((prev)=>({...prev, colors: prev.colors.includes(color) ? 
            prev.colors : [...prev.colors, color]}))
    }

    const removeColor = (colorRemove) => {
        //setProduct에 내가 선택한 컬러 값을 리스트에서 filter로 걸러내야 한다.
        setProduct((prev)=>({...prev, colors : prev.colors.filter(color => color !== colorRemove)}))
    }

    //외부와 통신할때 async를ㄹ 써야한다.(지금 imgupload.jsx의 것 가져와야 하니)
    const uploadSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = await upLoadImg(file); //upLoadImg에 file을 넣어 실행해줌
            //firebase에 등록되어야 한다. -> firebase.jsx
            await addProducts(product, url);
            setSuccess('업로드가 완료되었습니다.');
            setTimeout(()=>{
                setSuccess(null); //2초후에 setSuccess 메시지
            }, 2000);
            
            setFile(null);
            setProduct({
                title : '',
                price : '',
                option : '',
                category : '',
                description : '',
                colors : []
            });
            //업로드가 다 되고 나면 setFile과 setProduct비워준다. -> 파일선택 옆에 업로드한 파일명 남아있음(이유 : useState는 상태값에만 접근할 수 있고, dom요소엔 접근할 수 없기 때문이다. -> useRef로 하면 없앨 수 있음. const fileRef를 추가해준다.)
            //state값은 dom에 출력되지않는 기본값들(value 등)로만 활용한다. dom에 작성된 값들은 state null로 지울 수 없다 -> useRef로 돔에 직접 접근해야 한다.
            if(fileRef.current){
                //fileRef의 current값이 있으면 current(현재 연결된 객체)의 value를 비워라
                fileRef.current.value = '';
            }
        }catch(error){
            console.error(error);
            setError('업로드에 실패했습니다.')//사용자에게 업로드 실패한거 알려줘야 함.
        }finally{ //최종적으로
            setIsLoading(false); //false로 해서 다시 업로드할 준비로 바껴야 함.
        }
    }

    return (
        <div className='container'>
            <FormContainer>
                <div className='imgUploadWrap'> 
                {/* 이미지 업로드 잘 됐으면 여기에 이미지 출력 */}
                    {file && (
                        <img src={URL.createObjectURL(file)} />
                        //createObjectURL = 받아온 URL주소를 string형태로 변환해준다.
                    )}
                </div>
                <form onSubmit={uploadSubmit}>
                    {/* 이미지 업로드 : 파일 업로드 */}
                    <input 
                        type='file'
                        name='file'
                        accept='image/*'
                        onChange={productInfoChange}
                        ref = {fileRef}
                    />
                    {/* 이미지 업로드 */}

                    <input
                        type='text'
                        name='title'
                        placeholder='상품명을 입력하세요'
                        value={product.title}
                        onChange={productInfoChange}
                    />
                    {/* 상품 제목 */}
                    
                    <input
                        type='text'
                        name='price'
                        placeholder='상품 가격을 입력하세요'
                        value={product.price}
                        onChange={productInfoChange}
                    />
                    {/* 상품 가격 */}

                    {/* <input
                        type='text'
                        name='category'
                        placeholder='상품 분류'
                        value={product.category}
                        onChange={productInfoChange}
                    /> */}
                    {/* <select name='category' value={product.category} onChange={productInfoChange}>
                        <option value=''>분류 선택</option>
                        <option value='top'>상의</option>
                        <option value='bottom'>하의</option>
                        <option value='outer'>아우터</option>
                        <option value='accessory'>악세사리</option>
                        <option value='etc'>기타</option>
                    </select> 수동x */}
                    <select name='category' value={product.category} onChange={productInfoChange}>
                        <option value=''>분류선택</option>
                        {categoryList.map((el, index)=>(
                            <option key={index} value={el}>{el}</option>
                        ))}
                    </select>
                    {/* 상품 분류 */}

                    <input
                        type='text'
                        name='option'
                        placeholder='상품 옵션을 ,로 구분해서 입력해주세요'
                        value={product.option}
                        onChange={productInfoChange}
                    />
                    {/* 상품 옵션 */}
                    <ColorChip>
                        {colors.map((color, index) => (
                            <div className='colorChipItem' 
                                key={index}
                                style={{backgroundColor : color}}
                                onClick={()=>colorPicker(color)}
                                //() => 매개변수 들어갈 때
                            >    
                            </div>
                        ))}
                    </ColorChip>

                    <ColorSelect>
                        {product.colors.map((color, index) => (
                            <div key={index}
                                style={{backgroundColor : color}}>
                                    {color}
                                    <button onClick={()=>removeColor(color)}>X</button>
                            </div>
                        ))}
                    </ColorSelect>
                    <input
                        type='text'
                        name='description'
                        placeholder='상품 설명을 입력하세요'
                        value={product.description}
                        onChange={productInfoChange}
                    />
                    {/* 상품 설명 */}
                    
                    <button disabled={isLoading}>
                        {/* 업로드중이면 버튼 클릭하지 않기 위해 disable로 막는다.(중복등록막기), 버튼이 제품등록하기면 등록할 수 있게 한다.*/}
                        {isLoading ? '업로드 중' : '제품 등록하기'}
                    </button>
                    {/* ?(삼항조건) : 조건이 맞으면 true일때 : false일 때 값 출력, &&:는 false가 없는 것 여기서 success면 <p>태그 출력  */}
                    {/* true-false 이면 ? , 아니면 && */}
                    {success && (
                        <p>{success}</p>
                    )}
                    {error && (
                        <p>{error}</p>
                    )}
                </form>
            </FormContainer>
        </div>
    )
}

export default UploadProduct

const FormContainer = styled.div`
    max-width : 1200px;
    padding: 30px 0px;
    margin: 0px auto;
    display: flex;
    gap: 40px;
    .imgUploadWrap{
        max-width: 500px;
        height: auto;
        img{
            display: block;
            height: 100%;
        }
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        input{
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            border-radius: 4px;
            border-color: rgba(0,0,0,0.2);
            padding : 6px 12px;
        }
        button{
            /* margin-top: 48px; */
            margin-top: auto;
            height: 50px;
            border-radius: 4px;
            background: #c17c74a3;
            border: none;
            &:hover{
                background: #c17c74;
            }
        }
    }
`
const ColorChip = styled.div`
    display:flex;
    gap: 4px;
    flex-wrap : wrap;
    margin-bottom: 10px;
    .colorChipItem{
        width: 20px;
        height: 20px;
        cursor: pointer;
        /* background-color: color; color값을 받아와야 하기 때문에 html태그?에 직접 입력한다. */
    }
`

const ColorSelect = styled.div`
    display : flex;
    gap: 4px;
    flex-wrap: wrap;
    div{
        width: 100px;
        height: 30px;
        color: #ffffff;
        display:flex;
        align-items: center;
        justify-content: center;
    }
`