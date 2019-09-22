const socket = io();

Vue.component('chat-message', {
  props: ['message'],
  template: `
  <div class="message">
    <div class="message-content z-depth-1">
      {{message.text}}
    </div>
  </div>
  `
})

new Vue({
  el: '#app',
  data () {
    return {
      message: '',
      messages: []
    }
  },
  mounted () {
    this.initializeConnection()
  },
  methods: {
    sendMessage (e) {
      const message = {
        text: this.message
      }

      socket.emit('message:create', message, err => {
        if (err) {
          console.error(err);
        } else {
          this.message = '';
        }
      })
    },
    initializeConnection () {
      socket.on('message:new', message => {
        this.messages.push(message);
      })
    }
  }
})
