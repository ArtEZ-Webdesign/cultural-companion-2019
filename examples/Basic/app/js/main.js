const compass1 = document.querySelector('.compass1');
const compass2 = document.querySelector('.compass2');

window.addEventListener('deviceorientation', function(orientation) {
	const x = orientation.beta;
	const y = orientation.gamma;
	const z = orientation.alpha;

	compass1.style.transform = 'translate(-50%, -50%) rotateZ(' + z + 'deg) rotateY(' + y + 'deg) rotateX(' + x + 'deg)';

	compass2.style.transform = 'translate(-50%, -50%) rotateZ(' + -z + 'deg) rotateY(' + -y + 'deg) rotateX(' + -x + 'deg)';
});
