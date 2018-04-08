
const calculateArbitrage = (bid, ask) =>{
    return (ask / bid - 1) * 100;
}
const roundNumber = (number, precision) => {
    const shift = function (number, precision, reverseShift) {
        if (reverseShift) {
            precision = -precision;
        }  
        numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
}

module.exports = {
    calculateArbitrage,
    roundNumber
}