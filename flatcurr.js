document.addEventListener('DOMContentLoaded', () => {
	const ENABLE_FREE_REPLACEMENT = true;
	const ENABLE_DECIMAL_CLEANUP = true;

	const currencyLocales = {
		EUR: 'de-DE', // Germany (Euro)
		USD: 'en-US', // US Dollar
		GBP: 'en-GB', // British Pound
		INR: 'en-IN', // Indian Rupee
		JPY: 'ja-JP', // Japanese Yen
		DKK: 'da-DK', // Danish Krone
		PLN: 'pl-PL', // Polish Złoty
		MYR: 'ms-MY', // Malaysian Ringgit
	};

	const formatCurrency = (value, currency) => {
		const locale = currencyLocales[currency] || 'en-US';
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: ENABLE_DECIMAL_CLEANUP ? 0 : 2,
		}).format(value);
	};

	const walker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT,
		null,
		false
	);

	while (walker.nextNode()) {
		let node = walker.currentNode;
		let text = node.textContent;

		// Match currency patterns dynamically
		text = text.replace(
			/(\p{Sc})?\s?0[,.]00\s?(\p{Sc})?/gu,
			(match, currencySymbol1, currencySymbol2) => {
				return ENABLE_FREE_REPLACEMENT ? 'FREE' : match;
			}
		);

		// Remove unnecessary ".00" or ",00" for normal numbers
		text = text.replace(/(\d+)[,.]00/g, '$1');

		// Debugging: Log changes
		if (node.textContent !== text) {
			console.log('Modified:', node.textContent, '→', text);
		}

		node.textContent = text;
	}
});
