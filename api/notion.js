const NOTION_API_URL = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const NOTION_MARKDOWN_VERSION = "2025-09-03";
const POSTS_PER_PAGE = 10;
const NOTION_DATABASE_ID = "e0223b3b-8b8f-8266-95f6-01113571fe6c";

async function notionRequest(path, token, options = {}) {
    const result = await fetch(`${NOTION_API_URL}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Notion-Version": NOTION_VERSION,
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });
    const data = await result.json();
    if (!result.ok) {
        const error = new Error(data.message || "Falha ao consultar o Notion.");
        error.status = result.status;
        throw error;
    }
    return data;
}

function getTitle(page) {
    const property = Object.values(page.properties || {}).find((item) => item.type === "title");
    return property?.title?.map((item) => item.plain_text).join("") || "Sem título";
}

async function queryDatabase(token, startCursor = "", searchTerm = "") {
    const body = {
        page_size: POSTS_PER_PAGE,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
    };
    if (startCursor) body.start_cursor = startCursor;
    if (searchTerm) {
        body.filter = {
            property: "title",
            title: { contains: searchTerm },
        };
    }
    const data = await notionRequest(`/databases/${NOTION_DATABASE_ID}/query`, token, {
        method: "POST",
        body: JSON.stringify(body),
    });

    return {
        posts: (data.results || []).map((page) => ({
            id: page.id,
            title: getTitle(page),
            url: page.url,
        })),
        nextCursor: data.has_more ? data.next_cursor : null,
    };
}

export default async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Método não permitido." });
    }

    const token = process.env.NOTION_API_KEY;
    if (!token) {
        return response.status(500).json({ error: "Configure NOTION_API_KEY nas variáveis de ambiente." });
    }

    try {
        const postId = typeof request.query.postId === "string" ? request.query.postId : "";
        const cursor = typeof request.query.cursor === "string" ? request.query.cursor : "";
        const searchTerm = typeof request.query.q === "string" ? request.query.q.trim() : "";
        if (postId && !/^[a-f0-9-]{32,36}$/i.test(postId)) {
            return response.status(400).json({ error: "ID de post inválido." });
        }
        response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

        if (postId) {
            const page = await notionRequest(`/pages/${postId}`, token);
            if (page.parent?.type !== "database_id" || page.parent.database_id !== NOTION_DATABASE_ID) {
                return response.status(404).json({ error: "Post não encontrado nessa database." });
            }
            const content = await notionRequest(`/pages/${postId}/markdown`, token, {
                headers: { "Notion-Version": NOTION_MARKDOWN_VERSION },
            });
            return response.status(200).json({
                title: getTitle(page),
                markdown: content.markdown || "",
            });
        }

        if (cursor) {
            return response.status(200).json(await queryDatabase(token, cursor, searchTerm));
        }

        const result = await queryDatabase(token, "", searchTerm);
        return response.status(200).json({
            posts: result.posts,
            nextCursors: result.nextCursor ? [{ nextCursor: result.nextCursor }] : [],
        });
    } catch (error) {
        const status = error.status >= 400 && error.status < 500 ? error.status : 502;
        return response.status(status).json({ error: error.message || "Não foi possível carregar os posts do Notion." });
    }
}