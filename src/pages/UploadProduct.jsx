//새 제품 올리는 페이지
import React, { useState } from 'react'
import { upLoadImg } from '../api/imgupload';
import { addProducts } from '../api/firebase';

function UploadProduct() {
    const [file, setFile] = useState(null);
    //upload가 잘 되면 success를 이용해서 잘 업로드 됐다고 알려주고, 실패하면 error를 띄우게 할 거임(cloudinary들어가서 확인하지 않고도ㄴ)
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState({
        title : '',
        price : '',
        option : '',
        category : '',
        description : '',
    }) //모든 상품의 상태를 빈 문자열로 초기화할 때 사용한다. (상품 업로드되면 썼던 정보들 없애기 위해 기본 상태값 지정함)
    
    const productInfoChange = (e) => {
        const {name, value, files} = e.target; //e.target.files 이렇게 따로 잡지 않고 하나로 통일한다. 따로잡으면 이벤트?도 다 따로 줘야함
        if(name === 'file' && files &&  files[0]){
            setFile(files[0]) //name이 file이면 setFile로 
        }else{ //아니면 setProduct에 
            setProduct((prev) => ({...prev, [name]:value}))
        }
    }

    //외부와 통신할때 async를ㄹ 써야한다.(지금 imgupload.jsx의 것 가져와야 하니)
    const uploadSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = await upLoadImg(file); //upLoadImg에 file을 넣어 실행해줌
            //firebase에 등록되어야 한다. -> firebase.jsx
            await addProducts(product, url);
            
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className='container'>
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

                <input
                    type='text'
                    name='category'
                    placeholder='상품 분류'
                    value={product.category}
                    onChange={productInfoChange}
                />
                {/* 상품 분류 */}

                <input
                    type='text'
                    name='option'
                    placeholder='상품 옵션을 ,로 구분해서 입력해주세요'
                    value={product.option}
                    onChange={productInfoChange}
                />
                {/* 상품 옵션 */}

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
            </form>
        </div>
    )
}

export default UploadProduct
