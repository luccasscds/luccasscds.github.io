import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users/luccasscds";

let profileCache = null;
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
};
