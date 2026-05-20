const express = require('express');
const startPair = require('./pair');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Apex-Md Pairing</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin: 0; padding-top: 50px; background: #121212; color: white; }
                    .container { max-width: 400px; margin: auto; padding: 20px; background: #1e1e1e; border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.5); }
                    input { padding: 12px; width: 90%; border-radius: 5px; border: 1px solid #333; font-size: 16px; text-align: center; background: #2a2a2a; color: white; margin-bottom: 15px; }
                    button { padding: 12px; width: 90%; background: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold; }
                    button:hover { background: #20ba59; }
                    h2 { color: #25D366; margin-top: 25px; font-size: 28px; letter-spacing: 2px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>👑 Apex-Md Pair Code</h1>
                    <p>94 එකත් එක්ක WhatsApp නම්බර් එක දාන්න:</p>
                    <input type="number" id="number" placeholder="eg: 94753245703">
                    <button onclick="getCode()">Get Pair Code</button>
                    <h2 id="code"></h2>
                </div>

                <script>
                    function getCode() {
                        let num = document.getElementById('number').value;
                        if(!num) return alert('Number එකක් ඇතුළත් කරන්න!');
                        document.getElementById('code').innerText = "කෝඩ් එක හැදෙනවා... තත්පර 5ක් ඉන්න...";
                        
                        fetch('/code?number=' + num)
                        .then(res => res.json())
                        .then(data => {
                            if(data.code) {
                                document.getElementById('code').innerText = data.code;
                            } else {
                                document.getElementById('code').innerText = "Error! ආයෙත් ට්‍රයි කරන්න.";
                            }
                        }).catch(err => {
                            document.getElementById('code').innerText = "Error එකක් ආවා!";
                        });
                    }
                </script>
            </body>
        </html>
    `);
});

app.get('/code', async (req, res) => {
    let number = req.query.number;
    if(!number) return res.status(400).json({ error: "No number" });
    try {
        let code = await startPair(number);
        res.json({ code: code });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
