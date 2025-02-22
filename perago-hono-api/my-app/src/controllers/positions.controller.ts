class OrgController {
  constructor() {}

  GetEmployees = (c: any) => {
    return c.text("employee");
  };
  CreateEmployee = (c: any) => {
    return c.text("emp");
  };
}

export default OrgController;
