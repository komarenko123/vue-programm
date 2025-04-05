<template>
  <div class="tarot-app" :style="{ backgroundImage: 'url(/images/bg.jpg)' }">
    <div class="card-container">
      <TarotCard
        v-for="(card, index) in currentDeck"
        :key="index"
        :card-image="card.image"
        :card-name="card.name"
        :card-meaning="card.meaning"
        :is-selected="selectedIndexes.includes(index)"
        :can-select="canSelect"
        @card-selected="handleCardSelect(index, $event)"
      />
    </div>
    <button 
      v-if="selectedIndexes.length === 3" 
      class="continue-button"
      @click="closeApp"
    >
      Продолжить
    </button>
  </div>
</template>

<script>
import TarotCard from './components/TarotCard.vue'

export default {
  components: { TarotCard },
  data() {
    return {
      fullDeck: Array.from({ length: 78 }, (_, i) => `images/card${i + 1}.jpg`),
      currentDeck: [],
      selectedIndexes: [],
      canSelect: true,
      meanings: {
        'images/card1.jpg': 'Шут: Начало нового пути, спонтанность, невинность, приключения',
    'images/card2.jpg': 'Маг: Сила воли, творчество, мастерство, концентрация',
    'images/card3.jpg': 'Верховная Жрица: Интуиция, тайное знание, мудрость, подсознание',
    'images/card4.jpg': 'Императрица: Плодородие, изобилие, природа, материнство',
    'images/card5.jpg': 'Император: Авторитет, структура, контроль, стабильность',
    'images/card6.jpg': 'Иерофант: Традиции, духовность, обучение, конформизм',
    'images/card7.jpg': 'Влюбленные: Любовь, гармония, отношения, выбор',
    'images/card8.jpg': 'Колесница: Победа, контроль, движение, амбиции',
    'images/card9.jpg': 'Сила: Мужество, терпение, сострадание, внутренняя сила',
    'images/card10.jpg': 'Отшельник: Самоанализ, одиночество, мудрость, поиск истины',
    'images/card11.jpg': 'Колесо Фортуны: Судьба, удача, циклы, перемены',
    'images/card12.jpg': 'Справедливость: Баланс, правда, закон, карма',
    'images/card13.jpg': 'Повешенный: Жертва, сдача, новый взгляд, ожидание',
    'images/card14.jpg': 'Смерть: Преобразование, конец, переход, обновление',
    'images/card15.jpg': 'Умеренность: Гармония, терпение, баланс, исцеление',
    'images/card16.jpg': 'Дьявол: Оковы, искушение, материализм, зависимость',
    'images/card17.jpg': 'Башня: Внезапные изменения, разрушение, откровение',
    'images/card18.jpg': 'Звезда: Надежда, вера, вдохновение, духовность',
    'images/card19.jpg': 'Луна: Иллюзии, страх, подсознание, интуиция',
    'images/card20.jpg': 'Солнце: Радость, успех, жизненная сила, ясность',
    'images/card21.jpg': 'Суд: Возрождение, призыв, прощение, трансформация',
    'images/card22.jpg': 'Мир: Завершение, целостность, достижение, гармония',
    // Мечи
    'images/card23.jpg': 'Туз Мечей: Победа, ясность, прорыв, новые идеи',
    'images/card24.jpg': 'Двойка Мечей: Тупик, выбор, равновесие, компромисс',
    'images/card25.jpg': 'Тройка Мечей: Сердечная боль, печаль, конфликт, разлука',
    'images/card26.jpg': 'Четверка Мечей: Отдых, восстановление, медитация, покой',
    'images/card27.jpg': 'Пятерка Мечей: Конфликт, поражение, раздор, напряжение',
    'images/card28.jpg': 'Шестерка Мечей: Переход, движение вперед, исцеление',
    'images/card29.jpg': 'Семерка Мечей: Обман, стратегия, скрытые мотивы',
    'images/card30.jpg': 'Восьмерка Мечей: Ограничения, беспомощность, самоограничение',
    'images/card31.jpg': 'Девятка Мечей: Тревога, кошмары, депрессия, страх',
    'images/card32.jpg': 'Десятка Мечей: Конец, предательство, потеря, кризис',
    'images/card33.jpg': 'Паж Мечей: Любознательность, новости, бдительность',
    'images/card34.jpg': 'Рыцарь Мечей: Решительность, действие, конфронтация',
    'images/card35.jpg': 'Королева Мечей: Независимость, ясность, объективность',
    'images/card36.jpg': 'Король Мечей: Интеллект, авторитет, справедливость',
    // Жезлы
    'images/card37.jpg': 'Туз Жезлов: Вдохновение, энергия, страсть, новые начинания',
    'images/card38.jpg': 'Двойка Жезлов: Планирование, решение, будущее, потенциал',
    'images/card39.jpg': 'Тройка Жезлов: Расширение, рост, сотрудничество',
    'images/card40.jpg': 'Четверка Жезлов: Праздник, гармония, дом, стабильность',
    'images/card41.jpg': 'Пятерка Жезлов: Конфликт, соперничество, вызов',
    'images/card42.jpg': 'Шестерка Жезлов: Победа, успех, признание, триумф',
    'images/card43.jpg': 'Семерка Жезлов: Защита, настойчивость, отстаивание позиции',
    'images/card44.jpg': 'Восьмерка Жезлов: Движение, скорость, прогресс, новости',
    'images/card45.jpg': 'Девятка Жезлов: Стойкость, защита, упорство, бдительность',
    'images/card46.jpg': 'Десятка Жезлов: Бремя, ответственность, тяжелая работа',
    'images/card47.jpg': 'Паж Жезлов: Энтузиазм, новости, творчество, энергия',
    'images/card48.jpg': 'Рыцарь Жезлов: Действие, приключения, импульсивность',
    'images/card49.jpg': 'Королева Жезлов: Уверенность, харизма, оптимизм, щедрость',
    'images/card50.jpg': 'Король Жезлов: Лидерство, амбиции, предпринимательство',
    // Пентакли
    'images/card51.jpg': 'Туз Пентаклей: Процветание, новые возможности, безопасность',
    'images/card52.jpg': 'Двойка Пентаклей: Баланс, адаптация, гибкость, ресурсы',
    'images/card53.jpg': 'Тройка Пентаклей: Работа в команде, мастерство, сотрудничество',
    'images/card54.jpg': 'Четверка Пентаклей: Консерватизм, безопасность, контроль',
    'images/card55.jpg': 'Пятерка Пентаклей: Финансовые трудности, лишения',
    'images/card56.jpg': 'Шестерка Пентаклей: Щедрость, благотворительность, помощь',
    'images/card57.jpg': 'Семерка Пентаклей: Терпение, инвестиции, долгосрочные планы',
    'images/card58.jpg': 'Восьмерка Пентаклей: Ремесло, качество, профессионализм',
    'images/card59.jpg': 'Девятка Пентаклей: Удовольствие, комфорт, самодостаточность',
    'images/card60.jpg': 'Десятка Пентаклей: Богатство, семья, наследие, стабильность',
    'images/card61.jpg': 'Паж Пентаклей: Обучение, изучение, новые навыки',
    'images/card62.jpg': 'Рыцарь Пентаклей: Надежность, трудолюбие, методичность',
    'images/card63.jpg': 'Королева Пентаклей: Забота, практичность, благополучие',
    'images/card64.jpg': 'Король Пентаклей: Богатство, бизнес, безопасность, лидерство',
    // Кубки
    'images/card65.jpg': 'Туз Кубков: Любовь, новые чувства, эмоциональное начало',
    'images/card66.jpg': 'Двойка Кубков: Связь, партнерство, гармония, союз',
    'images/card67.jpg': 'Тройка Кубков: Празднование, дружба, радость, общение',
    'images/card68.jpg': 'Четверка Кубков: Апатия, упущенные возможности, созерцание',
    'images/card69.jpg': 'Пятерка Кубков: Потеря, сожаление, разочарование',
    'images/card70.jpg': 'Шестерка Кубков: Ностальгия, детство, невинность, радость',
    'images/card71.jpg': 'Семерка Кубков: Иллюзии, выбор, мечты, фантазии',
    'images/card72.jpg': 'Восьмерка Кубков: Уход, поиск, отступление, разочарование',
    'images/card73.jpg': 'Девятка Кубков: Удовлетворение, удовольствие, комфорт',
    'images/card74.jpg': 'Десятка Кубков: Гармония, счастье, семья, радость',
    'images/card75.jpg': 'Паж Кубков: Чувствительность, мечтательность, творчество',
    'images/card76.jpg': 'Рыцарь Кубков: Романтика, очарование, эмоциональность',
    'images/card77.jpg': 'Королева Кубков: Забота, интуиция, сострадание, исцеление',
    'images/card78.jpg': 'Король Кубков: Эмоциональная зрелость, мудрость, сострадание'
      }
    }
  },
  created() {
    this.initializeDeck()
  },
  methods: {
    initializeDeck() {
      const shuffled = [...this.fullDeck]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }

      this.currentDeck = shuffled.slice(0, 5).map(image => {
        const meaning = this.meanings[image] || 'Неизвестная карта: Нет описания'
        const [name, meaningText] = meaning.split(':')
        return {
          image,
          name: name.trim(),
          meaning: meaningText?.trim() || 'Нет описания'
        }
      })
    },
    handleCardSelect(index, { image }) {
      if (!this.canSelect || this.selectedIndexes.includes(index)) return

      this.selectedIndexes.push(index)

      if (this.selectedIndexes.length === 3) {
        this.canSelect = false
        this.sendToTelegram()
      }
    },
    sendToTelegram() {
      const selectedCards = this.selectedIndexes.map(i => this.currentDeck[i])
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(
          JSON.stringify({
            method: 'tarot_reading',
            cards: selectedCards.map(c => c.name),
            meanings: selectedCards.map(c => c.meaning)
          })
        )
      }
    },
    closeApp() {
      if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.close()
      }
    }
  }
}
</script>

<style scoped>
.tarot-app {
  min-height: 100vh;
  padding: 10px 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent; /* Убирает синий highlight при тапе */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 15px;
  padding: 0 5px;
  box-sizing: border-box;
}

.continue-button {
  background: linear-gradient(145deg, #5a3921, #3d2615);
  color: #f0e6d2;
  border: none;
  border-radius: 25px;
  padding: 14px 32px; /* Увеличенные тап-зоны */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 10px 0 20px;
  position: relative;
  overflow: hidden;
  min-width: 180px; /* Фиксированная ширина для стабильности */
  touch-action: manipulation;
}

/* Адаптивные изменения */
@media (max-width: 480px) {
  .card-container {
    gap: 6px;
  }
  
  .continue-button {
    padding: 12px 28px;
    font-size: 15px;
    min-width: 160px;
  }
}

@media (max-width: 360px) {
  .continue-button {
    padding: 10px 24px;
    font-size: 14px;
    min-width: 140px;
  }
}

.continue-button:hover,
.continue-button:focus {
  background: linear-gradient(145deg, #8b7355, #5a3921);
  transform: translateY(-2px);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.continue-button:active {
  transform: translateY(1px);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.continue-button::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 215, 0, 0.1),
    rgba(255, 215, 0, 0) 50%
  );
  transform: rotate(30deg);
  opacity: 0;
  transition: opacity 0.3s;
}

.continue-button:hover::after,
.continue-button:focus::after {
  opacity: 0.4;
}
</style>