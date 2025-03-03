const shortenUrlList = document.getElementById('shorten-list');

const getShortUrls = async () => {
    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const page = 1;
    const limit = 10;

    const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
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

    if (response.status === 200) {
        const data = jsonResponse.data;
        const pagination = jsonResponse.pagination;

        data.forEach((shortUrl) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="shorten-url">
                <div class="shorten-url__original-url">
                    <p><strong>Original:</strong> ${shortUrl.originalUrl}</p>
                </div>
                <div class="shorten-url__short-url">
                    <p><strong>Shortened:</strong> 
                        <a href="${shortUrl.shortUrl}" target="_blank" rel="noopener noreferrer">
                            ${shortUrl.shortUrl}
                        </a>
                    </p>
                </div>
                <div class="shorten-url__clicks">
                    <p><strong>Clicks:</strong> ${shortUrl.clicks}</p>
                </div>
                <div class="shorten-url__created-at">
                    <p><strong>Created At:</strong> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                </div>
                <div class="shorten-url__updated-at">
                    <p><strong>Updated At:</strong> ${new Date(shortUrl.updatedAt).toLocaleString()}</p>
                </div>
            </div>
            `;
            shortenUrlList.appendChild(li);
        });
    }
};

getShortUrls();
