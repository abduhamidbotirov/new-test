document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('upload-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:5000/api/video', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                resultDiv.innerHTML = `<p>Video yuklandi: <a href="${data}" target="_blank">O'zgartiruvchilarni ko'rish</a></p>`;
            } else {
                resultDiv.innerHTML = `<p>Xatolik: ${response.statusText}</p>`;
            }
        } catch (error) {
            console.error('Xatolik:', error);
        }
    });
});
