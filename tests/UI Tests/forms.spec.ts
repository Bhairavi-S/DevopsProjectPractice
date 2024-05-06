import { test, expect } from '@playwright/test';
import form from '../../Pages/form';
import { formData } from '../../spec/formData';
import { resuablefunction } from '../../Pages/resusablefunction';

test("Test 01 - Form - Practice form - Verify user can submit the form.", async ({ page }) => {
    const Form = new form(page);
    const resuableFunction = new resuablefunction(page);
    await resuableFunction.navigateURL()
    await resuableFunction.clickConsent()
    // await resuableFunction.handelAdds()
    await resuableFunction.clickElement()
    await Form.clickForm();
    await Form.clickPracticeForm();
    const Formdata = formData.getFormData();
    await Form.fillPracticeForm(Formdata.firstName, Formdata.lastName,
        Formdata.email, Formdata.mobile, Formdata.dateOfBirth, Formdata.subjects, Formdata.currentAddress);
    await Form.clickMaleGender();
    await Form.clickHobbiesReading();
    await Form.selectState('Rajasthan');
    await Form.selectCity('Jaipur');
    await Form.clickSubmitButton();
    await Form.getResultMessage();
    await Form.printMessage();
    await Form.clickClose();   
});