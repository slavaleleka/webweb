function loadUnsafeResource() {
    // Attempt to load a resource that redirects to an unsafe domain
    const img = document.createElement('img');

    img.src = 'https://slavaleleka.github.io/webweb/testing/pages/unsafe-redirect-png.png';
    // img.src = 'https://raw.githubusercontent.com/slavaleleka/webweb/master/testing/pages/unsafe-redirect-png.png';

    img.onload = () => console.log('Image loaded successfully');
    img.onerror = (err) => console.error('Failed to load image:', err);

    document.body.appendChild(img);
}
