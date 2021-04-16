import { RFC_2822 } from 'moment';
import React, { useState } from 'react';
import { Typography, Button, Form, Message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone'
import axios from 'axios'


const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    {value:0, label:"Private"},
    {value:1, label:"Public"},
]

const CategoryOptions = [
    {val: 0, label: "Film & Animation"},
    {val: 1, label: "Auto & Vehicles"},
    {val: 2, label: "Music"},
    {val: 3, label: "Pets & Animals"}
]

function VideoUplaodPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const OnDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert('비디오 업로드를 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{ display:"flex", justifyContent:"space-between"}}>
                    {/* Drop Zone */}
                    <Dropzone
                        onDrop={OnDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                    {({getRootProps, getInputProps}) => 
                        <div style={{ width: '300%', height: '240px', border:'2px solid lightgray', display:'flex', margin:'20px',
                    alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <Input {...getInputProps()}/>  
                            <Icon type="plus" style={{ fontSize:'3rem'}} />                      
                        </div>
                    }
                    </Dropzone>
                    {/* Thumnail */}
                    <div>
                        <img src alt/>
                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index)=> (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br/>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUplaodPage
