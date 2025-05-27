/* Your Code Here */
// Creates a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Creates multiple employee records from nested arrays
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Adds a TimeIn event
function createTimeInEvent(dateTimeStamp) {
  const [date, hour] = dateTimeStamp.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return this;
}

// Adds a TimeOut event
function createTimeOutEvent(dateTimeStamp) {
  const [date, hour] = dateTimeStamp.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return this;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(soughtDate) {
  const timeIn = this.timeInEvents.find(e => e.date === soughtDate);
  const timeOut = this.timeOutEvents.find(e => e.date === soughtDate);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculates all wages for an employee
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d);
  }.bind(this), 0);

  return payable;
}

// Finds employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName === firstName);
}

// Calculates total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, record) => {
    return total + allWagesFor.call(record);
  }, 0);
}

// Export all functions
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

if (require.main === module) {
  const employeeData = [
    ["Loki", "Laufeysson", "God of Mischief", 50],
    ["Thor", "Odinson", "God of Thunder", 60]
  ];

  const employees = createEmployeeRecords(employeeData);

  createTimeInEvent.call(employees[0], "2023-05-01 0900");
  createTimeOutEvent.call(employees[0], "2023-05-01 1700");

  createTimeInEvent.call(employees[1], "2023-05-01 1000");
  createTimeOutEvent.call(employees[1], "2023-05-01 1800");

  console.log("Payroll:", calculatePayroll(employees)); // should show correct payroll
}
