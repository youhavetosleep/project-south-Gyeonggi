import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'

import styled  from 'styled-components';

import Swal from 'sweetalert2';
import { BsUpload } from 'react-icons/bs'
import { RiDeleteBinFill } from 'react-icons/ri'

const MainImgsComponent = ({postInfo, setPostInfo}) => {
  const [imgUrl, setImgUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState([])
  const {
    title,
    introduction,
    category,
    requiredTime,
    contents,
    mainImg,
    contentImgs,
    ingredients
  } = postInfo

  const onImgDrop = async(e) => {
    console.log(e.target.files)
    const newFile = e.target.files[0];
    
    const form = new FormData()
        form.append("file", )
        form.append("upload_preset", "mainfolder")
        form.append('name', "hi")
      
       await axios.post('https://api.cloudinary.com/v1_1/dlkl7penh/image/upload',form)
        .then(res=>{
            console.log(5, res)
            setImgUrl(res.data.url);
        })
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => {
          setPreviewUrl([...previewUrl, reader.result])
        };

    console.log(3, form)
    if (newFile) {
      setPostInfo({ ...postInfo, mainImg: newFile});
    }
  }
  
  const imgRemove = (img) => {
    setPostInfo({...postInfo, mainImg:''});
    console.log(img)
        
  }

  return (
    <>
    <ImgInput>
              <div className='label'>
                <BsUpload />  
                <p>Drag & Drop</p>
              </div>
              <input type='file' name='image' encType='multipart/form-data' onChange={onImgDrop}/>
            </ImgInput>
            {
              mainImg ? (
                <div className="preview">
                  <p className="title">
                    선택파일 목록
                  </p>
                  <LoadedList>
                    <img src="" alt="" />
                      <div className="info">
                        <p>{mainImg.name}</p>
                      </div>
                      <span className="delete" onClick={() => imgRemove(mainImg)}>
                        <RiDeleteBinFill className='icon'/>
                      </span>
                        </LoadedList>                  
                </div>
              ) : null
          }
          </>
  )
}

const ImgInput = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  border: 2px dashed rgb(243, 200, 18);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(247, 245, 238);

  input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  }

  :hover {
  opacity: 0.6;
  background-color:rgb(110, 174, 233);
  }
  .label {
  text-align: center;
  color: rgb(67, 70, 73);
  font-weight: 600;
  padding: 10px;
}
.preview {
  background-color: rgb(92, 120, 146);
}

.preview p {
  font-weight: 500;
}

.title {
  margin-bottom: 20px;
}
`

const LoadedList = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  background-color: #857d7d2f;
  padding: 15px;
  border-radius: 20px;

  .img {
    width: 50px;
    margin-right: 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .delete {
    background-color: rgb(110, 174, 233);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    margin-top: 7px;
  
  }
  .delete:hover {
    background-color: rgba(202, 35, 35, 0.685);
    box-shadow: 3px;
    cursor: pointer;
    transition: 0.3s ease;
  }
`


export default MainImgsComponent
