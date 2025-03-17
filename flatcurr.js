document.addEventListener('DOMContentLoaded', () => {
	const ENABLE_FREE_REPLACEMENT = true; // Toggle replacing zero prices with "FREE"
	const ENABLE_DECIMAL_CLEANUP = true; // Toggle removing unnecessary ".00" or ",00"

	const currencySymbols = ['€', '$', '£', '₹', '¥', 'kr', 'zł', 'RM'];
	const zeroAmountRegex = new RegExp(
		`(${currencySymbols
			.map((s) => `\\${s}`)
			.join(
				'|'
			)})\\s?0[,.]00|0,00\\s?(kr|zł)|₹0[,.]00|¥\\s?0[,.]00|RM\\s?0[,.]00|¥\\s?0`,
		'g'
	);
	const decimalCleanupRegex = /(\d+)[,.]00/g;

	const walker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT,
		null,
		false
	);

	while (walker.nextNode()) {
		let node = walker.currentNode;
		let text = node.textContent;

		if (ENABLE_FREE_REPLACEMENT) {
			text = text.replace(zeroAmountRegex, 'FREE');
		}

		if (ENABLE_DECIMAL_CLEANUP) {
			text = text.replace(decimalCleanupRegex, '$1');
		}

		node.textContent = text;
	}
});
