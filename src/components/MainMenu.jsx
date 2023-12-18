import React, { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MainMenu() {
    const {categoryList} = useContext(CategoryContext);

    return (
        <NavMenu>
            <ul>
                {categoryList.map((el, index) => (
                    <li key={index}>
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
                &:hover{
            
                     color:#c17c74;
         
                }
            }
        }
        
    }
`
