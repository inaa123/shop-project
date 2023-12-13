// AuthContext 따로 만든 이유는?
import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, googleLogOut, googleLogin } from "../api/firebase";

const AuthContext = createContext();
//context : 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook이다.
//변수에 새로운 context를 생성해서 초기화해서 사용해야 한다.
//그래서 createContext()는 컨텍스트를 사용하기 위해서 생성하는 요소다.


export function AuthContextProvider({children}){ //AuthContextProvider을 만든다. children을 넘겨서 
    const [user, setUser] = useState(); //user와 setUser를 받아와서 useState에 저장
    const [unSubScribe, setUnSubScribe] = useState();

    useEffect(() => { //useEffect를 실행해서 
        //userChange를 하게되면 newUser라는 변수에 setUser를 새로 담는다.
        const userChange = (newUser) => {
            setUser(newUser)
        }

        const unSubScribeFunc = onUserState(userChange); //onUserState를 실행해서 userChange를 넣는다.
        //위에서 업데이트 된 사용자를 onUserState에 넘긴다.
        setUnSubScribe(() => unSubScribeFunc); // unSubScribeFunc을 실행해서
        return () => {
            if(unSubScribeFunc){ //unSubScribeFunc이면 unSubScribeFunc를 실행한다.
                unSubScribeFunc()
            }
        }
    }, []) //마운트될 때 한 번만

    return (
        <AuthContext.Provider value={{user, googleLogin, googleLogOut, uid:user && user.uid}}>
            {children}
        </AuthContext.Provider>
        // children은 하위 컴포넌트를 의미한다(ex index.js에서 children). 사이트 모든 페이지에서 사용자에 대한 관리 값을 전달해 주기 위해서다. 모든 페이지에서 유저가 인증을 받을 수 있도록 AuthContext란 관리자 전용 값을 만들어 놓은 것이다.(관리자만 관리자 페이지 접근할 수 있게, 관리자 아니면 팅겨냄)
    )
}

export function useAuthContext(){
    return useContext(AuthContext); //useContext에 AuthContext를 담아서 보낸다.
} 
//위의 함수들을 단순화 시켜서 다른 곳에서 참조할 수 있도록 context를 export한다.