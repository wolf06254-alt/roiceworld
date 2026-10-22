# RoiceWorld — сайт Minecraft-сервера

Лендинг для сервера **RoiceWorld** с множеством анимаций, 3D-фоном и блоком доната.

- **IP:** `mc.RoiceWorld.pw`
- **Discord:** https://discord.gg/CD6ssKx3Q
- **Telegram:** скоро

## Структура
```
index.html        — главная страница
css/style.css     — стили + анимации
js/main.js        — логика, донат-карточки, 3D-фон (Three.js)
render.yaml       — конфиг для деплоя на Render
```

## Локальный запуск
Открой `index.html` в браузере или запусти локальный сервер:
```bash
python3 -m http.server 8080
# открой http://localhost:8080
```

## Деплой на Render
1. Залей эту папку в GitHub-репозиторий.
2. На render.com → **New +** → **Static Site** → выбери репо.
3. Настройки:
   - **Build Command:** оставь пустым
   - **Publish Directory:** `.`
4. Файл `render.yaml` уже содержит нужные настройки — можно использовать **Blueprint**.

## Цены привилегий
| Привилегия | Цена |
|-----------|------|
| Гидра | 50 ₽ |
| Ребит | 100 ₽ |
| Кобра | 240 ₽ |
| Бог | 300 ₽ |
| Пегас | 400 ₽ |

Цены/привилегии меняются в массиве `RANKS` в начале `js/main.js`.
