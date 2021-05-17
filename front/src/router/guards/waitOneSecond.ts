const waitOneSecond = (to: any, from: any, next: (...args: any[]) => void) => {
  setTimeout(next, 1000);
};

export default waitOneSecond;
