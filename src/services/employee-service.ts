import { Employee } from "../models/employee";

export class EmployeeService {
    private apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    private apiKey = import.meta.env.VITE_API_KEY || "";

    public async getEmployees(): Promise<Employee[]> {
        const response = await fetch(`${this.apiUrl}/Employees`, {
            method: "GET",
            headers: this.setHeaders()
        });

        if (!response.ok) {
            throw new Error(`Failed to get employees: ${response.status}`);
        }
        return response.json();
    }

    public async createEmployee(employee: Employee): Promise<Employee> {
        try {
            const response = await fetch(`${this.apiUrl}/Employees`, {
                method: "POST",
                headers: this.setHeaders(),
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error(await this.handlingError(response));
            }

            return response.json();
        } catch (error) {
            console.log(error);
            throw new Error("Failed to create Employee");
        }
    }

    public async updateEmployee(employee: Employee): Promise<Employee> {
        const response = await fetch(`${this.apiUrl}/Employees`, {
            method: "PUT",
            headers: this.setHeaders(),
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error(await this.handlingError(response));
        }

        return response.json();
    }

    public async deleteEmployee(id: string): Promise<string> {
        const response = await fetch(`${this.apiUrl}/Employees(${id})`, {
            method: "DELETE",
            headers: this.setHeaders()
        });

        if (!response.ok) {
            throw new Error(await this.handlingError(response));
        }

        return "Employee deleted";
    }

    private async handlingError(response:Response): Promise<string> {
        const errorResponse = await response.json();
        if (errorResponse.Message) {
            return `Error ${errorResponse.Code}: ${errorResponse.Message}`;
        } else {
            return `Error ${response.status}: ${response.statusText}`;
        }
    }

    private setHeaders(): HeadersInit{
        return {
            "Content-Type": "application/json",
            "ApiKey": this.apiKey
        }
    }
}