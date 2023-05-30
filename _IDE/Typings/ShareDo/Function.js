export var wordsType = /*#__PURE__*/function (wordsType) {
  wordsType[wordsType["upper"] = 0] = "upper";
  wordsType[wordsType["lower"] = 1] = "lower";
  wordsType[wordsType["title"] = 2] = "title";
  return wordsType;
}({});
;
var defendant = [];

//look thought all defendant and find the youngest
var youngest = defendant.reduce((prev, current) => prev.age < current.age ? prev : current);

//look thought all defendant and build a string will all name and age in words separated by comma with last using an and
//# sourceMappingURL=Function.js.map