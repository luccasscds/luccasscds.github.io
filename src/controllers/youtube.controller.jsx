import axios from "axios";

export const YouTube = {
    async getVideo(){
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.append('key', import.meta.env.ENV_API_KEY_YOUTUBE);
        url.searchParams.append('channelId', 'UC1fH5QWhi_-ibr4dwpxJC9g');
        url.searchParams.append('type', 'video');
        url.searchParams.append('part', 'snippet');
        url.searchParams.append('maxResults', '1');
        
        const urlWithParams = url.toString();
        let response = {};
        await axios.get(urlWithParams).then( ({data}) => {
            data;
            const video = data.items[0];
            response = {
                id : video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnailsUrl: video.snippet.thumbnails.high.url,
                date: new Date().toLocaleString()
            };
        }).catch(error => {
            response = error;
        });
    
        return response;
    }
};