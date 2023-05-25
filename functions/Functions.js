export function avatarLetters  (string) {
    if (string.includes(' ')) {
      const words = string.split(' ');
      const firsWord = words[0][0];
      const secWord = words[1][0];
      return firsWord+' '+secWord;
    } else if (/^\d/.test(string)) {
      const numbers = string.match(/\d{1,3}/);
      return numbers[0];
    } else {
      return string[0];
    }
  }

