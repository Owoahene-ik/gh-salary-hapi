"use strict";

const Hapi = require("@hapi/hapi");

const vision = require("@hapi/vision")

const HapiSwagger = require("hapi-swagger");

const tax = require("./tax");

const employeePension = require("./pensions");
const employerPension = require("./employerPensions");

const init = async () => {
  const server = Hapi.Server({
    host: "localhost",
    port: 1234,
  });

  server.route({
    path: '/sal',
    method: 'POST',
    handler: (request, h) => {
    //   const amt = request.params.amount.split('/');
        const salary = JSON.stringify(request.payload.salary);
        const allowance = JSON.stringify(request.payload.allowance);

    //   const payload = JSON.stringify(data);

      //firstly wae need to calculate the new basic salary
      let newBasic = salary - employeePension(salary);

      //let's calulate for tax
      const taxableAmount = Number(newBasic) + Number(allowance);

      const calcTax = tax(taxableAmount) * taxableAmount;
 
      const netSalary = taxableAmount - calcTax;
      const netSalary1 = netSalary.toFixed(2);

    //   return `valye for salary: ${salary} and ${netSalary1}`;

      const grossSal =  Number(salary) + Number(allowance); 

      console.log(
        "Employee Pension Contributions " + employeePension(salary) +
        " Employer Pension " + employerPension(salary)+
        " PAYE " + calcTax.toFixed(2) +
        " Net Salary " + netSalary1,
        "Gross Salary" + grossSal
      );

        return {
            "Employee Pension Contributions" : employeePension(salary),
            "Employer Pension" : employerPension(salary),
            "PAYE" : calcTax.toFixed(2),
            "Net Salary" : netSalary1,
            "Gross Salary" : grossSal
        } ;

        // return request.payload;
    },
  });


  server.route({
    method: 'POST',
    path: '/derry',
    config: {
      payload: {
        output: 'data',
        parse: false,
        allow: 'application/json'
      }
    },
    handler: function (request, h) {
      return request.payload;
    }
  });


  await server.register([
    {
      plugin: require("hapi-swagger"),
      options: {
        enabledByDefault: true,
      },
    },
    {
        plugin: require("@hapi/inert"),
    },
    {
    plugin: require("@hapi/vision"),
    }
  ]);

  server.route({
    path: "/users/{user*}",
    method: "GET",
    handler: (request, h) => {
        const userParts = request.params.user.split('/');

        return `Hello ${userParts[0]} ${userParts[1]}!`;
    },
  });


  server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;



        return `Welcome derrick!`;
    }
});

  async function start() {
    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Server running at " + server.info.uri);
  }
  start();
};

init();
