const greetings = [
  "Welcome back",
];
const length = greetings.length;

export default () => {
  return greetings[Math.floor(Math.random() * length)]
};