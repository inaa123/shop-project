//설치: npm install firebase / yarn add firebase? -> package.json에서 firebase 10버전인지 확인
//firebase기능 사용할 수 있다.(설치완료 후)

import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref} from 'firebase/database';


const firebaseConfig = { //이름 바꾸면 안됨(키 값도 오타 주의(틀리면 다른 키로 인식))
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL
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
    const auth = getAuth();
    const database = getDatabase(app); //데이터베이스에서 정보를 가져오는 거기 때문에 config......???????

//구글 자동 로그인 방지
provider.setCustomParameters({
    prompt : 'select_account' //구글 로그인창 이름?이 select_accout??
})

//구글 로그인 function
export async function googleLogin(){
    //try 시도
    try{ //구글로그인 시도하면 구글로그인팝업창 띄우기
        const result = await signInWithPopup(auth, provider); //auth와 provider의
        const user = result.user; //로그인한 유저 정보 받아옴
        //console.log(user)
        return user;
    }
    catch(error){
        console.error(error);
    }
}

export async function googleLogOut() {
    try{
        await signOut(auth); //기존의 정보들을 초기화하는 hook이다.
    } catch(error){
        console.error(error);
    }
}

//로그인시 새로고침해도 로그인을 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=> {
        if(user){
            try{
                // callback(user)
                //user값만 보낼게 아니라 adminUser로 검색?하기 위해 try에 추가해준다.
                const updateUser = await adminUser(user)//adminUser를 한번 실행 한 후 callback에 updateUser를 출력해준다.
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



//로그인할때마다 admin인지 계속 검사해줘야한다 -> export할건아님. 밖으로 내보낼거 아님. 참조만 할 것
async function adminUser(user){ //export하지 않고 userState할 때 adminUser를 사용한다. 
    try{
        //데이터베이스에 있는 정보 가져와서 로그인된 정보와 맞춰보기 -> (새로만드는거면set, 여기선 set아님)
        const snapshot = await get(ref(database, 'admin'))
        //snapshot = firebase안에 database안에 admin폴더를 검색한다.
        
        if(snapshot.exists()){//가져온 admin이란 데이터베이스 안에 데이터가 있으면! exists()가 데이터를 의미 -> 있으면 true
            //snapshot.exists() : snapshot안에 데이터가 있음을 의미한다.
            const admins = snapshot.val(); //admin폴더 안에 있는 데이터들을 검색 (admin이 여러 명일 수 있으니)
            const isAdmin = admins.includes(user.email);
            //검색된 admins에 현재 로그인된 사용자의 이메일(user.email)과 일치하는 이메일이 있는지 확인한다.

            return {...user, isAdmin} //어드민계정인지 user email과 유저 정보에 isAdmin을 붙여서 전달된다.
        }
        return user //admin이 아니면 user만 보내면 된다.
    }catch(error){
        console.error(error)
    }
}
