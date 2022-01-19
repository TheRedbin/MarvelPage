const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('loaded-images');

	const links = document.querySelectorAll('#category a');
	links.forEach((element) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			links.forEach((link) => link.classList.remove('active'));
			event.target.classList.add('active');

			const category = event.target.innerHTML.toLowerCase();
			category === 'todos' ? grid.filter('[data-category]') : grid.filter(`[data-category="${category}"]`);
		});
	});

	document.querySelector('#search-bar').addEventListener('input', (event) => {
		const search = event.target.value;
		grid.filter( (item) => item.getElement().dataset.tags.includes(search) );
	});

	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((element) => {
		element.addEventListener('click', () => {
			const rute = element.getAttribute('src');
			const description = element.parentNode.parentNode.dataset.description;

			overlay.classList.add('active');
			document.querySelector('#overlay img').src = rute;
			document.querySelector('#overlay .description').innerHTML = description;
		});
	});

	document.querySelector('#btn-close-popup').addEventListener('click', () => {
		overlay.classList.remove('active');
	});

	overlay.addEventListener('click', (event) => {
		event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
	});
});