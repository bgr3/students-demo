import { checkVideos } from "../../validation/check-videos";
import { VideoPostType, VideoPutType } from "../../types/video-types";


const videos: any = [];

export const videosRepository = {
    testAllData () {
        videos.splice(0)
    },

    findVideos () {
        return videos
    },

    findVideoByID (id: number) {
        
        let video = videos.find((i: {id: number}) => i.id === id);
        
        if (video){
            return video
        } else {
            return false
        }
        
    },

    createVideo (body: VideoPostType) {
        if (checkVideos(body).check){
            const date = new Date()
            const newVideo = {
                id: videos.length > 0 ? videos[videos.length - 1].id + 1 : 1, 
                title: body.title.trim(),
                author: body.author.trim(),
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: date.toISOString(),
                publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
                availableResolutions: body.availableResolutions,
            };
            videos.push(newVideo);
            return newVideo.id
        } else {
            return false
        }
    },

    updateVideo (id: number, body: VideoPutType) {
        let video = videos.find((i: {id: number}) => i.id === id);
        if (checkVideos(body).check) {
            video.title = body.title.trim();
            video.author = body.author.trim();
            video.canBeDownloaded = body.canBeDownloaded;
            video.minAgeRestriction = body.minAgeRestriction;
            video.publicationDate = body.publicationDate;
            video.availableResolutions = body.availableResolutions;
            return true
        } else { 
            return false
        }
    },

    deleteVideo (id: number) {
        for (let i = 0; i < videos.length; i++){
            if (videos[i].id === id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    }
}