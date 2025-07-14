# Иконки заклинаний Invoker

## 📁 Структура папок

```
public/
└── images/
    └── spells/
        ├── cold-snap.webp
        ├── ghost-walk.webp
        ├── ice-wall.webp
        ├── emp.webp
        ├── tornado.webp
        ├── alacrity.webp
        ├── sun-strike.webp
        ├── forge-spirit.webp
        ├── chaos-meteor.webp
        └── deafening-blast.webp
```

## 🎯 Как добавить иконки

1. **Поместите .webp файлы** в папку `public/images/spells/`
2. **Используйте правильные имена файлов** (как указано выше)
3. **Обновите данные заклинаний** в `src/data/spells.ts`:

```typescript
{
  name: 'Cold Snap',
  combination: ['Q', 'Q', 'Q'],
  icon: '/images/spells/cold-snap.webp', // Замените эмодзи на путь к файлу
  description: 'Freezes the target with ice'
}
```

## 🔧 Компонент SpellIcon

Используется для отображения иконок в игре:

```typescript
import SpellIcon from './components/SpellIcon';

// Для эмодзи
<SpellIcon icon="❄️" size="lg" />

// Для изображений
<SpellIcon icon="/images/spells/cold-snap.webp" size="lg" />
```

## 📏 Размеры иконок

- `sm`: 16x16px (w-4 h-4)
- `md`: 24x24px (w-6 h-6) 
- `lg`: 32x32px (w-8 h-8)
- `xl`: 48x48px (w-12 h-12)

## 💡 Рекомендации

- Используйте формат **.webp** для лучшей производительности
- Размер иконок: **64x64px** или **128x128px**
- Прозрачный фон для лучшего отображения
- Сохраняйте единый стиль для всех иконок

## 🎮 Текущее состояние

Сейчас используются эмодзи как заглушки. Замените их на реальные иконки, изменив поле `icon` в `src/data/spells.ts`. 