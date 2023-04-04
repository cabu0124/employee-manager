import router from '../router';

import { v4 as uuid} from 'uuid';
import { createEmptyEmployee, Employee } from "../models/employee";
import { EmployeeService } from "../services/employee-service";

export class EmployeeEditViewModel {
    private employeeService: EmployeeService;
    public employee!: Employee;

    constructor() {
        this.employeeService = new EmployeeService();
        this.employee = createEmptyEmployee();
    }

    //Load ViewModel
    public load(data:Employee){
        if (data) {
            //Update - Load Employee data
            this.employee = data;
            this.loadEmployee();
        }else{
            //Create - Set a Click EventListener to the Save Button
            const root = document.querySelector('#root');
            const buttonSave = document.getElementById("save-employee");
            const inputEmployeeId = document.getElementById("employee-id") as HTMLInputElement | null;
            if(!root || !buttonSave || !inputEmployeeId)  throw new Error('Failed to load container element');
            inputEmployeeId.value = uuid();
            buttonSave.addEventListener("click", () => {
                this.saveEmployee(true);
                router(root, '/');
            });
        }
        
    }

    private async saveEmployee(isNew:boolean): Promise<void> {

        //Get DOM Elements
        const inputFirstName = document.getElementById("first-name") as HTMLInputElement | null;
        const inputLastName = document.getElementById("last-name") as HTMLInputElement | null;
        const inputEmployeeId = document.getElementById("employee-id") as HTMLInputElement | null;
        const inputEmployeeSsn = document.getElementById("employee-ssn") as HTMLInputElement | null;
        const checkboxStatus = document.getElementById("status") as HTMLInputElement | null;
        if (!inputFirstName || !inputLastName || !inputEmployeeId || !inputEmployeeSsn || !checkboxStatus) throw new Error('Failed to load form elements');

        //Set Employee data to save
        const employeeToSave = {
            FirstName: inputFirstName.value,
            LastName: inputLastName.value,
            PersonID: inputEmployeeId.value,
            SSN: inputEmployeeSsn.value,
            Status: checkboxStatus.checked,
            LastUpdatedBy: isNew ? 'admin' : this.employee.LastUpdatedBy,
            LastUpdatedDate: new Date(),
            EmploymentStartDate: isNew ? new Date() : this.employee.EmploymentStartDate,
            EmploymentEndDate: isNew ? new Date() : this.employee.EmploymentEndDate,
            EmployeeNo: isNew ? '' : this.employee.EmployeeNo,
        };

        try {
            const response = await (isNew ? this.employeeService.createEmployee(employeeToSave) : this.employeeService.updateEmployee(employeeToSave));
            console.log(response);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to Create or Update Employee');
        }

    }

    private loadEmployee(): void {
        //Get DOM Elements
        const root = document.querySelector('#root');
        const fullName =  document.getElementById("employee-full-name");
        const inputFirstName = document.getElementById("first-name") as HTMLInputElement | null;
        const inputLastName = document.getElementById("last-name") as HTMLInputElement | null;
        const inputEmployeeId = document.getElementById("employee-id") as HTMLInputElement | null;
        const inputEmployeeSsn = document.getElementById("employee-ssn") as HTMLInputElement | null;
        const checkboxStatus = document.getElementById("status") as HTMLInputElement | null;
        const buttonSave = document.getElementById("save-employee");
        const buttonEmployeeList = document.getElementById("return-employee-list");
        if (!root || !fullName || !inputFirstName || !inputLastName || !inputEmployeeId || !inputEmployeeSsn || !checkboxStatus || !buttonSave || !buttonEmployeeList)
            throw new Error('Failed to load form elements');

        //Load employee data into the form
        fullName.innerText = `${this.employee.FirstName} ${this.employee.LastName}`;
        inputFirstName.value = this.employee.FirstName;
        inputLastName.value = this.employee.LastName;
        inputEmployeeId.value = this.employee.PersonID;
        inputEmployeeSsn.value = this.employee.SSN;
        checkboxStatus.checked = this.employee.Status;

        //Set a Click EventListener to the Save Button
        buttonEmployeeList.addEventListener("click", () => {
            router(root, '/');
        });
        
        //Set a Click EventListener to the Save Button
        buttonSave.addEventListener("click", () => {
            this.saveEmployee(false);
            router(root, '/');
        });
    }
}