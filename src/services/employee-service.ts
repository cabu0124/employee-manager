import { Employee } from "../models/employee";

export class EmployeeService {
    private apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    private apiKey = import.meta.env.VITE_API_KEY || "";

    public async getEmployees(): Promise<Employee[]> {
        const response = await fetch(`${this.apiUrl}/Employees`, {
            method: "GET",
            headers: this.setHeaders()
        });
        return response.json();
    }

    public async createEmployee(employee: Employee): Promise<Employee> {
        const response = await fetch(`${this.apiUrl}/Employees`, {
            method: "POST",
            headers: this.setHeaders(),
            body: JSON.stringify(employee)
        });
        return response.json();
    }

    public async updateEmployee(employee: Employee): Promise<Employee> {
        const response = await fetch(`${this.apiUrl}/Employees`, {
            method: "PUT",
            headers: this.setHeaders(),
            body: JSON.stringify(employee)
        });
        return response.json();
    }

    public async deleteEmployee(id: string): Promise<void> {
        await fetch(`${this.apiUrl}/Employees/${id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        });
    }

    private setHeaders(): HeadersInit{
        return {
            "Content-Type": "application/json",
            "ApiKey": this.apiKey
        }
    }
}