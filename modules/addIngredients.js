function addIngredients(ingredients) {
    let count = [];
  
  //   console.log(ingredients);
    let countKeys = Object.keys(count);
  //   console.log(countKeys);
  
    for (let ingredient of ingredients) {
      const ingToFind = countKeys.find((e) => e === ingredient.name);
      // console.log(countKeys);
      if (!ingToFind) 
      {
      let quantity=0
      
      ingredients.filter((e) => e.name === ingredient.name ? quantity+= e.quantity : null );
      //   console.log(listFiltered);
        count.push({name: ingredient.name , quantity: quantity, unit: ingredient.unit, category:ingredient.category})
      //   count['unit'] = ingredient.unit
      //   console.log(ingredient.name);
      // console.log(quantity);
      }
    }

    return count
}

module.exports = { addIngredients };