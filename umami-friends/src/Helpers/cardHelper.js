export const shuffleRareRecipes = (recipes) => {
    for (let i = recipes.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = answers[i]
        answers[i] = answers[randomIndex];
        answers[randomIndex] = temp
    }
    //games start with 10 random recipes
    return answers.slice(0, 9);
}
