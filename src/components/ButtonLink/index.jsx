import Data from './data.json';
import "./styles.css";

export function ButtonLink({ excludeBlog = false }){
    const buttons = Data.filter((button) => button.link && !(excludeBlog && button.text.startsWith("Blog")));

    return(
        <div className="button-link-list">
            {buttons.map( (button, index) => {
                return(
                    <a key={index} className={`button-link${button.color ? " button-link--highlight" : ""}`}
                        href={button.link}
                        target="_blank"
                        rel="noreferrer"
                        hidden={button.hidden}
                    >
                        <span className="button-link__content">
                            <img className="button-link__icon" src={button.imageIcon} alt={button.alt} />
                            <span className={`button-link__text${button.color ? " button-link__text--highlight" : ""}`}>{ button.text }</span>
                        </span>
                        <span className="button-link__content">
                            <img className="button-link__action-icon" src={button.actionIcon || "/assets/images/icons/link-white-icon.svg"} alt="Direcionar." />
                        </span>
                    </a>
                );
            })}
        </div>
    )
}
