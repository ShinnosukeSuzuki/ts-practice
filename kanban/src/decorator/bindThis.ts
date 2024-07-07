export function bound<This, Args extends any[], R>(
  _orignalMethod: (this: This, ...args: Args) => R,
  contxt: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => R
  >
) {
  contxt.addInitializer(function (this: any) {
    this[contxt.name] = this[contxt.name].bind(this); // メソッド内のthisをインスタンスに束縛
  });
}
