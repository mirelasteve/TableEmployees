import React from 'react'
import {PaginationUl,PaginationLi,ButtonActive,ButtonInActive} from './pagination.styles';

const Pagination = ({currentPage,maxSize,setCurrentPage,setBeginSlice,setEndSlice,showCurrentData,beginSlice,endSlice,data}) => {
    const numPages = Math.ceil(maxSize / 20);
    
    return (
            
        <PaginationUl>
            <PaginationLi>
                { currentPage > 1 
                    ? <ButtonActive onClick={()=>{
                        setCurrentPage(currentPage-1);
                        setBeginSlice(beginSlice-20);
                        setEndSlice(endSlice-20);
                        showCurrentData(data.slice(beginSlice-20,endSlice-20))
                        }}>Previous</ButtonActive>
                    : <ButtonInActive>Disabled</ButtonInActive>
                }
            </PaginationLi>
            <PaginationLi>Page {currentPage} of {numPages}</PaginationLi>
            <PaginationLi>
                { endSlice <= data.length 
                    ? <ButtonActive onClick={()=>{
                        setCurrentPage(currentPage+1);
                        setBeginSlice(beginSlice+20);
                        setEndSlice(endSlice+20);
                        showCurrentData(data.slice(beginSlice+20,endSlice+20))
                    }}>Next</ButtonActive >
                    :<ButtonInActive>Disabled</ButtonInActive>
                }
            </PaginationLi>
        </PaginationUl>
    )
}

export default Pagination
