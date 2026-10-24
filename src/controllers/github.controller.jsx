import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users/luccasscds";
const PROFILE_LINKS_URL = "https://raw.githubusercontent.com/luccasscds/Luccasscds/main/profile.json";

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
    
            const { data } = await axios.get(GITHUB_API_URL);
    
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

            const { data } = await axios.get(PROFILE_LINKS_URL);
            if (!Array.isArray(data.socials)) throw new Error("O profile.json não contém uma lista socials válida.");

            const socialLinks = data.socials.filter((link) => link.name && link.url && link.src && link.title);
            socialLinksCache = socialLinks;
            return socialLinksCache;
        } catch (error) {
            console.error("Não foi possível carregar os links sociais do GitHub.", error);
            socialLinksCache = [];
            return socialLinksCache;
        }
    },
};
