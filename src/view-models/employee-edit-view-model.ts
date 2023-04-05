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
    public load(data:string | Employee | null): void{
        try {
            if (typeof data === "string") {
                //Create - Set a Click EventListener to the Save Button
                const root = document.querySelector('#root');
                const buttonSave = document.getElementById("save-employee");
                const buttonEmployeeList = document.getElementById("return-employee-list");
                const inputEmployeeId = document.getElementById("employee-id") as HTMLInputElement | null;
                if(!root || !buttonSave || !buttonEmployeeList || !inputEmployeeId)  throw new Error('Failed to load container element');
                inputEmployeeId.value = uuid();
                this.employee.EmployeeNo = data;

                buttonSave.addEventListener("click", () => {
                    this.saveEmployee(true);
                });
    
                //Set a Click EventListener to the Return Button
                buttonEmployeeList.addEventListener("click", () => {
                    router(root, '/');
                });
            }else if (data != null){
                //Update - Load Employee data
                this.employee = data as Employee;
                this.loadEmployee();
            }else{
                return;
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    private async saveEmployee(isNew:boolean): Promise<void> {

        //Get DOM Elements
        const root = document.querySelector('#root');
        const inputFirstName = document.getElementById("first-name") as HTMLInputElement | null;
        const inputLastName = document.getElementById("last-name") as HTMLInputElement | null;
        const inputEmployeeId = document.getElementById("employee-id") as HTMLInputElement | null;
        const inputEmployeeSsn = document.getElementById("employee-ssn") as HTMLInputElement | null;
        const checkboxStatus = document.getElementById("status") as HTMLInputElement | null;
        if (!root || !inputFirstName || !inputLastName || !inputEmployeeId || !inputEmployeeSsn || !checkboxStatus)
            throw new Error('Failed to load form elements');

        //Set Employee data to save
        const employeeToSave = {
            FirstName: inputFirstName.value,
            LastName: inputLastName.value,
            PersonID: inputEmployeeId.value,
            SSN: inputEmployeeSsn.value,
            Status: checkboxStatus.checked ? 1 : 0,
            LastUpdatedBy: isNew ? 'admin' : this.employee.LastUpdatedBy,
            LastUpdatedDate: new Date(),
            EmploymentStartDate: isNew ? new Date() : this.employee.EmploymentStartDate,
            EmploymentEndDate: isNew ? new Date() : this.employee.EmploymentEndDate,
            EmployeeNo: this.employee.EmployeeNo,
        };

        try {
            const response = await (isNew ? this.employeeService.createEmployee(employeeToSave) : this.employeeService.updateEmployee(employeeToSave));
            console.log(response);
            router(root, '/');
        } catch (error:any) {
            this.showErrorMessage(error.message);
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
        checkboxStatus.checked = this.employee.Status == 0 ? false: true;

        //Set a Click EventListener to the Return Button
        buttonEmployeeList.addEventListener("click", () => {
            router(root, '/');
        });
        
        //Set a Click EventListener to the Save Button
        buttonSave.addEventListener("click", () => {
            try {
                this.saveEmployee(false);
            } catch (error) {
                console.log(error);
            }
        });
    }

    private showErrorMessage(message:string){
        const root = document.querySelector('#root');
        if (!root)
            throw new Error('Failed to load form elements');

        root.innerHTML += `
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast align-items-center text-white bg-danger border-0 fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        `;
    }
}