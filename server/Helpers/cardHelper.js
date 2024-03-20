export const shuffleCards = (recipes, number) => {
    let shuffledCards = []
    for (let i = recipes.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let temp = recipes[i]
        recipes[i] = recipes[randomIndex]
        recipes[randomIndex] = temp
    }
    //games start with 10 random recipes
    return recipes.splice(0, number)
}

//TODO: Replace with real function above
export const shuffleRareRecipes = recipes => {
    const firstRecipe = recipes[0]
    const copiedRecipes = Array(10).fill(firstRecipe)
    return copiedRecipes
}
