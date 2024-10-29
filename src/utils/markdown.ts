import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import 'highlight.js/styles/github-dark.css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})
.use(highlightjs, {
  inline: true,
  code: true
});

// Plugins personalizados para suportar mais elementos
md.renderer.rules.table_open = () => '<div class="overflow-x-auto my-4"><table class="min-w-full divide-y divide-gray-700">\n';
md.renderer.rules.table_close = () => '</table></div>\n';

md.renderer.rules.blockquote_open = () => '<blockquote class="border-l-4 border-emerald-500 pl-4 my-4 italic text-gray-400">\n';

// Suporte para embeds (YouTube, Twitter, etc)
const embedRegex = /\[embed\](.*?)\[\/embed\]/g;
md.core.ruler.after('inline', 'embed', (state) => {
  state.tokens.forEach(token => {
    if (token.type === 'inline' && token.content) {
      token.content = token.content.replace(embedRegex, (_, url) => {
        if (url.includes('youtube.com')) {
          return `<div class="aspect-w-16 aspect-h-9 my-4">
            <iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>`;
        }
        return url;
      });
    }
  });
  return true;
});

export const renderMarkdown = (content: string): { __html: string } => {
  const rendered = md.render(content);
  return { __html: rendered };
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');