package de.hahn.blog.choosedate.view;

import java.util.ArrayList;

import oracle.adf.share.logging.ADFLogger;
import oracle.adf.view.rich.component.rich.input.RichInputText;
import oracle.adf.view.rich.context.AdfFacesContext;
import oracle.adf.view.rich.render.ClientEvent;

public class ChooseDateBean {
    private static ADFLogger _logger = ADFLogger.createADFLogger(ChooseDateBean.class);
    private RichInputText selectedDates;
    private String selectedDatesString;

    public ChooseDateBean() {
    }

    public void procressSelectedDates(ClientEvent clientEvent) {
        ArrayList selDates = (ArrayList) clientEvent.getParameters().get("payload");
        if (selDates != null) {
            _logger.info("---" + selDates);
            setSelectedDatesString(selDates.toString());
        } else {
            setSelectedDatesString("");
        }
        AdfFacesContext.getCurrentInstance().addPartialTarget(getSelectedDates());
    }

    public void setSelectedDates(RichInputText selectedDates) {
        this.selectedDates = selectedDates;
    }

    public RichInputText getSelectedDates() {
        return selectedDates;
    }

    public void setSelectedDatesString(String selectedDatesString) {
        this.selectedDatesString = selectedDatesString;
    }

    public String getSelectedDatesString() {
        return selectedDatesString;
    }
}
