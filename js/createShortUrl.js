const shortenForm = document.getElementById('shorten-form');
const shortenResult = document.getElementById('shorten-result');

shortenForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = shortenForm.querySelector('#shorten-form > input[name="url"]').value;
    const token = localStorage.getItem('token');

    const shortenUrl = 'https://www.shorten-url-api.infobrains.club/api/private/urls';

    const response = await fetch(shortenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
    });

    const jsonResponse = await response.json();

    if (response.status === 500) {
        alert('Internal server error');
    }

    if (response.status === 401) {
        alert('Unauthorized');
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    }

    if (response.status === 400) {
        alert(jsonResponse.error.details);
    }

    if (response.status === 201) {
        const shortUrl = jsonResponse.data.shortUrl;
        shortenResult.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    }
});
