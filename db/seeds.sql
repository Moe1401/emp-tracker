INSERT INTO departments (department_name)
  VALUES
  ("Accounting"),
  ("Sales"),
  ("Customer Service");

INSERT INTO roles (title, salary, department_id)
  VALUES
  ("Accountant", 70000, 1),
  ("Sales representative", 50000, 2),
  ("Sales Manager", 80000, 2),
  ("Account Analyst", 110000, 2),
  ("Customer Service Rep", 40000, 3),
  ("Customer Service Manager", 80000, 3);

INSERT INTO employees (fname, lname, role_id, manager_id)
  VALUES
  ("James", "Scott", 4, NULL),
  ("Rob", "Ray", 4, NULL),
  ("Frank", "Tucci", 6, NULL);

INSERT INTO employees (fname, lname, role_id, manager_id)
  VALUES
  ("Ben", "Razor", 1, 1),
  ("Tim", "Tom", 3, 3),
  ("Polly", "Saltine", 2, 1),
  ("Lisa", "Simpson", 4, 2),
  ("Mark", "Evens", 5, 3);