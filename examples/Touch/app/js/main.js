const circle = document.createElement('div');
circle.classList.add('circle');
document.body.appendChild(circle);

document.addEventListener("touchmove", function (e) {
	e.preventDefault();

	console.log(
		e.touches[0].pageX,
		e.touches[0].pageY
	);
}, {
	passive: false
});
