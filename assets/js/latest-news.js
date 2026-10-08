(function () {
	'use strict';
	var root = document.getElementById('latest-news');
	if (!root) return;

	function articleDate(card) {
		var date = card.querySelector('.date');
		if (!date) return NaN;
		var text = date.textContent.trim();
		var chinese = text.match(/^(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日$/);
		if (chinese) return new Date(+chinese[1], +chinese[2] - 1, +chinese[3]).getTime();
		return Date.parse(text);
	}

	fetch(root.getAttribute('data-news-source'), { cache: 'no-cache' })
		.then(function (response) {
			if (!response.ok) throw new Error('Could not load news');
			return response.text();
		})
		.then(function (html) {
			var page = new DOMParser().parseFromString(html, 'text/html');
			var today = new Date();
			today.setHours(23, 59, 59, 999);
			var cards = Array.from(page.querySelectorAll('#id-3 > .container > .row > .col-lg-4'))
				.map(function (card) { return { card: card, date: articleDate(card) }; })
				.filter(function (item) { return Number.isFinite(item.date) && item.date <= today.getTime(); })
				.sort(function (a, b) { return b.date - a.date; })
				.slice(0, 3);
			if (!cards.length) return;
			root.replaceChildren.apply(root, cards.map(function (item) {
				return document.importNode(item.card, true);
			}));
		})
		.catch(function (error) {
			// Keep the static latest-three preview when the listing cannot be fetched.
			console.warn('Latest news: ' + error.message);
		});
})();
