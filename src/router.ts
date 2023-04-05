import NotFound from "./views/not-found-view"
import EmployeeListView from "./views/employee-list-view"
import EmployeeEditView from "./views/employee-edit-view";

import { EmployeeListViewModel } from "./view-models/employee-list-view-model";
import { EmployeeEditViewModel } from "./view-models/employee-edit-view-model";

const employeeListViewModel = new EmployeeListViewModel();
const employeeEditViewModel = new EmployeeEditViewModel();

const routes: { [key: string]: { viewModel: any, view: () => string } } = {
    "/": {
      viewModel: employeeListViewModel,
      view: EmployeeListView
    },
    "edit": {
        viewModel: employeeEditViewModel,
        view: EmployeeEditView
    },
    "default": {
        viewModel: null,
        view: NotFound
    }
}

const router = (container: Element, hash:string, data?:any): void => {
    try {
        const route = routes[hash] || routes["default"];
        const render = route.view;
        container.innerHTML  = render();

        if (route.viewModel) {
            route.viewModel.load(data);
        }
    } catch (error) {
        console.log(error);
    }
}

export default router;