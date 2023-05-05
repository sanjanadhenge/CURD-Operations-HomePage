window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeeData()).name = name.value;;
            textError.textContent = "";
        }
        catch (e) {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;

    });
});
const save = () => {
    try {
        let employeeData = createEmployeeData();
        createAndUpdateStorage(employeeData);
    }
    catch (e) {
        return;
    }
}
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#note', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');


}
const createEmployeeData = () => {
    let employeeData = new EmployeeData();
    try {
        employeeData.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e)
        throw e;
    }
    employeeData.profilePic = getSelectedValues('[name=profile]').pop();
    employeeData.gender = getSelectedValues('[name=gender]').pop();
    employeeData.department = getSelectedValues('[name=department]');
    employeeData.salary = getInputValueById('#salary');
    employeeData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeeData.date = date;
    alert(employeeData.tostring());
    return employeeData;

}
function createAndUpdateStorage(employeeData) {
    let employeeDataList=[];
    employeeDataList = JSON.parse(localStorage.getItem("EmployeeDataList"));
    if (employeeDataList != undefined) {
        employeeDataList.push(employeeData);
    }
    else {
        employeeDataList = [employeeData];
    }
    //alert(employeeData.tostring());
    localStorage.setItem("EmployeeDataList", JSON.stringify(employeeDataList));
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
      if(item.checked)selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
     return value;
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
