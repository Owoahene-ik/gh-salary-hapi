const Hapi = require('@hapi/hapi');

//this function is to calculate the employee pension
function employeePension(basicSal) {  
    let tier1 = 0;
    let tier2 = 0.05;
    let tier3 = 0.055;

    let calcTier2 = tier2 * basicSal;
    
    let calcTier3 = tier3 * basicSal;

    empPen = calcTier2 + calcTier3;

    empPen = empPen.toFixed(2);

    return empPen;


}





module.exports = employeePension;

