document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const imageDisplay = document.getElementById('image-display');
    const loadingSpinner = document.getElementById('loading-spinner');

    // هام: سنستبدل هذا الرابط لاحقاً بالرابط الفعلي للـ Backend على Render
    const BACKEND_URL = 'YOUR_BACKEND_URL_WILL_GO_HERE'; 

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value;
        if (!prompt) {
            alert('الرجاء إدخال وصف للصورة.');
            return;
        }

        loadingSpinner.style.display = 'block';
        imageDisplay.innerHTML = '';
        imageDisplay.appendChild(loadingSpinner);
        generateBtn.disabled = true;
        generateBtn.style.backgroundColor = '#555';

        try {
            // استخدام الرابط الكامل للـ Backend
            const response = await fetch(`${BACKEND_URL}/api/generate-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'حدث خطأ ما');
            }

            const data = await response.json();
            
            loadingSpinner.style.display = 'none';
            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.alt = prompt;
            imageDisplay.innerHTML = '';
            imageDisplay.appendChild(img);

        } catch (error) {
            loadingSpinner.style.display = 'none';
            imageDisplay.innerHTML = `<p style="color: #ff7575;">خطأ: ${error.message}</p>`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.style.backgroundColor = '#c31432';
        }
    });
});
