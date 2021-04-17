import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Row, Col, Card, Icon } from 'antd'
import axios from 'axios'
import moment from 'moment'
const {Title} = Typography
const {Meta} = Card

export default function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    setVideo(response.data.videos)
                } else {
                    alert('loading video failed')
                }
            })
    }, [])


    const renderCard = Video.map((video, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <a href={`/video.post/${video._id}`}>
                    <div style={{ position: 'relative'}}>
                        go to video
                    </div>
                </a>
                <br/>
                <Meta
                    avatar={<Avatar src={video.writer.image}/>}
                    title={video.title}
                    description={video.description}
                    ></Meta>
                    <span>{video.writer.name}</span><br/>
        <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
        )
    })

    return (
        <div style={{ width: "85%", margin: '3rem auto'}}>
            <Title level={2}> Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
        </div>
    )
}