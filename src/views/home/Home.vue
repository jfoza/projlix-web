<template>
  <div
    :style="getBackgroundImageStyles"
  >
    <DigitalClock />
  </div>
</template>

<script>
import DigitalClock from '@/views/components/custom/DigitalClock.vue'

import b1 from '@/assets/images/custom/banner/b1.jpg'
import b2 from '@/assets/images/custom/banner/b2.jpg'
import b3 from '@/assets/images/custom/banner/b3.jpg'
import b4 from '@/assets/images/custom/banner/b4.jpg'
import b5 from '@/assets/images/custom/banner/b5.jpg'
import b6 from '@/assets/images/custom/banner/b6.jpg'
import b7 from '@/assets/images/custom/banner/b7.jpg'
import b8 from '@/assets/images/custom/banner/b8.jpg'

export default {
  components: {
    DigitalClock,
  },

  data() {
    return {
      b1, b2, b3, b4, b5, b6, b7, b8,
    }
  },

  computed: {
    getBackgroundImageStyles() {
      const image = this.getImage()

      return {
        backgroundImage: `url(${image})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }
    },
  },

  methods: {
    getRandomNightImage() {
      const images = [this.b1, this.b2, this.b3, this.b4]

      const randomIndex = Math.floor(Math.random() * images.length)

      return images[randomIndex]
    },

    getRandomDayImage() {
      const images = [this.b5, this.b6, this.b7, this.b8]

      const randomIndex = Math.floor(Math.random() * images.length)

      return images[randomIndex]
    },

    getImage() {
      const now = new Date()

      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const limitHour = 18
      const limitMinute = 30

      if (currentHour > limitHour || (currentHour === limitHour && currentMinute >= limitMinute)) {
        return this.getRandomNightImage()
      }

      return this.getRandomDayImage()
    },
  },
}
</script>
