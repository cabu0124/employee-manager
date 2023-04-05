import router from '../router';

import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employee-service";

export class EmployeeListViewModel {
    private employeeService: EmployeeService;
    public employees: Employee[];

    constructor() {
        this.employeeService = new EmployeeService();
        this.employees = [];
    }

    //Load ViewModel
    public load() {
        this.getEmployees();
    }

    //Get Employees from Employee service
    private async getEmployees(): Promise<void> {
        try {
          const employees = await this.employeeService.getEmployees();
          this.employees = employees;
          const container = document.getElementById("employee-list");
          container ? this.loadEmployees(container): console.error("Employees no found");
        } catch (error) {
          console.error(error);
        }
    }

    //Load Employees List into the DOM and set EventListeners
    private loadEmployees(table: HTMLElement): void {
        if (!table) return;
        const tbody = table.querySelector("tbody");
        if (!tbody) return;
        
        //Load Employees List into the table
        const rows = this.employees.map(this.generateTableRow).join("");
        tbody.innerHTML = rows;

        //Get Buttons List
        const editButtons = tbody.querySelectorAll('[id^="edit-employee-"]');
        const deleteButtons = tbody.querySelectorAll('[id^="delete-employee-"]');

        const root = document.querySelector('#root');
        const buttonAdd = document.getElementById("add-employee");
        if(!root || !buttonAdd)  throw new Error('Failed to load container element');
        
        buttonAdd.addEventListener("click", () => {
            this.setNewEmployee(root);
        });

        //Set a Click EventListener to All Edit Buttons
        editButtons.forEach((button) => {
            const employeeId = button.getAttribute("data-employeeid");
            if(!root)  throw new Error('Failed to load container element');
            button.addEventListener("click", () => {
                // Aquí se puede agregar la lógica para editar el empleado correspondiente
                this.employees.forEach(employee => {
                    if(employee.PersonID == employeeId){
                        router(root, 'edit', employee);
                    }
                });
                
            });
        });

        //Set a Click EventListener to All Delete Buttons
        deleteButtons.forEach((button) => {
            const employeeId = button.getAttribute("data-employeeid");
            const deleteModal = document.getElementById("modal-content");
            const deleteConfirm = document.getElementById("modal-confirm");
            const deleteCancel = document.getElementById("modal-cancel");
            const deleteMessage = document.getElementById("modal-message");
            if (!employeeId || !deleteModal || !deleteConfirm || !deleteCancel || !deleteMessage) throw new Error('Failed to load Modal elements');

            button.addEventListener("click", () => {
                //Open Modal
                deleteMessage.innerHTML = `
                    <div class="text-center col-3" style="font-size:5rem;">
                        <i class="bi text-danger bi-exclamation-triangle-fill"></i>
                    </div>
                    <div class="col-9 pt-3">
                        <span class="fs-3">Are you sure you want to remove this employee?</span>
                    </div>
                `;
                deleteConfirm.innerText = 'YES, REMOVE';
                deleteCancel.innerText = 'CANCEL';
                deleteModal.style.display = "block";

                //Set a Click EventListener to Confirm Delete
                deleteConfirm.addEventListener("click", () => {
                    //Call Employee service to delete employee
                    try {
                        const response = this.employeeService.deleteEmployee(employeeId);
                        console.log(response);
                    } catch (error) {
                        console.error(error);
                        throw new Error('Failed to Delete Employee');
                    }
                    deleteModal.style.display = "none";
                    router(root, '/');
                });

                //Set a Click EventListener to Cancel Delete
                deleteCancel.addEventListener("click", () => {
                    deleteModal.style.display = "none";
                });
            });
        });
    }

    private setNewEmployee(root:Element){
        let employeesNoArr: string[] = [];
        this.employees.forEach(employee => {
            employeesNoArr.push(employee.EmployeeNo);
        });
        router(root, 'edit', this.generateUniqueNumber(employeesNoArr));
    }

    private generateUniqueNumber(array: string[]): string {
        let randomNumber: number;
        let stringNumber: string;
        
        do {
            // Generate a random number
            randomNumber = Math.floor(Math.random() * 1000);
        
            // Convert the number to a string
            stringNumber = randomNumber.toString();
        } while (array.includes(stringNumber)); // Check if the number is already in the array
        
        return stringNumber;
    }

    //Generate table row
    private generateTableRow(employee: Employee): string{
        const status = employee.Status
            ? '<div class="bg-success text-white rounded-5 text-center mx-auto" style="width: 6rem; height:2rem;"><span class="align-middle">ACTIVE</span></div>'
            : '<div class="bg-danger text-white rounded-5 text-center mx-auto" style="width: 6rem; height:2rem;"><span class="align-middle">INACTIVE</div>';
        return `
            <tr>
            <td>${employee.PersonID}</td>
            <td>${employee.FirstName}</td>
            <td>${employee.LastName}</td>
            <td>${status}</td>
            <td class="text-center">
                <button data-employeeid="${employee.PersonID}" id="edit-employee-${employee.PersonID}" type="button" class="btn text-secondary py-0 px-1">
                    <div style="font-size:1.5rem;"><i class="bi bi-pencil-square"></i></div>
                </button>
                <button data-employeeid="${employee.PersonID}" id="delete-employee-${employee.PersonID}" type="button" class="btn text-secondary py-0 px-1">
                    <div style="font-size:1.5rem;"><i class="bi bi-trash-fill"></i></div>
                </button>
            </td>
            </tr>
        `;
    }
}