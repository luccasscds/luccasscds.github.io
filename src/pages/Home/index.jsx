import { useEffect, useState } from "react";
import { GitHub } from "../../controllers/github.controller";
import { SocialNetworks } from "../../components/SocialNetworks";
import { ButtonLink } from "../../components/ButtonLink";
import { SiteNav } from "../../components/SiteNav";
import "./styles.css";

export function Home(){
    const [profile, setProfile] = useState({});

    useEffect(() => {
        let isMounted = true;

        GitHub.getProfile().then((githubProfile) => {
            if (isMounted) {
                setProfile({
                    name: githubProfile.name,
                    avatarUrl: githubProfile.avatarUrl,
                    bio: githubProfile.bio,
                });
            }
        });
        return () => { isMounted = false; };
    }, []);

    return (
        <main className="home-main">
            <SiteNav />
            <div className="home-content">
                <section className="home-profile">
                    <div>
                        <figure className="home-photo">
                            <img src={profile.avatarUrl} alt={profile.name}/>
                        </figure>
                    </div>

                    <div className="home-text home-text--name">
                        <h1 className="home-name">Olá, eu sou <strong>{profile.name}</strong></h1>
                    </div>

                    <div className="home-text home-text--bio">
                        <p className="home-bio">{profile.bio}</p>
                    </div>
    
                    <SocialNetworks/>
                </section>

                <ButtonLink excludeBlog />
            </div>
        </main>
    )
}
