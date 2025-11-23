const emailForm = document.getElementById('emailForm');
const responseMessage = document.getElementById('responseMessage');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    emailForm.querySelector('button').disabled = true;
    
    // Hide previous response
    responseMessage.classList.remove('show', 'success', 'error');
    
    try {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipient,
                subject,
                message
            })
        });
        
        const data = await response.json();
        
        // Show response
        if (response.ok) {
            responseMessage.textContent = `${data.msg}`;
            responseMessage.classList.add('show', 'success');
            
            // Reset form
            emailForm.reset();
        } else {
            responseMessage.textContent = `${data.msg || 'Gagal mengirim email'}`;
            responseMessage.classList.add('show', 'error');
        }
    } catch (error) {
        responseMessage.textContent = `Terjadi kesalahan: ${error.message}`;
        responseMessage.classList.add('show', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        emailForm.querySelector('button').disabled = false;
    }
});
