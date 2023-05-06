let isUpdate=false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error',"");
            return;
        }
        try {
            (new EmployeeData()).name = name.value;;
            setTextValue('.text-error',"");
        }
        catch (e) {
            setTextValue('.text-error',e);
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
    output.textContent = salary.value;

    });
    const date = document.querySelector('#date');
  
   
    checkForUpdate();
});
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
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
const createEmployeeData = (id) => {
    let employeeData = new EmployeeData();
   if(!id) employeeData.id = createNewEmplooyeeId();
    else  employeeData.id=id;
    setEmployeePayrollData(employeeData);
    return employeeData;

}


const setEmployeePayrollData=(employeeData)=>{
    try{
        employeeData.name=employeePayrollObj.name ;
    }
    catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeeData.profilePic = employeePayrollObj.profilePic;
    employeeData.gender=employeePayrollObj.gender;
    employeeData.department=employeePayrollObj.department;
    employeeData.salary=employeePayrollObj.salary;
    employeeData.note=employeePayrollObj.note;
    try{
        employeeData.startdate= new Date(Date.parse(employeePayrollObj.startdate));
    }
    catch(e)
    {
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeeData.toString());
}
const createNewEmplooyeeId=()=>{
    let empID =localStorage.getItem("EmployeeID");
    empID =!empID ?1:(parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}

const createAndUpdateStorage=()=>{
    let employeeDataList=[];
    employeeDataList = JSON.parse(localStorage.getItem("EmployeeDataList"));
    if(employeeDataList)
    {
        let employeeData =employeePayrollList.filter(empData=>empData._id==employeePayrollObj._id);
        if (!employeeData) 
        {
            employeeDataList.push(createEmployeeData());
        }
        else{
            const index = employeeDataList.map(empData=>empData._id).indexOf(employeePayrollObj._id);
            employeeDataList.splice(index,1,createEmployeeData(employeeData._id));
        }
    }
    else
    {
        employeeDataList=[employeeData];
    }
    localStorage.setItem("EmployeeDataList",JSON.stringify(employeeDataList));
    
    
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
let date = stringifyDate(employeePayrollObj._startdate).split(" ");
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
const setEmployeePayrollObject=()=>{
    employeePayrollObj.name = getInputValueById('#name');
    employeePayrollObj.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj.department = getSelectedValues('[name=department]');
    employeePayrollObj.salary = getInputValueById('#salary');
    employeePayrollObj.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj.date = date;
}