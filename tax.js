const Hapi = require("@hapi/hapi");


function tax (TaxableIncome) {

         taxRate = 0.00;

        if (TaxableIncome <= 280) {
            taxRate = 0.00;
        } else if (TaxableIncome > 280 && TaxableIncome <= 388) {
            taxRate = 0.05;
        } else if (TaxableIncome > 388 && TaxableIncome <= 528) {
            taxRate = 0.10;
        } else if (TaxableIncome > 528 && TaxableIncome <= 3528) {
            taxRate = 0.175;
        } else {
            taxRate = 0.25;
        }


        return taxRate;
};

module.exports = tax;