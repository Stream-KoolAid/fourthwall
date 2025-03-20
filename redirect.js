function checkProductInfoAndUpdateCTA() {
	const titleElement = document.querySelector('.product-info__title');
	const descriptionElement = document.querySelector(
		'.product-info__description'
	);
	const ctaElement = document.querySelector('.product-info__cta');
	const pricesElement = document.querySelector('.product-info__prices');

	if (titleElement && titleElement.textContent.includes('on Steam')) {
		if (pricesElement) {
			pricesElement.style.display = 'none';
		}
		const descriptionText = descriptionElement
			? descriptionElement.textContent
			: '';

		switch (true) {
			case descriptionText.includes('AMBERISLESTEAM'):
				if (ctaElement) {
					ctaElement.innerHTML = `
                        <div class="hero__cta-container hero__cta-container--center">
                            <div class="hero__cta hero__cta--primary">
                                <a href="https://store.steampowered.com/app/1663040/Amber_Isle/" class="button button--primary button--expand">
                                    Buy now on Steam
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
