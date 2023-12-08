// AuthContext 따로 만든 이유는?
import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, googleLogOut, googleLogin } from "../api/firebase";

const AuthContext = createContext();
//context : 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook이다.
//변수에 새로운 context를 생성해서 초기화해서 사용해야 한다. 그래서 createContext()
//그래서 createContext()는 컨텍스트를 사용하기 위해서 생성하기 위함이다.

//AuthContextProvider을 만든다. children을 넘겨서 , const
export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();

    useEffect(() => {
        //userChange를 하게되면 newUser라는 변수에 
        const userChange = (newUser) => {
            setUser(newUser)
        }

        const unSubScribeFunc = onUserState(userChange);
        //위에서 업데이트 된 사용자를 onUserState에 넘긴다.
        setUnSubScribe(() => unSubScribeFunc); // unSubScribeFunc을 실행해서
        return () => {
            if(unSubScribeFunc){
                unSubScribeFunc()
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, googleLogin, googleLogOut}}>
            {children}
            {/* children은 하위 컴포넌트를 의미한다. 사이트 모든 페이지에서 유저가 인증을 받을 수 있도록? AuthContext란 관리자 전용을 만든것.?? */}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
} //위의 함수들을 단순화 시켜서 다른 곳에서 참조할 수 있도록 context를 export한다.