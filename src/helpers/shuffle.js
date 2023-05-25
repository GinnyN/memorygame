// The Fisher-Yates algorithm
// Stoled from here: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

export { shuffleArray };