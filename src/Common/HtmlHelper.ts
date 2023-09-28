

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export function addHighlightClass(content: string, targetWord: string): string {
  return content.replace(new RegExp(`\\b${targetWord}\\b`, 'gi'), function (match) {
    return `<span class="highlight">${match}</span>`;
  });
}
