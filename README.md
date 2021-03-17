# Приложение "Корпоративный чат"

Это проект был создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Доступные скрипты

Выберите папку проекта и в командной строке запустите:

### `npm start`

Приложение запустится в режиме Development.\
Откройте [http://localhost:3000](http://localhost:3000), чтобы посмотреть его в браузере.
При редактировании страница будет перезагружаться.\
Также в консоли вы увидите любые ошибки.

### `npm run build`

Сборка приложения в папку `build` в режиме Production.\
На выходе получаем сборку, оптимизированную для достижения максимальной производительности.
Также сборка минифицирована.\
Приложение готово к развёртыванию на сервере!
Более подробную информацию про деплой смотрите [здесь](https://facebook.github.io/create-react-app/docs/deployment).

## О приложении

Данное приложение является примером работы некоего корпоративного мессенджера. Его идея заключается в демонстрации возможностей React. Для реального использования в качестве корпоративной сети приложение не подходит, т.к. требует разработки серверной части.

### Начало работы

При запуске приложения происходит инициализация:
1. Данные чатов и пользователей загружаются в первый раз из предварительно заполненного статического файла и сразу сохраняются в LocalStorage. Дальнейшее считывание данных происходит именно из LocalStorage, что позволяет сохранять чат при перезагрузке страницы и выходе из браузера. При первом запуске приложения активным является пользователь, который находится в списке последним.
2. Определяется ширина экрана - приложение отображается в мобильном виде или подстраивается под широкий экран.

### Интерфейс

В верхней части экрана меню со страницами приложения:
1. Чаты.
2. Личный кабинет (будет разработан позже).
3. О приложении.
4. Вход (регистрация и авторизация).

Основная часть сайта разбита на два окна:
1. Список чатов.
2. Поле чата.

### Список чатов

В верхней части отображается имя и профессия текущего пользователя приложения. Ниже - список чатов. В приложении два типа чатов:
1. Групповой чат. Отображается имя чата. Раскрыть список участников кнопкой "Чат" слева. Переход в чат стрелкой справа. Выводятся только те групповые чаты, которые доступны текущему пользователю.
2. Личный чат. Отображается имя и профессия собеседника. Переход в чат нажатием по всей строке. Личные чаты выводятся все.

### Поле чата

В поле чата при запуске приложения или после регистрации пользователя по умолчанию выводится первый доступный пользователю групповой чат.

#### Шапка

В верхней части чата отображается шапка двух типов:
1. Для группового чата название чата и количество участников.
2. Для личного чата имя собеседника.

#### Диалог

Ниже в поле чата отображается диалог, который автоматически прокручивается вниз и стремится показать последнее сообщение. Доступна ручная прокрутка вверх.
Тексты диалога делятся на два типа:
1. Сообщение текущего пользователя приложения отображается в окне правее в полях жёлтого цвета.
2. Сообщения других участников чата отображаются в окне левее в полях серого цвета.

Каждое сообщение содержит:
1. Имя (только в групповом чате).
2. Текст сообщения.
3. Дата и время публикации.
4. Дополнительное меню в правой части записи (три точки, расположенные друг над другом).

Меню доступно только для сообщений текущего пользователя приложения. Меню содержит действия:
1. Удалить запись.
2. Редактировать запись.

#### Поле ввода сообщения

Поле для ввода текста содержит две видимые строки. При вводе более длинного текста он будет смещаться вверх и скрываться. В правой части кнопка для отправки сообщения.

## Вход

### Регистрация пользователя

#### Заполнение формы

1. При регистрации необходимо заполнить все поля.
2. email проходит валидацию, а также проверку на наличие уже зарегистрированного пользователя с таким email.
3. Пароль проходит валидацию, при которой должно быть введено не менее 6 любых символов.
4. Остальные поля должны быть не пустыми.

#### Создание пользователя

1. Новому пользователю присваиваются данные формы и следущий по порядку id в списке пользователей.
2. Список личных чатов очищается. В LocalStorage создаётся новая запись личных чатов для нового пользователя.
3. Новый пользователь по умолчанию добавляется в групповой чат "Флуд".
4. Новый пользователь автоматически становится текущим пользователем.
5. После регистрации происходит переход на страницу личного кабинета.

### Авторизация пользователя

1. Авторизация осуществляется по совпадению введённых электронной почты и пароля с данными одного из пользователей.
2. После авторизации происходит переход на страницу личного кабинета.

### Сброс (инициализация)

1. Выполняется удаление всех новых пользователей и диалогов из стейта и LocalStorage.
2. В стейт и LocalStorage загружаются первоначальные данные из статического файла.

## О React

Вы можете узнать больше о создании React приложения в документации [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
Узнать больше о React в этойдокументации [React documentation](https://reactjs.org/).