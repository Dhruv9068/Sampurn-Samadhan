// Enhanced markdown renderer for AI responses
export const renderMarkdown = (text: string): string => {
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2 border-l-4 border-orange-500 pl-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 className="text-xl font-bold text-gray-900 mt-6 mb-3 border-b-2 border-orange-300 pb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4 text-center bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">$1</h1>')
    // Bullet points
    .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="text-orange-500 mr-2">•</span><span>$1</span></li>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="text-orange-500 mr-2 font-semibold">$&</span></li>')
    // Code blocks
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-600 hover:text-orange-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-3 leading-relaxed">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph tags
    .replace(/^(.+)$/gm, '<p class="mb-3 leading-relaxed">$1</p>')
    // Clean up empty paragraphs
    .replace(/<p class="mb-3 leading-relaxed"><\/p>/g, '')
    .replace(/<p class="mb-3 leading-relaxed"><br><\/p>/g, '');
};
