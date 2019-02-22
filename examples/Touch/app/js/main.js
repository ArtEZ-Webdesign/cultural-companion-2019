const circle = document.createElement('div');
circle.classList.add('circle');
document.body.appendChild(circle);

const label = document.createElement('div');
label.classList.add('label');
circle.appendChild(label);


if (navigator.userAgent.match('iPhone')) {
	label.innerHTML = 'iPhone';
} else if (navigator.userAgent.match('Android')) {
	label.innerHTML = 'Android';
} else {
	label.innerHTML = 'Other';
}

document.addEventListener('touchstart', function (e) {
	circle.classList.add('touched');
});

document.addEventListener('touchend', function (e) {
	circle.classList.remove('touched');
});

document.addEventListener('touchmove', function (e) {
	e.preventDefault();

	circle.style.left = e.touches[0].pageX + 'px';
	circle.style.top = e.touches[0].pageY + 'px';
}, {
	passive: false
});
