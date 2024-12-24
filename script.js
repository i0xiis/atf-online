document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const modeLabelFull = document.getElementById('modeLabelFull');
    const fullModeFields = document.querySelectorAll('.fullModeField');
    const linkForm = document.getElementById('linkForm');

    function toggleMode() {
        const isSimplifiedMode = modeLabelFull.innerText === 'Zjednodušený';
        fullModeFields.forEach(field => field.style.display = isSimplifiedMode ? 'block' : 'none');
        modeLabelFull.innerText = isSimplifiedMode ? 'Plný' : 'Zjednodušený';
        modeToggle.innerText = isSimplifiedMode ? 'Přepnout na Zjednodušený' : 'Přepnout na Plný';

        if (!isSimplifiedMode) {
            document.getElementById('sublection').value = '1';
            document.getElementById('time').value = '-1';
            document.getElementById('corrmode').value = 'YES';
            document.getElementById('editor').value = 'NO';
        }
    }

    function formatErroneous(value) {
        let num = parseFloat(value) || 0;
        return num.toFixed(2);
    }

    function generateLink() {
        const baseUrl = 'https://www.atfonline.cz/saveSnapResult.php';
        const username = encodeURIComponent(document.getElementById('username').value || '');
        const usergo = encodeURIComponent(document.getElementById('usergo').value || '');
        const lection = encodeURIComponent(document.getElementById('lection').value || '');
        const sublection = encodeURIComponent(document.getElementById('sublection').value || '1');
        const snap = encodeURIComponent(document.getElementById('snap').value || '');
        const time = encodeURIComponent(document.getElementById('time').value || '-1');
        const speed = encodeURIComponent(document.getElementById('speed').value || '');
        const erroneous = encodeURIComponent(formatErroneous(Math.min(parseFloat(document.getElementById('erroneous').value) || 0, 100)));
        const corrmode = encodeURIComponent(document.getElementById('corrmode').value || 'YES');
        const editor = encodeURIComponent(document.getElementById('editor').value || 'NO');

        return `${baseUrl}?username=${username}&usergo=${usergo}&normal=YES&lection=${lection}&sublection=${sublection}&snap=${snap}&fortime=${time}&speed=${speed}&erroneous=${erroneous}&corrmode=${corrmode}&editor=${editor}`;
    }

    modeToggle.addEventListener('click', toggleMode);

    linkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const url = generateLink();
        window.open(url, '_blank', 'noopener,noreferrer');
    });

    modeLabelFull.innerText = 'Zjednodušený';
    modeToggle.innerText = 'Přepnout na Plný';
    fullModeFields.forEach(field => field.style.display = 'none');
});