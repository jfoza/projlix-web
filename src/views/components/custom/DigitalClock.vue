<template>
  <div id="clock">
    <div class="clock-container">
      <p class="date">
        {{ date }}
      </p>
      <p class="time">
        {{ time }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      time: '',
      date: '',
    }
  },
  created() {
    this.updateTime()
    this.timerID = setInterval(this.updateTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timerID)
  },
  methods: {
    updateTime() {
      const cd = new Date()
      this.time = `${this.zeroPadding(cd.getHours(), 2)
      }:${
        this.zeroPadding(cd.getMinutes(), 2)
      }:${
        this.zeroPadding(cd.getSeconds(), 2)}`
      this.date = `${this.zeroPadding(cd.getFullYear(), 4)
      }/${
        this.zeroPadding(cd.getMonth() + 1, 2)
      }/${
        this.zeroPadding(cd.getDate(), 2)
      } ${
        ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][cd.getDay()]}`
    },
    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
  },
}
</script>

<style scoped lang="scss">
  #clock {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-left: 30px;
    padding-bottom: 50px;
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
  }

  .clock-container {
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }

  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
    margin-bottom: 3rem;
  }

  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }

  @media (width < 500px) {
    #clock {
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      padding-left: 0;
    }

    .time {
      font-size: 50px;
    }
  }
</style>
