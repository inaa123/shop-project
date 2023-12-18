//설치: npm install firebase / yarn add firebase -> package.json에서 firebase 10버전인지 확인
//firebase기능 사용할 수 있다.(설치완료 후)

import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref, remove, set} from 'firebase/database';
import { v4 as uuid} from 'uuid';

const firebaseConfig = { //apiKey, authDomain 같은 이름 바꾸면 안됨(키 값임! 오타 주의(틀리면 다른 키로 인식))
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL,
}
    /*
    process.env는 환경 변수다. node.js의 전역객체다.
    환경변수 : 실행중인 프로세스에 사용할 수 있고, 애플리케이션을 구현하는 키-값으로 이루어진 변수를 말한다.
    외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고, 설정이나 개인정보와 같이 민감한 사용을 매개변수로 분리해서 관리하는 용도로 사용한다.
    process = 현재 node.js의 프로세서의 전역객체로 실행중인 프로세스에 접근해서 정보를 받아오겠다.
    .env = process에서 사용할 수 있는 모든 환경변수를 포함하는 객체다. 뒤의 값은 만들어 둔 키값(변수값)임.
    */

const app = initializeApp(firebaseConfig); //firebase접근할 때마다 자동로그인처럼 기본 세팅값을 
const provider = new GoogleAuthProvider();
const auth = getAuth(); //사용자 정보 가져오겠다.(인증자 인증)
const database = getDatabase(app); //데이터베이스에서 정보를 가져오는 거기 때문에 getDatabase에 config주소(initializeApp(firebaseConfig)를 입력해 줘야 한다.

//구글 자동 로그인 방지
provider.setCustomParameters({
    prompt : 'select_account' // select_account란 이름의 prompt창 띄우겠다. 구글 로그인창 이름?이 select_accout다. -> provider가 들어올때마다 계속 인증받을 수 있게 하겠다.
})

//구글 로그인 function
export async function googleLogin(){
    //try 시도
    try{ //구글로그인 시도하면 구글로그인팝업창 띄우기
        const result = await signInWithPopup(auth, provider); //auth와 provider의 정보를 가져온다.
        const user = result.user; //로그인한 유저 정보 받아옴
        // console.log(user)
        return user;
    }
    catch(error){
        console.error(error);
    }
}

export async function googleLogOut() {
    try{
        await signOut(auth); //auth의 정보들 비워준다. signOut : 기존의 정보들을 초기화하는 hook이다.
    } catch(error){
        console.error(error);
    }
}

//로그인시 새로고침해도 로그인을 계속 유지
export function onUserState(callback){ //콜백값 넘겨줌
    onAuthStateChanged(auth, async(user)=> {
        if(user){
            try{
                // callback(user)
                //user값만 보낼게 아니라 adminUser로 검색?하기 위해 try에 추가해준다.
                const updateUser = await adminUser(user)//adminUser를 한번 실행 한 후 (어드민인지 본다.아니면user만 맞으면 isAdmin추가되서), callback에 updateUser를 출력해준다.
                callback(updateUser) //console.log에 isAdmin이 뜬다.
                
            }catch(error){
                console.error(error);
            }
        }else{
            callback(null)
        }
        
    }) //auth를 받아오고 async user의 값을 받아와서 user가 있으면 callback에 user의 값만 넘기고, catch에러나면 error출력하고, user가 없으면 callback엔 null을
        //Nav에서 추가해줘야 한다.  
    //onAuthStateChanged = 사용자 인증 상태의 변화를 체크하는 hook이다.(로그인, 로그아웃 요소들을 의미)
}



//로그인할때마다 admin인지 계속 검사해줘야한다 -> export할 필요 없음 import할 요소x. 밖으로 내보낼거 아니라, 로그인할때나 onUserState 시 참조만 하도록 할 것
//onUserState할 때 사용 -> onUserState에 추가
async function adminUser(user){ //user의 값을 받아온다. -> user의 값 어디서 받아옴??
    try{
        //데이터베이스에 있는 정보 가져와서 로그인된 정보와 맞춰보기 -> (새로 만드는거면set, 여기선 set아님)
        const snapshot = await get(ref(database, 'admin')) //snapshot = firebase안에 database안에 admin폴더를 검색한다.
        //(snapshot : get으로 가져올 때 데이터베이스 안에 뭐가 있는지 체크한다는 의미를 가진다.)
        
        if(snapshot.exists()){//가져온 admin이란 데이터베이스 안에 데이터가 있으면! exists()가 데이터를 의미 -> 있으면 true
            //snapshot.exists() : snapshot안에 데이터가 있음을 의미한다.
            const admins = snapshot.val(); // admin폴더 안에 있는 데이터들을 검색한다. (admin이 여러 명일 수 있으니 값들 먼저 다 받아 와서 admins에 담아둔다, snapshot의 value 값(데이터 목록)들 검색할 것)
            const isAdmin = admins.includes(user.email);
            //검색된 admins에 현재 로그인된 사용자의 이메일(user.email)과 일치하는 이메일이 있는지 확인한다.

            return {...user, isAdmin} //어드민계정인지 user email과 유저 정보에 isAdmin을 붙여서 전달된다. (...user에 isAdmin을 추가하여 재반환해준다.)
        }
        return user //admin이 아니면 user만 보내면 된다.
    }catch(error){
        console.error(error)
    }
} 

//상품을 database에 업로드
export async function addProducts(product, image){
    //product와 image 따로 받아야함. img경로 다름
    //각 아이템엔 고유의 식별자값이 들어가야함.(순번으로 들어가면 겹쳐서 오류날 확률이 높음 -> 그래서 yarn add uuid 를 설치한다.) 
    // uuid : 식별자를 만들어주는 라이브러리다. 숫자와 영문으로 조합된 식별자 코드를 부여해서 고유값으로 사용하는 라이브러리다.

    const id = uuid();

    //set : 세팅. database안에서
    return set(ref(database, `products/${id}`),{
        ...product,
        id,
        image,
    })
}

// database에 있는 상품을 가져오기
export async function getProducts(){ //매개변수 필요없음 등록해서 서버에 ㅇㅇ하는게 아님.
    /*
    async = 비동기 방식의 데이터 처리 방법이다.(자바스크립트에선 promise를 사용 -> 리액트에서 promise의 단점을 보완한 최신 비동기 처리방식 코드(async와 await)다.)
    */
    //작성할 땐 set, 가져올땐 get
    const snapshot = await get(ref(database, 'products'));// products. 참조
    if(snapshot.exists()){ //snapshot에 값이 있으면? snapshot의 값을 Object로 넘겨준다.
        return Object.values(snapshot.val())
    }else{ //없으면 빈배열을 return한다.
        return []
    }
}

//장바구니 리스트 (업데이트(기존 요소가 달라졌을 시), 상품정보 가져오기, 상품 삭제)
//장바구니 리스트 불러오기(상품 가져오기) : userId를 가져
export async function getCart(userId){
try{
    const snapshot = await get(ref(database, `cart/${userId}`));
    if(snapshot.exists()){
        const item = snapshot.val();
        return Object.values(item);
    }else{
        return []
    }
}catch(error){
    console.error(error);
}
}

//장바구니 업데이트
export async function updateCart(userId, product){ //userId와 product 리스트도 받아온다.
try{
    //카트 : 사용자마다 사용자의id가 있어 userid마다 cart(리스트)를 따로 만들어서 관리. 
    //product.id
    const cartRef = ref(database, `cart/${userId}/${product.id}`);
    await set(cartRef, product);
}catch(error){
    console.error(error);
}
}

//장바구니 목록 삭제
export async function deleteCart(userId, productId){ //userId와 productId받아옴
    return remove(ref(database, `cart/${userId}/${productId}`))
}

//카테고리 상품 가져오기
export async function getCategoryProduct(category){ 
    //get : 가져오기, database안에 있는 products폴더를 가져온다.
    console.log(category)
    return get(ref(database, 'products')).then((snapshot) =>{
        if(snapshot.exists()){
            //카테고리 별로 아이템 나누는 방식은 
            //전체 상품을 먼저 구한 뒤에 필터로 카테고리별로 구분하면된다.
            const allProducts = Object.values(snapshot.val()); //전체 상품, Object의 value들을 snapshot의 val에 담아서 리스트 출력
            const filterProducts = allProducts.filter((product)=>product.category === category); //product의 category와 내가 선택한 category가 같으면

            return filterProducts
        }
        return []; //상품이 없으면 빈 배열 출력
    })
}

//상품 검색
export async function searchProducts(query){ //검색어(query)를 받아온다.
    try{
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef);
        if(snapshot.exists()){
            const data = snapshot.val();
            //모든 리스트 출력후 필터로 걸러줘야 함
            const allProducts = Object.values(data);

            if(allProducts.length === 0){
                return []
            }
            const matchProduct = allProducts.filter((product)=>{
                //작성자명, 내용 등 으로 찾을 지 따라 filter해주면 된다. 상품이름으로 
                const itemTitle = product.title;
                return itemTitle.includes(query)
            })
            return matchProduct;
        }else{
            return []
        }
    }catch(error){
        console.error(error);
    }
}

//데이터베이스에 게시글 업로드(저장)
export async function addBoard(user, date, title, text){
    //글 마다 id부여
    const id = uuid();
    const postData = { //저장(id, 제목, 본문, 날짜, 작성자 등)
        id, //글 id
        //id는 게시글 만들어질 때마다 만들어지고, 나머지는 외부에서 받아와야 함.
        user,
        date,
        title,
        text
    }
    //받아온 정보들 database에 저장해야 한다. ref database에 /board/${id} 폴더에 postData의 값 들어가야 함
    return set(ref(database, `/board/${id}`), postData)
}

//등록된 게시글 가져오기
export async function getBoard(){
    return get(ref(database, 'board')) 
    .then((snapshot)=> {
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return []
    })
}