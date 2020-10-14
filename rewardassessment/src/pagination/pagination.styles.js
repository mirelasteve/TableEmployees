import styled from 'styled-components';

export const PaginationUl = styled.ul`
    
    background-color: #f6f6f6;
    font-size:1rem;    
    font-weight:bold;
    list-style:none;
    padding-left:30%;
    
    @media (max-width: 768px) {
        font-size:0.6rem;
      }
`

export const PaginationLi = styled.li`
    color:black;
    display:inline;
    margin:2%;
    
`

export const ButtonActive = styled.button`
    background-color: #181818;
    border:none;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    font-size:1rem;
    justify-content: center;
    padding:2% 5%;
    text-align: center;
    &:hover {
        background-color:#585858
    }
    &:focus {
        outline-color:#d8d8d8
    }
    @media (max-width: 768px) {
        font-size:0.6rem;
    }
`

export const ButtonInActive = styled.button`
    background-color: #383838;
    border:none;
    box-shadow: none;
    opacity: .5;
    color: #fff;
    cursor: not-allowed;
    justify-content: center;
    outline-color:#000;
    padding:2% 5%;
    text-align: center;
    font-size:1rem;
    @media (max-width: 768px) {
        font-size:0.6rem;
    }
`