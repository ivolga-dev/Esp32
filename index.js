const express = require('express');
const app = express();
app.use(express.json());

let currentData = { temp: "--", hum: "--", time: null };

// Маршрут для ESP32
app.post('/update', (req, res) => {
    currentData = {
        temp: req.body.temp,
        hum: req.body.hum,
        time: new Date().toLocaleString()
    };
    console.log("Получено:", currentData);
    res.sendStatus(200);
});

// Маршрут для просмотра (простой текст или JSON)
app.get('/', (req, res) => {
    res.send(`<h1>Погода сейчас:</h1>
              <p>Температура: ${currentData.temp}°C</p>
              <p>Влажность: ${currentData.hum}%</p>
              <p>Обновлено: ${currentData.time}</p>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

