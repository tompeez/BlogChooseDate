/**
 * Shows a popup from an "action" type event.
 * @param {AdfActionEvent} actionEvent the event being handled
 */
var dates = [];
var minDate;
var maxDate;

function dateSelectionEventHandler(event) {
    var eventSource = event.getSource();
    var selectedDate = event.getSelectedDate();
    var modifier = event.getModifiers();

    if (modifier.indexOf(AdfRichChooseDate.MULTI_SELECTION) !=  - 1) {
        dates.push(selectedDate);
    }
    else if (modifier.indexOf(AdfRichChooseDate.RANGE_SELECTION) !=  - 1) {
        if (!minDate || (minDate.getTime() > selectedDate.getTime())) {
            minDate = selectedDate;
        }
        if (!maxDate || (maxDate.getTime() < selectedDate.getTime())) {
            maxDate = selectedDate;
        }
        var timeDiff = Math.abs(maxDate.getTime() - minDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        dates = []
        for (var i = 0;i < diffDays;i++) {
            var selDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + i, 0, 0, 0, 0);
            if (!eventSource.isDisabled(selDate))
                dates.push(selDate)
        }
    }
    else if (modifier.indexOf(AdfRichChooseDate.SINGLE_SELECTION) !=  - 1) {
        minDate = null;
        maxDate = null;
        dates = []
        dates.push(selectedDate)
    }
    eventSource.setSelectedDates(dates);
}

function chooseDateLoadEventHandler(event) {
    var eventSource = event.getSource();
    eventSource.setSelectedDates(dates);
}

function processSelectedDates(event) {
    component = event.getSource();
    AdfCustomEvent.queue(component, "processSelectedDates", 
    {
        payload : dates
    },
    true);
    event.cancel();
}