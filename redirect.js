function checkProductInfoAndUpdateCTA() {
	const titleElement = document.querySelector('.product-info__title');
	const descriptionElement = document.querySelector(
		'.product-info__description'
	);
	const ctaElement = document.querySelector('.product-info__cta');
	const pricesElement = document.querySelector('.product-info__prices');
	const moreinfoElement = document.querySelector(
		'.product-info__additional-info'
	);

	if (titleElement && titleElement.textContent.includes('on Steam')) {
		if (pricesElement) {
			pricesElement.style.display = 'none';
		}
		const moreinfoText = moreinfoElement ? moreinfoElement.textContent : '';

		switch (true) {
			case moreinfoText.includes('AMBERISLESTEAM'):
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

			case moreinfoText.includes('AMBERISLESWITCH'):
				if (ctaElement) {
					ctaElement.innerHTML = `
                        <div class="hero__cta-container hero__cta-container--center">
                            <div class="hero__cta hero__cta--primary">
                                <a href="https://switch.link/" class="button button--primary button--expand">
                                    Buy now on Nintendo eShop
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
