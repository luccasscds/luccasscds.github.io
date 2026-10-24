import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
const CHANNEL_ID = "UC1fH5QWhi_-ibr4dwpxJC9g";

export const YouTube = {
    async getVideos({ pageToken = "", maxResults = 12 } = {}) {
        const params = {
            key: import.meta.env.ENV_API_KEY_YOUTUBE,
            channelId: CHANNEL_ID,
            type: "video",
            part: "snippet",
            maxResults,
            order: "date",
        };

        if (pageToken) params.pageToken = pageToken;

        const { data } = await axios.get(YOUTUBE_API_URL, { params });
        return {
            items: (data.items || []).map(({ id, snippet }) => ({
                id: id.videoId,
                title: snippet.title,
                description: snippet.description,
                thumbnailsUrl: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
                publishedAt: snippet.publishedAt,
            })),
            nextPageToken: data.nextPageToken || "",
            totalResults: data.pageInfo?.totalResults || 0,
        };
    },
};