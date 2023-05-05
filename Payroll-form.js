let isUpdate=false;
let employeePayrollObj={};
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
    checkForUpdate();
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
    setValue('#notes', '');
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

const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson ?true:false;
    if(!isUpdate)
    {
        return;
    }
    employeePayrollObj =JSON.parse(employeePayrollJson);
    setForm();

}
const setForm=()=>{
setValue('#name',employeePayrollObj._name);
setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
setSelectedValues('[name=gender]',employeePayrollObj._grnder);
setSelectedValues('[name=department]',employeePayrollObj._department);
setValue('#salary',employeePayrollObj._salary);
setTextValue('.salary-output',employeePayrollObj._salary);
setValue('#notes',employeePayrollObj._note);
let date = stringifyDate(employeePayrollObj._StartDate).split(" ");
setValue('#day',date[0]);
setValue('#month',date[1]);
setValue('#year',date[2]);

}
const setSelectedValues=(propertyValue,value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value))
        {
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value == value)
        {
            item.checked=true;
        }
    })
}