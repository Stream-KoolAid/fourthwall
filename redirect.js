function checkProductInfoAndUpdateCTA() {
	const titleElement = document.querySelector('.product-info__title');
	const ctaElement = document.querySelector('.product-info__cta');
	const pricesElement = document.querySelector('.product-info__prices');
	const moreinfoElement = document.querySelector(
		'.product-info__additional-info'
	);

	if (titleElement && titleElement.textContent.includes('Widget')) {
		/* if (pricesElement) {
			pricesElement.style.display = 'none';
		} */
		const moreinfoText = moreinfoElement ? moreinfoElement.textContent : '';

		switch (true) {
			case moreinfoText.includes('CLOCKWIDGET'):
				if (ctaElement) {
					ctaElement.innerHTML = `
                        <div class="hero__cta-container hero__cta-container--center">
                            <div class="hero__cta hero__cta--primary">
                                <a href="https://stream-koolaid.github.io/Clock-Widget/" class="button button--primary button--expand">
                                    Download Now
                                </a>
                            </div>
                        </div>
                    `;
				}
				break;

			case moreinfoText.includes('UPTIMEWIDGET'):
				if (ctaElement) {
					ctaElement.innerHTML = `
                            <div class="hero__cta-container hero__cta-container--center">
                                <div class="hero__cta hero__cta--primary">
                                    <a href="https://stream-koolaid.github.io/Clock-Widget/" class="button button--primary button--expand">
                                        Download Now
                                    </a>
                                </div>
                            </div>
                        `;
				}
				break;

			default:
			// do nothing
		}
	}
}

window.addEventListener('load', checkProductInfoAndUpdateCTA);
