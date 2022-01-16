const Hapi = require("@hapi/hapi");



//this function calculates employer pension
function employerPension(basicSal) { 
    let empTier1 = 0.13;
    let empTier2 = 0.00;
    let empTier3 = 0.05; 

    let calcEmp = empTier1 * basicSal;
    
    let calcEmp1 = empTier3 * basicSal;

    Pen = calcEmp + calcEmp1;

    Pen = Pen.toFixed(2);

    return Pen;

}


module.exports = employerPension;