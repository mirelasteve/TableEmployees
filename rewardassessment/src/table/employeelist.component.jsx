import React, { useState, useEffect } from 'react';
import ls from 'local-storage';

import {    EmployeeTable,
            IDColumn,
            Avatar,
            NameColumn,
            CompanyColumn,
            BioColumn,
            LabelColumn,
            InfoRow,
            TextNotFound,
            InputAddLabel,
            SetLabelButton,
            SearchInput,
            Container } from './employeeList.styles';

import Pagination from '../pagination/pagination';
import ModalFullSizeImage from '../modals/modalFullSizeImage';




const EmployeeList = ({data}) => {
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ beginSlice, setBeginSlice ] = useState(0);
    const [ endSlice, setEndSlice ] = useState(20);
    const [ currentData, showCurrentData ] = useState(data.slice(beginSlice,endSlice));
    const [ backgroundColors,setBackgroundColors ] = useState({});
    const [currentLabel,setCurrentLabel] = useState('');
    const [ labels, setLabels ] = useState({});
    const [ searchLabelsObj, setSearchLabelObj ] = useState({});
    const [ flagNotFound, setFlagNotFound ] = useState(false);
    const [ flagFullSize, setFlagFullSize ] = useState(Array.from({length:20}).fill(false));
    const [ imageModal, setImageModal ] = useState(false);
    const [ indexAvatar, setIndexAvatar ] = useState('');
    const [ modalAvatar, setModalAvatar ] = useState('');


    useEffect(()=>{
        const getBackgroundColorsLS = async () => {
            const res = await ls.get('backgroundColors');
            
            if(res){
                setBackgroundColors(JSON.parse(res));
            }
        }
        const getBackgroundLabelsLS = async () => {
            const res = await ls.get('labels');
            
            if(res){
                setLabels(JSON.parse(res));
            }
        }
        const getSearchObjLS = async () => {
            const res = await ls.get('searchObj');

            if(res){
                setSearchLabelObj(JSON.parse(res))
            }
        }
        getBackgroundColorsLS();
        getBackgroundLabelsLS();
        getSearchObjLS();
    },[])
    const setBackgroundColorRow = (event,uuid) => {
        
        const newBackgroundColors = {...backgroundColors};
        newBackgroundColors[uuid] =  event.target.value;
        setBackgroundColors(newBackgroundColors);
        ls.set('backgroundColors',JSON.stringify(newBackgroundColors))
    }

    const inputLabel = (event) => {
        setCurrentLabel(event.target.value)
    }
    const setLabel = (event,uuid,avatar,name,company,bio,title) => {
        
        const newLabels = {...labels};
        newLabels[uuid] =  currentLabel;
        setLabels(newLabels);
        ls.set('labels',JSON.stringify(newLabels))
        const newSearchObj = {...searchLabelsObj};
        if( typeof(newSearchObj[currentLabel]) === 'undefined' ){
            newSearchObj[currentLabel] = [{
                uuid:uuid,
                avatar:avatar,
                name:name,
                company:company,
                bio:bio,
                title:title
            }]
        } else {
            newSearchObj[currentLabel].push({
                uuid:uuid,
                avatar:avatar,
                name:name,
                company:company,
                bio:bio,
                title:title
            })
        }
        setSearchLabelObj(newSearchObj);
        ls.set('searchObj',JSON.stringify(newSearchObj))
        
    }

    const searchLabel = (event) => {
        
        if(typeof(event.target.value) === 'undefined'){
        
            setFlagNotFound(false);
            showCurrentData(data.slice(beginSlice-20,endSlice-20));

        } else if(typeof(searchLabelsObj[event.target.value]) === 'undefined'){
        
            setFlagNotFound(true);
            showCurrentData(data.slice(beginSlice,endSlice));

        } else {
        
            showCurrentData(searchLabelsObj[event.target.value])
            setFlagNotFound(false)
        }
        

    }

    const resizeAvatar = (val,index,x) =>{
        const newFlagAvatar = [...flagFullSize];
        newFlagAvatar[index] = val;
        setFlagFullSize(newFlagAvatar)
        
    }
    const showImage = (flag,avatar,index) => {
        
        if(flag){
           setImageModal(true);
           setIndexAvatar(index); 
           setModalAvatar(avatar)
        } else {
           
            return(<img
                  style={{height:'auto',width:'3rem'}}src={avatar} alt={avatar}
                  onClick={()=>resizeAvatar(true,index,flagFullSize[index])}/>
                )
            
        }
    }
    const handleSetImageFalse = () => {
       
        setImageModal(false);
        resizeAvatar(false,indexAvatar);
    
    }
    return(
        <>
        {imageModal
        ? <ModalFullSizeImage setImage={handleSetImageFalse} avatar={modalAvatar}></ModalFullSizeImage>
        : <Container>
        
            <Pagination 
                currentPage = {currentPage} 
                maxSize = {data.length} 
                setCurrentPage={setCurrentPage}
                setBeginSlice={setBeginSlice}
                setEndSlice={setEndSlice}
                showCurrentData={showCurrentData}   
                beginSlice={beginSlice}
                endSlice={endSlice}
                data={data}
            />

            <SearchInput type='search' onInput={(e)=>searchLabel(e)} onClick={()=>setFlagNotFound(false)} placeholder='Search ...'/>

            {flagNotFound 
                ? <TextNotFound onClick={()=>setFlagNotFound(false)}>Cannot find</TextNotFound>
                : <span></span>
            }
            <EmployeeTable>
                <thead style={{'fontWeight':'bold'}}>
                    <tr>
                        <td>Index</td>
                        <td></td>
                        <td>ID</td>
                        <td>Avatar</td>
                        <td>Name</td>
                        <td>Company</td>
                        <td>Bio</td>
                        <td>Title</td>
                        <td>Label</td>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map(({uuid,avatar,name,company,bio,title},index)=>
                    <InfoRow key={uuid} backgroundColor={backgroundColors[uuid]} index={index}>

                        <td>{index+1}</td>
                        <td><input type='color' onChange={(e)=>setBackgroundColorRow(e,uuid)}></input></td>
                        <IDColumn>{uuid}</IDColumn>
                        <Avatar>
                            {showImage(flagFullSize[index],avatar,index)}
                        </Avatar>
                        <NameColumn>{name}</NameColumn>
                        <CompanyColumn>{company}</CompanyColumn>
                        <BioColumn>{bio}</BioColumn>
                        <td>{title}</td>
                        <td>
                            {labels[uuid]
                            ? <LabelColumn>{labels[uuid]}</LabelColumn>
                            : <>
                                <InputAddLabel type='text' title='Set Label' onInput={(e)=>inputLabel(e)} placeholder='Add label' />
                                <SetLabelButton onClick={(e)=>setLabel(e,uuid,avatar,name,company,bio,title)}>Set</SetLabelButton>
                              </>
                            }
                        </td>
                    </InfoRow>
                    )}
                </tbody>
            </EmployeeTable>
        </Container>
        
        }</>
    )
}

export default EmployeeList