document.addEventListener('DOMContentLoaded', () => {
	const ENABLE_FREE_REPLACEMENT = true; // Replace "€0.00" or similar with "FREE"
	const ENABLE_DECIMAL_CLEANUP = true; // Remove ".00" or ",00" from numbers

	const currencySymbols = ['\u20AC', '$', '£', '₹', '¥', 'kr', 'zł', 'RM']; // Unicode for €

	// Ensure the regex correctly detects zero values and removes trailing punctuation
	const zeroAmountRegex = new RegExp(
		`(?:^|\\s)(${currencySymbols
			.map((s) => `\\${s}`)
			.join(
				'|'
			)})\\s?0[,.]00(?:[.,!?])?(?:\\b|\\s|$)|(?:^|\\s)0,00\\s?(kr|zł)(?:[.,!?])?(?:\\b|\\s|$)|(?:^|\\s)₹0[,.]00(?:[.,!?])?(?:\\b|\\s|$)|(?:^|\\s)¥\\s?0[,.]00(?:[.,!?])?(?:\\b|\\s|$)|(?:^|\\s)RM\\s?0[,.]00(?:[.,!?])?(?:\\b|\\s|$)|(?:^|\\s)¥\\s?0(?:[.,!?])?(?:\\b|\\s|$)`,
		'g'
	);

	const decimalCleanupRegex = /(\d+)[,.]00\b/g; // Ensure it only removes decimals when followed by word boundary

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
			text = text.replace(zeroAmountRegex, 'FREE'); // No extra space needed
		}

		if (ENABLE_DECIMAL_CLEANUP) {
			text = text.replace(decimalCleanupRegex, '$1');
		}

		// Debugging: Log changes
		if (node.textContent !== text) {
			console.log('Modified:', node.textContent, '→', text);
		}

		node.textContent = text.trim(); // Trim spaces at the end to ensure no extra space is left
	}

	// Handle FREE products and currency display
	const priceElements = document.querySelectorAll('[data-product="price"]');
	priceElements.forEach((element) => {
		const priceText = element.textContent.trim();
		if (priceText.includes('FREE')) {
			// Remove any periods after FREE
			element.textContent = 'FREE';

			// Find and remove all nested currency spans
			const currencySpans = element.querySelectorAll('span');
			currencySpans.forEach((span) => {
				span.remove();
			});
		}
	});
});
