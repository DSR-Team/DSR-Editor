const Utility = {
  stringToHex: (str) => {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i).toString(16);
    }
    return arr.join("");
  },
  intToHex: (num, len = 0) => {
    return ("0".repeat(len) + num.toString(16)).slice(-len);
  },
};

export default Utility;
