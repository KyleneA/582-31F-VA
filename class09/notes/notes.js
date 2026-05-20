import { formatName } from "../modules/utils.js";
import { add, multiply } from "../modules/helpers.js";
import { API_URL } from "../modules/config.js";

console.log(formatName("Mina"));

console.log("---");

console.log(add(2, 3));
console.log(multiply(2, 3));

console.log("---");

console.log(API_URL);