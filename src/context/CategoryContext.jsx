//메뉴 풀어주는 방식

import { createContext } from "react";

export const CategoryContext = createContext({
    categoryList : ['top', 'bottom', 'outer', 'bag', 'accessory', 'etc'] //카테고리 목록들 불러오기
}); 