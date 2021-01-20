const testDetailsCalculator = (originalValue, typedValue, returnValue) => {
  const words = typedValue.split(" ").length;
  const characters = typedValue.length;
  const mistakes = typedValue.split("").reduce((acc, typedChar, index) => {
    return typedChar !== originalValue.split("")[index] ? acc + 1 : acc;
  }, 0);
  const listOfDifferences = typedValue.split(" ").map((word, index) => {
    if (word !== originalValue.split(" ")[index]) {
      return 1;
    } else {
      return 0;
    }
  });
  const differences = listOfDifferences.reduce((counter, obj) => {
    if (obj === 1) {
      counter += 1;
    }
    return counter;
  }, 0);
  switch (returnValue) {
    case "words":
      return words;
    case "characters":
      return characters;
    case "mistakes":
      return mistakes;
    case "differences":
      return differences;
  }
};
export default testDetailsCalculator;
