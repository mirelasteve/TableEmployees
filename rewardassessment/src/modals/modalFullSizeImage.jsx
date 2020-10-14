import React from 'react'

 const ModalFullSizeImage = ({setImage,avatar}) => {
     
    return (
                <img style={{height:'auto', width:'100%'}}onClick={setImage} src={avatar} alt={avatar}/>
            )
}
export default ModalFullSizeImage