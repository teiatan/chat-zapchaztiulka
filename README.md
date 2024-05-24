# Chat - App for e-commerce website ["Zapchaztiulka"](https://zapchaztiulka-catalog-frontend.vercel.app/)

## Окремий застосунок "Чат-бот", який відкривається фреймом на веб-сайті ["Zapchaztiulka"](https://zapchaztiulka-catalog-frontend.vercel.app/)

## Матеріали та інструменти

- [React.js](https://react.dev/learn) - бібліотека для створення користувацького інтерфейсу
- [Redux Toolkit](https://redux-toolkit.js.org/) - для керування станом застосунку
- [Socket.io](https://socket.io/docs/v4/client-installation/) - для обміну повідомленнями між оператором і клієнтом магазину
- [Tailwindcss](https://tailwindcss.com/) - стилізація застоcунку
- репозиторій з [Backend](https://github.com/Zapchaztiulka/spares-backend)

## Для роботи з репозиторієм

1. Склонувати репозиторій клієнтського веб-застосунку "Zapchaztiulka":

```bash
git clone https://github.com/Zapchaztiulka/zapchaztiulka-catalog-frontend.git
```

2. Склонувати репозиторій застосунку "Чат":

```bash
git clone https://github.com/Zapchaztiulka/chat-zapchaztiulka.git
```


3. Встановити усі пакети та залежності в обох застосунках:

```bash
npm install
```

4. Сторити файл змінних оточення .env, заповнити його необхідними змінними.

5. Запустити режим розробки в обох застосунках, виконавши команду:

```bash
npm run dev
```

6. Відкрити [http://localhost:3000](http://localhost:3000) або посилання буде вказано в терміналі, натиснути на кнопку чату справа знизу сторінки.
   
7. Для деплою застосунку "Чат":
- збілдити проект:
```bash
npm run build
```
- виконати деплой проекту на gh-pages:
```bash
npm run deploy
```
