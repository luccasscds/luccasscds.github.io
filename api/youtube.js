const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
const CHANNEL_ID = "UC1fH5QWhi_-ibr4dwpxJC9g";

export default async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: { message: "Método não permitido." } });
    };

    const apiKey = process.env.ENV_API_KEY_YOUTUBE;
    if (!apiKey) {
        return response.status(500).json({ error: { message: "A variável ENV_API_KEY_YOUTUBE não está configurada no servidor." } });
    };

    const { pageToken = "", maxResults = "12" } = request.query;
    const parsedMaxResults = Number.parseInt(maxResults, 10);
    const resultLimit = Number.isFinite(parsedMaxResults)
        ? Math.min(Math.max(parsedMaxResults, 1), 50)
        : 12;
    const params = new URLSearchParams({
        key: apiKey,
        channelId: CHANNEL_ID,
        type: "video",
        part: "snippet",
        maxResults: String(resultLimit),
        order: "date",
    });

    if (typeof pageToken === "string" && pageToken) params.set("pageToken", pageToken);

    try {
        const youtubeResponse = await fetch(`${YOUTUBE_API_URL}?${params}`);
        const data = await youtubeResponse.json();

        if (!youtubeResponse.ok) {
            const status = youtubeResponse.status >= 400 && youtubeResponse.status < 500
                ? youtubeResponse.status
                : 502;
            return response.status(status).json({
                error: { message: data.error?.message || "Falha ao consultar o YouTube." },
            });
        }

        return response.status(200).json({
            items: (data.items || []).map(({ id, snippet }) => ({
                id: id.videoId,
                title: snippet.title,
                description: snippet.description,
                thumbnailsUrl: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
                publishedAt: snippet.publishedAt,
            })),
            nextPageToken: data.nextPageToken || "",
            totalResults: data.pageInfo?.totalResults || 0,
        });
    } catch {
        return response.status(502).json({ error: { message: "Não foi possível consultar o YouTube." } });
    }
}