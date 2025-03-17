document.addEventListener('DOMContentLoaded', () => {
	const currencyRegex =
		/([â‚¬$Â£â‚¹Â¥]|kr|zÅ‚|RM)\s?0[,.]00|0[,.]00\s?(kr|zÅ‚)|â‚¹0[,.]00|Â¥\s?0[,.]00|RM\s?0[,.]00|Â¥\s?0/gi;
	const cleanCentsRegex = /(\d+)[,.]00/g;

	const replaceCurrencyInText = (text) => {
		return text.replace(currencyRegex, 'FREE').replace(cleanCentsRegex, '$1');
	};

	const processTextNodes = (element) => {
		Array.from(element.childNodes).forEach((node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				node.textContent = replaceCurrencyInText(node.textContent);
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				processTextNodes(node);
			}
		});
	};

	processTextNodes(document.body);
});
