//UC1
class EmployeeData{

    get id(){ return this._id;}
    set id(id){
            this._id=id;
    }
    get name(){ return this._name;}
    set name(name){
    let Name_Reg=RegExp('^[A-Z]{1}[a-z]{2,}');
            if(Name_Reg.test(name))
            {
                this._name=name;
            }
            else
            {
                throw 'Name is incorrect !';
            }
    }
    get profilePic(){return this._profilePic; }
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get gender(){ return this._gender;}
    set gender(gender){
            this._gender=gender;
        
    }
    get department(){ return this._department;}
    set department(department){
            this._department=department;
        
    }
   get salary(){return this._salary;}
    set salary(salary){
            this._salary = salary;
        
    }
   
    get note(){ return this._note;}
    set note(note){
            this._note=note;
       
    }
    get startdate(){ return this._startdate;}
    set startdate(startdate){{
            this._startdate=startdate;
    }
      
    }
   
    tostring()
    {
        const options ={year : 'numeric',month :'short',day : 'numeric'};
        const empDate = !this.startdate ? "undefined":
                        this.startdate.toLocaleDateString("en-GB",options);
        return "Id = "+this.id +" , Name = "+this.name+" , Gender = "+ this.gender+" , profilePic = "+this.profilePic+" , Department = "+ this.department+" , Salary = "+this.salary+" StartDate = "+empDate+" , note = "+ this.note;
    }

    
}
