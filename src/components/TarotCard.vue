<template>
  <div class="tarot-card" @click="selectCard">
    <div class="card-inner" :class="{ flipped: isSelected }">
      <div class="card-face card-back">
        <img src="/images/backside.jpg" alt="Back" />
      </div>
      <div class="card-face card-front">
        <img :src="cardImage" :alt="cardName" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardImage: String,
    cardName: String,
    cardMeaning: String,
    isSelected: Boolean,
    canSelect: Boolean
  },
  methods: {
    selectCard() {
      if (this.canSelect && !this.isSelected) {
        this.$emit('card-selected', { image: this.cardImage })
      }
    }
  }
}
</script>

<style scoped>
.tarot-card {
  width: 100px;
  height: 160px;
  perspective: 1000px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  backface-visibility: hidden;
}

.card-back {
  background: #000;
}

.card-front {
  transform: rotateY(180deg);
}
.card-face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
