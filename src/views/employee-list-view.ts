const EmployeeListView = (): string => {
    const view = `
        <h3 class="ps-1 pb-3 text-dark">Employees</h3>
        <div class="container-fluid body-container bg-white py-4 px-5 rounded-1">
          <div class="row justify-content-end mb-2">
              <div class="col-3 d-grid gap-2 d-md-flex justify-content-end">
                  <button type="button" id="add-employee" class="btn btn-primary" style="width: 180px;">NEW EMPLOYEE</button>
              </div>
          </div>
          <div class="row">
              <div class="col-12 table-responsive">
                <table id="employee-list" class="table">
                  <thead class="text-secondary">
                      <tr>
                          <th>ID</th>
                          <th>FIRST NAME</th>
                          <th>LAST NAME</th>
                          <th class="text-center">STATUS</th>
                          <th class="text-center">ACTIONS</th>
                      </tr>
                  </thead>
                  <tbody class="text-body">
                  </tbody>
                </table>
              </div>
          </div>
        </div>
    `;

    return view;
}

export default EmployeeListView;