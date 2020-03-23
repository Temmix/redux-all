import { compose, pipe } from "lodash/fp";
import { Map } from "immutable";
import { produce } from "immer";

const trim = str => str.trim();
const toLower = str => str.toLowerCase();
// const wrapIn = str => `<div>${str}</div>`;
// using currying, wrap can accept span or div :)
const wrap = type => str => `<${type}> ${str} <${type}>`;

// using lodash
let transformer = pipe(trim, toLower, wrap("div"));
let response = transformer("Hello World");
console.log(response);

// Immutability
const person = {
  name: "John",
  address: { city: "California", country: "USA" }
};
const updatedPerson = {
  ...person,
  address: { ...person.address, city: "New York" },
  name: "Temi Makinde",
  age: 12
};
console.log(person);
console.log(updatedPerson);

// Arrays
const numbers = [1, 2, 3];

// adding
const added = [...numbers, 4];
const index = numbers.indexOf(2);
const addedAtSpecific = [
  ...numbers.slice(0, index),
  4,
  ...numbers.slice(index)
];
console.log(added);
console.log(addedAtSpecific);

// removing
const removed = numbers.filter(x => x !== 2);
console.log(removed);

// updating
const updated = numbers.map(x => (x === 2 ? 40 : x));
console.log(updated);

// Vanilla Js
let book = { title: "From Nothing to Hero JavaScript 1" };
const publish = () => {
  book.isPublished = false;
  book.isVanilla = true;
};
publish();
console.log(book);

// using Immutable Js
let imBook = Map({ title: "From Nothing to Hero JavaScript 2" });
const imPublish = book => {
  return book.set("isPublished", true);
};
let immutableBook = imPublish(imBook);
console.log(immutableBook.toJS());

// using Immer Js
const immerPublish = book => {
  return produce(book, draftBook => {
    draftBook.isPublished = true;
    draftBook.isImmerized = true;
    draftBook.isVanilla = false;
  });
};

let immerBook = immerPublish(book);
console.log(immerBook);

/*
1.Write code in a functional style to convert the input to the output:  
input = { tag: “JAVASCRIPT” } 
output = “(javascript)” 
*/
const input = { tag: "JAVASCRIPT" };
const convert = inp => {
  const { tag } = input;
  return tag.toLowerCase();
};
let lowered = convert(input);
console.log(input);
console.log(lowered);

/*
2.We have a recipe object as follows: 
recipe = { name: “Spaghetti Bolognese”, ingredients: [“egg”, “salt”] } 
Assuming that this object is immutable, write code to  
    -Add a new ingredient (“cream”) 
    -Replace “egg” with “egg white” 
    -Remove an ingredient (“egg”)
*/
let recipe = { name: "Spaghetti Bolognese", ingredients: ["egg", "salt"] };
const add = (name, newIngredient) => {
  return produce(name, draftName => {
    draftName.ingredients.push(newIngredient);
  });
};
let addedRecipe = add(recipe, "cream");

const replace = (name, oldIngredient, newIngredient) => {
  return produce(name, draftName => {
    let index = draftName.ingredients.indexOf(oldIngredient);
    if (index > -1) draftName.ingredients[index] = newIngredient;
  });
};
let replacedRecipe = replace(addedRecipe, "egg", "egg white");

const remove = (name, tobeRemove) => {
  return produce(name, draftName => {
    draftName.ingredients = draftName.ingredients.filter(x => x !== tobeRemove);
  });
};
let removedRecipe = remove(replacedRecipe, "cream");

console.log(removedRecipe);
console.log(replacedRecipe);
console.log(addedRecipe);
console.log(recipe);
