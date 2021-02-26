export const dataPersonalChat = [
  {
    personId: 1,
    dialog: [
      {
        me: true,
        data: new Date(2021, 1, 24, 12, 15, 25),
        text: 'Привет! Как дела?'
      },
      {
        me: false,
        data: new Date(2021, 1, 24, 12, 15, 38),
        text: 'Отлично! Сам как?'
      },
      {
        me: true,
        data: new Date(2021, 1, 24, 12, 15, 57),
        text: 'На обед пошёл. В столовке стою в очереди.'
      },
      {
        me: false,
        data: new Date(2021, 1, 24, 12, 16, 30),
        text: 'Жди. Скоро тоже подойду.'
      }
    ]
  },
  {
    personId: 3,
    dialog: [
      {
        me: false,
        data: new Date(2021, 1, 25, 8, 15, 25),
        text: 'Доброе утро. Зайди ко мне в кабинет, когда на работу приедешь.'
      },
      {
        me: true,
        data: new Date(2021, 1, 28, 12, 15, 38),
        text: 'Здравствуйте. Хорошо.'
      }
    ]
  }
]