import axios from "axios";

let profileCache = null;
let socialLinksCache = null;
const FALLBACK_PROFILE = {
    name: "Lucas Silva",
    avatarUrl: "https://github.com/luccasscds.png",
    bio: "Desenvolvedor FullStack, curioso por tecnologia e sempre em busca de aprender e compartilhar conhecimento.",
};

export const GitHub = {
    async getProfile() {
        try {
            if (profileCache) return profileCache;
    
            const { data } = await axios.get("/api/github", { params: { resource: "profile" } });
    
            profileCache = {
                name: data.name || data.login || FALLBACK_PROFILE.name,
                avatarUrl: data.avatar_url || FALLBACK_PROFILE.avatarUrl,
                bio: data.bio || FALLBACK_PROFILE.bio,
            };
    
            return profileCache;
        } catch (error) {
            console.error("Não foi possível carregar o perfil do GitHub.", error);
            return FALLBACK_PROFILE;
        }
    },

    async getSocialLinks() {
        try {
            if (socialLinksCache) return socialLinksCache;

            const { data } = await axios.get("/api/github", { params: { resource: "links" } });
            if (!Array.isArray(data.socials)) throw new Error("O profile.json não contém uma lista socials válida.");

            socialLinksCache = data.socials;
            return socialLinksCache;
        } catch (error) {
            console.error("Não foi possível carregar os links sociais do GitHub.", error);
            socialLinksCache = [];
            return socialLinksCache;
        }
    },
};
