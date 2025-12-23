export function animateTitle() {
  anime({
    targets: '#mainTitle',
    translateY: [-30, 0],
    opacity: [0, 1],
    duration: 3000,
    easing: 'easeOutExpo'
  });
}
