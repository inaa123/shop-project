//

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {useAuthContext} from './AuthContext';
import { deleteCart, getCart, updateCart } from '../api/firebase';

//default : useCart를 가져올 때 기본값만 가져온다.(앱이나 컴포넌트에선 default를 쓰지만, firebase같이 여러ㄱ개가 있는 경우 default를 쓰면 가져오지 못할 수 있기 때문에 쓰지 안혹, 여기서는 useCart함수 하나만 만들거기 때문에 default를 써도됨)
export default function UseCart(){
    const {uid} = useAuthContext();

    //useQueryClient : 리액트에서 데이터를 가져오고 업데이트를 하는 라이브러리다.
    //설치 yarn add @tanstack/react-query
    const queryClient = useQueryClient(); //useQueryClient로 초기화해서? 사용?

    // const cartInfo = useQuery(['cart', uid || ''], () => getCart(uid), { -> useQuery 일반함수구문으로 써서 에러가 남. Object형식으로 
    //     enabled : !!uid
    // }) 

    const cartInfo = useQuery({ //useQuery : cart의 데이터를 가져오는 비동기 쿼리를 설정하는 구문이다.
        queryKey : ['cart', uid || ''], //queryKey는 쿼리를 식별하는 키. 
        queryFn : () =>getCart(uid), //데이터를 가져오는 함수
        enabled: !!uid //쿼리가 활성화 되어야 하는지의 여부(!!uid는 uid가 있는 경우에만 활성화를 한다.)
    })

    const addItemCart = useMutation({ //useMutation : 장바구니에 상품을 추가하는 업데이트를 작업하는 구문이다.
    //mutation : 정보를 업데이트할 때 사용하는 구문
        mutationFn : (product) => updateCart(uid, product), //데이터를 업데이트하는 함수
        onSuccess : () => { //onSuccess : 완료가 되고 난 후 실행
            queryClient.invalidateQueries(['cart',uid]) 
            //최신 상태로 업데이트 해준다.(기존에 가지고 있는 쿠키값을 무효화 시켜 상품의 정보를 최신으로 업데이트해줌.)
        }
    })

    //클릭한 아이템만 삭제하기
    const removeCart = useMutation({
        mutationFn : (id) => deleteCart(uid, id),
        onSuccess : () => {
            queryClient.invalidateQueries(['cart', uid])
        }
    })

    return {cartInfo, addItemCart, removeCart}; //cartInfo와 addItemCart, removeCart 밖에서 사용하기 위해 return문으로 내보내준다.
}