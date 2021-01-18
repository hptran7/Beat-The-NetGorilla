const testDetailsCalculator = (originalValue, typedValue, returnValue) => {
  const words = typedValue.split(" ").length;
  const characters = typedValue.length;
  const mistakes = typedValue.split(" ").reduce((acc, typedChar, index) => {
    console.log(typedChar, originalValue.split(" ")[index]);
    return typedChar !== originalValue.split(" ")[index] ? acc + 1 : acc;
  }, 0);
  //   console.log(words, characters, mistakes);
  //   return { words, characters, mistakes };
  switch (returnValue) {
    case "words":
      return words;
    case "characters":
      return characters;
    case "mistakes":
      return mistakes;
  }
};
export default testDetailsCalculator;
