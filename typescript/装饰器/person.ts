@logClass
class Person {
  public name: string;
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  @logMethod
  public saySomething(something: string): string {
    return this.name + '' + this.surname + 'says: ' +  something;
  }
}

// 类装饰器
// 接受一个构造函数作为参数，返回undefined或新的构造函数
// 装饰器为元素添加一些额外的逻辑或元数据
function logClass(target: any) {
  // 保存原构造函数的引用
  var original = target;

  // 用来生成类的实例的工具方法
  function constructor(constructor, args) {
    var c: any = function() {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }

  // 新的构造函数行为
  var f: any = function (...args) {
    console.log("New:" + original.name);
    return constructor(original, args);
  }

  // 复制原型，使 instanceof 操作能正常使用
  f.prototype = original.prototype;

  // 返回新的构造函数（将会覆盖原构造函数）
  return f;
}

// 方法装饰器
// 是一个接受三个参数的函数
function logMethod(target: any, key: string, descriptor: any) {

  // 保存原方法的引用
  var originalMethod = descriptor.value;

  // 编辑 descriptor 参数的 value 属性
  descriptor.value = function(...args: any[]) {

    // 将方法参数转化为字符串
    var a = args.map(a => JSON.stringify(a)).join();

    // 执行方法，得到其返回值
    var result = originalMethod.apply(this, args);

    // 将返回值转化为字符串
    var r = JSON.stringify(result);

    // 将函数的调用细节打印在控制台中
    console.log(`Call:${key}(${a}) => ${r}`);

    // 返回方法的调用结果
    return result;
  }

  // 返回编辑后的属性描述对象
  return descriptor;
}

var me = new Person("Remo", "Jansen")
me.saySomething("hello!")