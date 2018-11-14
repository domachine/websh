const systemCallExecutor = (output, command, args) => {
  if (command === "print") return output.concat(args);
  else return output;
};

export default systemCallExecutor;
