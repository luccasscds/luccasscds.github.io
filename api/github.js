const PROFILE_URL = "https://api.github.com/users/luccasscds";
const SOCIAL_LINKS_URL = "https://raw.githubusercontent.com/luccasscds/Luccasscds/main/profile.json";

export default async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Método não permitido." });
    }

    const resource = request.query.resource;
    if (resource !== "profile" && resource !== "links") {
        return response.status(400).json({ error: "Recurso inválido." });
    }

    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");

    try {
        if (resource === "profile") {
            const result = await fetch(PROFILE_URL);
            if (!result.ok) throw new Error("Falha ao consultar o perfil do GitHub.");

            const profile = await result.json();
            return response.status(200).json({
                name: profile.name || profile.login,
                avatarUrl: profile.avatar_url,
                bio: profile.bio,
            });
        }

        const result = await fetch(SOCIAL_LINKS_URL);
        if (!result.ok) throw new Error("Falha ao consultar os links sociais do GitHub.");

        const data = await result.json();
        const socials = Array.isArray(data.socials)
            ? data.socials.filter((link) => link?.name && link?.url && link?.src && link?.title)
            : [];
        return response.status(200).json({ socials });
    } catch (error) {
        console.error("Não foi possível carregar dados do GitHub.", error);
        return response.status(502).json({ error: "Não foi possível carregar os dados do GitHub." });
    }
}
