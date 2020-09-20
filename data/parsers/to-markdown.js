const removeHtml = require('./remove-html');
const actionCostParser = require('./action-cost-parser');

const toMarkdown = (text) => {
  if (!text) {
    return '';
  }

  let markdown = text.replace(/\r/g, '')
    .replace(/<br \/>/gi, '\n\n')
    .replace(/<ul>/gi, '')
    .replace(/\n\n /g, '\n\n')
    .replace(/<li>/gi, '\n\n  * ')
    .replace(/<b>/gi, '**')
    .replace(/<\/b>/gi, '**')
    .replace(/<h2 class="title">/gi, '\n\n## ')
    .replace(/<h3 class="title">/gi, '\n\n## ')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<\/h3>/gi, '\n\n');
  
  const actionCost = actionCostParser(markdown);
  if (actionCost !== 'None') {
    markdown = markdown.replace(/<img [^>]+Action[^>]+>/i, '[' + actionCost + ']');
    markdown = markdown.replace(/<img [^>]+Action[^>]+>/gi, '');
  }

  const underline = '<a style="text-decoration:underline';
  let start;
  while ((start = markdown.indexOf(underline)) != -1) {
    const stop = markdown.indexOf('>', start);
    const until = markdown.indexOf('</a>', stop);
    markdown = markdown.substr(0, start) + '__' + 
      markdown.substr(stop + 1, until - stop - 1) + '__' +
      markdown.substr(until + 4);
  }

  markdown = markdown.replace(/<u>/gi, '__')
    .replace(/<\/u>/gi, '__')
    .replace(/____/, '__');

  markdown = removeHtml(markdown);

  markdown = markdown.split('\n').map(x => x.trimEnd()).join('\n');
  return markdown.trim();
};

module.exports = { toMarkdown };

/*
public static string ToMarkdown(string text)
{
	var actionCost = ParseActionCost(text);
	if (actionCost.ActionCost != ActionCost.None)
	{
		markdown = markdown.Replace(
			$"<img class=\"actiondark\" alt=\"{actionCost.AltText}\" style=\"height:15px; padding:0px 2px 0px 2px\" src=\"Images\\Actions\\{actionCost.ImageName}\">", 
			$"[{actionCost.ActionCost}]");
	}
	
	var underline = "<a style=\"text-decoration:underline";
	int start;
	while ((start = markdown.IndexOf(underline)) != -1)
	{
		var stop = markdown.IndexOf(">", start);
		var until = markdown.IndexOf("</a>", stop);
		markdown = markdown.Substring(0, start) + "__" + 
			markdown.Substring(stop + 1, until - stop - 1) + "__" + 
			markdown.Substring(until + 4);
	}
	
  markdown = markdown.Replace("<u>", "__").Replace("</u>", "__")
  .Replace("____", "__");
		
	return RemoveHtmlTags(markdown);
}
*/
