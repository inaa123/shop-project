import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MainMenu() {
    const {categoryList} = useContext(CategoryContext);
    const [menuName, setMenuName] = useState('');


    // const selectMenu = () => {
    //     setIsClick((prev) => !prev)
    // }


    // const onToggleMenu = (e) => {
    // //     setMenuName((prev) => {
    // //         return e.target.value;
    // //     })
    //     setIsClick((prev) => !prev)
    // }


    return (
        <NavMenu>
            <ul id='menu-container'>
                {categoryList.map((el, index) => (
                    <li key={index} value={el} className={(menuName === el)? 'active' : ''} onClick={()=>setMenuName(el)} >
                        <Link to={`/products/${el}`}>{el}</Link>
                    </li>
                ))}
            </ul>
        </NavMenu>
    )
}

export default MainMenu

const NavMenu = styled.nav`
    ul{
        display: flex;
        gap: 20px;
        li{
            a{
                color: black;
            }
            &.active{
             a{
                color:#c17c74;
             }
            }
        }
        
    }
`

/*
<nav>
<ul>
    {categoryList.map((el, index) => (
        <li key={index} >
            <Link to={`/products/${el}`}>{el}</Link>
        </li>
    ))}
</ul>
</nav>
 */
