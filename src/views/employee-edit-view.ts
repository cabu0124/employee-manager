const EmployeeEditView = (): string => {
    const view = `
        <h3 class="ps-1 pb-3">
            <a id="return-employee-list" href="#" class="link-secondary text-decoration-none">Employee ></a>
            <span class="link-dark" id="employee-full-name"></span>
        </h3>
        <div class="container-fluid bg-white text-body py-4 px-5 rounded-1">
            <div class="row g-3 pb-3">
                <div class="col-6" style="padding-right:5px !important;">
                    <label for="first-name" class="form-label text-secondary fw-bold">FIRST NAME</label>
                    <input id="first-name" type="text" class="form-control" placeholder="Your first name" aria-label="First name">
                </div>
                <div class="col-6" style="padding-left:5px !important;">
                    <label for="last-name" class="form-label text-secondary fw-bold">LAST NAME</label>
                    <input id="last-name" type="text" class="form-control" placeholder="Last name" aria-label="Last name">
                </div>
            </div>
            <div class="row g-3 pb-3">
                <div class="col-12">
                    <label for="employee-id" class="form-label text-secondary fw-bold">ID</label>
                    <input id="employee-id" type="text" class="form-control" placeholder="Your Id" aria-label="Id">
                </div>
            </div>
            <div class="row g-3 pb-3">
                <div class="col-12">
                    <label for="employee-ssn" class="form-label text-secondary fw-bold">SSN</label>
                    <input id="employee-ssn" type="text" class="form-control" placeholder="Your SSN" aria-label="SSN">
                </div>
            </div>
            <div class="row g-3 pb-3">
                <div class="col-12" style="width:80px;">
                    <div class="form-check form-check-reverse">
                        <label class="form-check-label text-secondary fw-bold" for="status">ACTIVE</label>
                        <input id="status" class="form-check-input" type="checkbox" id="status">
                    </div>
                </div>
            </div>
            <div class="row g-3 pb-3 justify-content-end">
                <div class="col-12" style="width:116px;">
                    <button id="save-employee" type="submit" class="btn btn-primary" style="width:100px;">SAVE</button>
                </div>
            </div>
        </div>
    `;

    return view;
}

export default EmployeeEditView;