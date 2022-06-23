/**
 * APIのログを残すためのデコレーター
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html
 */
export const asyncLog = function () {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    if (process.env.REACT_APP_DEBUG_MODE === "false") {
      return;
    }
    const targetMethod = descriptor.value; //もともとのメソッド。
    descriptor.value = async function (...args: any[]) {
      console.log(`[${name}] START`);
      const start = new Date().getTime(); // ミリ秒
      const ret = await targetMethod.apply(this, args);
      const end = new Date().getTime();
      console.log(`[${name}] END: elapsed ${end - start} milliseconds`);
      console.dir(ret);
      return ret;
    };
  };
};
