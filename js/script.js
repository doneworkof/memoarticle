let wrapper = document.querySelector('.wrapper');
let screenshotLocked = false;

function downloadImage(src) {
    let a = document.createElement('a');
    a.href = src;
    a.className = 'download-link';
    a.download = 'output.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener('keydown', function(ev) {
    if (ev.key != 'p' || screenshotLocked) return;
    screenshotLocked = true;
    wrapper.classList.add('initial');
    setInterval(() => {
        domtoimage.toJpeg(wrapper).then(function(dataSRC) {
            downloadImage(dataSRC);
            wrapper.classList.remove('initial');
            screenshotLocked = false;
        });
    }, 250);
});


document.querySelectorAll('img[res]').forEach(img => {
    let wh = img.getAttribute('res').split('x');
    let w = wh[0];
    let h = wh[1];
    
    if (w != '_')
        img.style.width = w + 'px';
    if (h != '_')
        img.style.height = h + 'px';
});

document.querySelectorAll('.box').forEach(box => {
    let img = box.querySelector('img');
    if (!img) {
        document.removeChild(box);
        return;
    }
    box.style.width = `${img.clientWidth}px`;
})