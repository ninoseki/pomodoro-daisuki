timerTemplate = require('templates/timer')

class exports.RestingView extends Backbone.View
    el: "#modal"

    render: ->
        @$(@el).html timerTemplate(title: "resting")
        @$(@el).modal(backdrop: 'static', show: true)

        @$(@el).bind('hidden', ->
            console.log 'hidden'
        )
        @$(@el).bind('shown', ->
            console.log 'shown'
        )

        @

    startTimer: (seconds) =>
        $('#timer').startTimer(seconds: seconds, reset: false, buzzer: @buzzer)

    buzzer: =>
        # show notification
        notification = webkitNotifications.createNotification(
            'build/web/img/tomato_32.png',
            'notification',
            'resting is done!'
        )
        notification.show()

        # hide modal
        @$(@el).modal('hide')

        app.routers.main.navigate('home', true)