const container = document.querySelector('.container');
// Get random color
function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Generate random gradient
function generateRandomGradient() {
	const randomColor1 = getRandomColor();
	let randomColor2;

	do {
		randomColor2 = getRandomColor();
	} while (randomColor1 === randomColor2);

	const gradientCSS = `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
	return gradientCSS;
}

// Function to create gradient card
function createGradientCard() {
	const card = document.createElement('div');
	card.classList.add('gradient-card');

	const gradientCSS = generateRandomGradient();

	// Add gradient preview to card
	const gradientPreview = document.createElement('div');
	gradientPreview.classList.add('gradient-preview');
	gradientPreview.style.backgroundImage = gradientCSS;
	card.appendChild(gradientPreview);

	// Add CSS code to card
	const cssCode = document.createElement('div');
	cssCode.classList.add('gradient-code');
	cssCode.textContent = gradientCSS;
	card.appendChild(cssCode);

	// Add click event listener to copy CSS code to clipboard
	card.addEventListener('click', () => {
		copyToClipboard(gradientCSS);
		card.classList.add('copied');
		setTimeout(() => {
			card.classList.remove('copied');
		}, 1500);
	});

	return card;
}

// Function to generate and show new gradients
function generateAndShowGradients() {
	// Clear existing cards
	container.innerHTML = '';

	// Generate gradient card and append them to the container
	for (let i = 0; i < 1; i++) {
		const gradientCard = createGradientCard();
		container.appendChild(gradientCard);
	}
}

// Generate and show initial gradients
generateAndShowGradients();

// Function to copy CSS code to clipboard
function copyToClipboard(text) {
	const textarea = document.createElement('textarea');
	textarea.value = text;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
	iziToast.success({
		title: 'Success',
		message: 'The CSS code has been copied to your clipboard',
	});
}

// Listen for key presses
document.addEventListener('keydown', (event) => {
	if (event.key === 'Enter' || event.key === ' ') {
		generateAndShowGradients();
	}
});
