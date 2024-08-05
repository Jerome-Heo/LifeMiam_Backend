function checkRegime(regime) {
  let isValid = true;
  
  console.log("Regime log: " + regime);
  if (Array.isArray(regime) && regime.length > 0) {
    console.log("Dans le if");
    const tabControle = ["vegan", "lactose-free", "arachid-free"];
    for (const key of regime) {
      const value = tabControle.find(element => element === key);
      if (!value) {
        isValid = false;
      }
    }
  }

    return isValid;
  }
  
  module.exports = { checkRegime };
  