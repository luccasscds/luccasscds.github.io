import { Block, InlineCode, Link } from "./styles";

function renderRichText(items = []) {
    return items.map((item, index) => {
        const annotations = item.annotations || {};
        let content = item.plain_text || item.text?.content || "";

        if (annotations.code) content = <InlineCode>{content}</InlineCode>;
        if (annotations.bold) content = <strong>{content}</strong>;
        if (annotations.italic) content = <em>{content}</em>;
        if (annotations.strikethrough) content = <s>{content}</s>;
        if (annotations.underline) content = <u>{content}</u>;

        return item.href
            ? <Link key={`${item.href}-${index}`} href={item.href} target="_blank" rel="noreferrer">{content}</Link>
            : <span key={index}>{content}</span>;
    });
}

function renderBlock(block) {
    const value = block[block.type] || {};
    const text = renderRichText(value.rich_text || []);

    switch (block.type) {
        case "paragraph": return <Block key={block.id}>{text}</Block>;
        case "heading_1": return <h2 key={block.id}>{text}</h2>;
        case "heading_2": return <h3 key={block.id}>{text}</h3>;
        case "heading_3": return <h4 key={block.id}>{text}</h4>;
        case "bulleted_list_item":
        case "numbered_list_item":
            return <li key={block.id}>{text}<NotionContent blocks={block.children} /></li>;
        case "quote": return <blockquote key={block.id}>{text}</blockquote>;
        case "callout":
            return <aside key={block.id}>{value.icon?.emoji && <span>{value.icon.emoji} </span>}{text}<NotionContent blocks={block.children} /></aside>;
        case "code": return <pre key={block.id}><code>{(value.rich_text || []).map((item) => item.plain_text).join("")}</code></pre>;
        case "divider": return <hr key={block.id} />;
        case "image": {
            const imageUrl = value.external?.url || value.file?.url;
            if (!imageUrl) return null;
            const caption = value.caption || [];
            return <figure key={block.id}><img src={imageUrl} alt={caption.map((item) => item.plain_text).join("")} />{caption.length > 0 && <figcaption>{renderRichText(caption)}</figcaption>}</figure>;
        }
        case "bookmark":
        case "embed":
        case "link_preview":
            return value.url ? <p key={block.id}><Link href={value.url} target="_blank" rel="noreferrer">{value.url}</Link></p> : null;
        case "child_page":
        case "child_database":
            return null;
        case "toggle":
            return <details key={block.id}><summary>{text}</summary><NotionContent blocks={block.children} /></details>;
        default:
            return block.children?.length ? <NotionContent key={block.id} blocks={block.children} /> : null;
    }
}

export function NotionContent({ blocks = [] }) {
    const content = [];

    for (let index = 0; index < blocks.length;) {
        const type = blocks[index].type;
        if (type === "bulleted_list_item" || type === "numbered_list_item") {
            const items = [];
            while (index < blocks.length && blocks[index].type === type) {
                items.push(renderBlock(blocks[index]));
                index += 1;
            }
            const List = type === "bulleted_list_item" ? "ul" : "ol";
            content.push(<List key={items[0]?.key || `list-${index}`}>{items}</List>);
        } else {
            content.push(renderBlock(blocks[index]));
            index += 1;
        }
    }

    return content;
}
