timerTemplate = require('templates/timer')

class exports.WorkingView extends Backbone.View
    el: "#modal"
    
    render: ->
        @$(@el).html timerTemplate(title: "working")
        @$(@el).modal(backdrop: 'static', show: true)
        @

    startTimer: (seconds) =>
        $('#timer').startTimer(seconds: seconds, reset: false, buzzer: @buzzer)

    buzzer: =>
        # add pomodoro
        app.collections.pomodoros.create(created_at: new Date().getTime())
        
        # show notification
        notification = webkitNotifications.createNotification(
            'build/web/img/tomato_32.png',
            'notification',
            'pomodoro is done!'
        )
        notification.show()
        
        # hide modal
        @$(@el).modal('hide')

        app.routers.main.navigate('home', true)