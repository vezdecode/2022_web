# WEB
- Команда: tipatima
- Задание: web
## Как запустить
Зайти на сайт - https://web-vezdecode.vercel.app/

Или запустить локально. Сервер будет развёрнут на http://localhost:3000
```
npm install
npm run dev
```
## Как добавлять товары
Информация по всем товарам хранится в текстовом файле ```products.json```, который находится в папке ```static```.
Содержимое файла выглядит следующим образом:
```
{
	products: [
		{
			id: 2, //id товара
			title: 'Мягкая игрушка Сеня', //название товара
			price: 60, //стоимость товара
			description: 'Это то, что вам нужно!', //описание товара
			count: 2, //колличество товара на складе
			isAuction: false, //Включен ли режим аукциона
		}
	]
}
```
Вы можете редактировать данный список, удалять, добавлять и редактировать объекты товаров.

Данные хранятся в LocalStorage и SessionStorage. Мы можете открывать разные вкладки браузера тестируя сервис от имени разных пользователей, у каждого будет своя корзина, но у всех будут общие товары, аукционы и порядок элементов на витрине. В дальнейшем возможно подключение настоящего api для хранения данных не только в рамках одного устройства.
## Контакты
- Вконтакте - [Кирилл Осинцев](https://vk.com/crashzy)
- Telegram - [crashzy](https://t.me/crashzy)