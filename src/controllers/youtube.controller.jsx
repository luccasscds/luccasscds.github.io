import axios from "axios";

export const YouTube = {
    async getVideos({ pageToken = "", maxResults = 12 } = {}) {
        const { data } = await axios.get("/api/youtube", {
            params: { pageToken, maxResults },
        });
        return data;
    },
};