export interface Topic {
  title: string;
  content: string;
  code?: string;
  quiz?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

export interface Section {
  title: string;
  topics: Topic[];
}

export interface LanguageDoc {
  name: string;
  icon: string;
  color: string;
  desc: string;
  officialDocs: string;
  sections: Section[];
}

export const LANGUAGES_DOCS_DB: Record<string, LanguageDoc> = {
  javascript: {
    name: "JavaScript",
    icon: "javascript",
    color: "from-yellow-400 to-amber-500",
    desc: "The multi-paradigm programming language of the web. Covers dynamic types, closures, event loop execution model, OOP prototypes, and ES6+ async constructs.",
    officialDocs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Variables, Scope & Hoisting",
            content: "JavaScript provides var, let, and const for declarations. 'var' is function-scoped and hoisted with an initial value of undefined. 'let' and 'const' are block-scoped and hoisted but remain uninitialized in a Temporal Dead Zone (TDZ) until their actual declaration line is reached.",
            code: `function testScope() {
    // console.log(a); // ReferenceError: Cannot access before initialization
    let a = 10;
    
    console.log(b); // Prints: undefined (due to var hoisting)
    var b = 20;
    
    const c = 30; // block scoped and constant
}`,
            quiz: {
              question: "What occurs if you try to access a 'let' variable before its declaration line?",
              options: ["Returns undefined", "Throws a ReferenceError", "Yields null", "Evaluates to 0"],
              answer: 1,
              explanation: "Variables declared with let or const are in the Temporal Dead Zone (TDZ) from the beginning of their block until their declaration is evaluated. Accessing them in TDZ throws a ReferenceError."
            }
          },
          {
            title: "1.2 Data Types & Type Coercion",
            content: "JavaScript is dynamically typed. It has primitives (String, Number, Boolean, BigInt, Symbol, Null, Undefined) and Objects. Automatic conversions occur during comparison; '==' performs type coercion, while '===' compares values and types strictly.",
            code: `console.log("5" - 2); // Prints 3 (coerced to number)
console.log("5" + 2); // Prints "52" (coerced to string concatenation)
console.log(false == 0); // Prints true
console.log(false === 0); // Prints false (strict comparison)`,
            quiz: {
              question: "What does the expression '[] + {}' evaluate to in JavaScript?",
              options: ["'[object Object]'", "NaN", "0", "undefined"],
              answer: 0,
              explanation: "In addition, the array converts to an empty string '', and the object converts to '[object Object]'. Concatenating them results in '[object Object]'."
            }
          },
          {
            title: "1.3 Control Flow & Loops",
            content: "Control flow statements execute code blocks conditionally or repeatedly. JavaScript features standard loops (for, while, do-while) alongside collection-centric structures: 'for-of' (iterates iterable values) and 'for-in' (iterates enumerable object keys).",
            code: `const items = ["a", "b", "c"];
// Iterates values
for (const val of items) {
    console.log(val);
}
// Iterates properties/indices
for (const idx in items) {
    console.log(idx); // "0", "1", "2"
}`,
            quiz: {
              question: "Which loop structure is designed specifically to traverse the keys of a JavaScript object?",
              options: ["for-of loop", "for-in loop", "while-each loop", "map() loop"],
              answer: 1,
              explanation: "The for-in loop iterates over all enumerable properties of an object, including its keys."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Closures & Lexical Scope",
            content: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). Closures allow inner functions to access outer scope variables even after the outer function has finished execution.",
            code: `function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
            quiz: {
              question: "What is a closure in JavaScript?",
              options: ["A method to close browser tabs", "A function that has access to its outer scope variables", "A way to force synchronous execution", "A syntax for declaring modules"],
              answer: 1,
              explanation: "A closure gives a function access to its outer lexical scope even after that outer function has returned."
            }
          },
          {
            title: "2.2 Event Loop & Concurrency Model",
            content: "JavaScript is single-threaded. Concurrency is handled via the Event Loop. Synchronous tasks run on the Call Stack. Asynchronous callbacks are queued. The Event Loop prioritizes the Microtask Queue (Promises, queueMicrotask) over the Macrotask Queue (setTimeout, setInterval).",
            code: `console.log("Start");
setTimeout(() => console.log("Timeout (Macrotask)"), 0);
Promise.resolve().then(() => console.log("Promise (Microtask)"));
console.log("End");
// Output: Start -> End -> Promise -> Timeout`,
            quiz: {
              question: "Which queue has higher priority in the JavaScript Event Loop?",
              options: ["Macrotask Queue (setTimeout)", "Microtask Queue (Promises)", "Render Queue", "Worker Queue"],
              answer: 1,
              explanation: "The Event Loop executes all microtasks in the microtask queue before moving on to the next macrotask in the macrotask queue."
            }
          },
          {
            title: "2.3 Prototypes & Prototypal Inheritance",
            content: "JavaScript uses prototypal inheritance. Objects have an internal link to a prototype object. Accessing a property triggers a lookup along the Prototype Chain until the property is found or null is reached.",
            code: `const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true (inherited)
console.log(rabbit.__proto__ === animal); // true`,
            quiz: {
              question: "What object represents the top level of the JavaScript prototype chain?",
              options: ["Function.prototype", "null", "Object.prototype", "undefined"],
              answer: 2,
              explanation: "Object.prototype is at the top of the prototype chain. Its internal prototype link (__proto__) points to null, ending the chain."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 ES6 Classes & Constructors",
            content: "ES6 classes provide syntactic sugar over prototypal inheritance. The constructor method initializes instances. Methods defined inside the class block are shared across instances via the prototype object.",
            code: `class User {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return \`Hello, \${this.name}\`;
    }
}
const user = new User("Alice");`,
            quiz: {
              question: "Are JavaScript classes a distinct object model from prototypes?",
              options: ["Yes, they introduce true compiler classes", "No, they are syntactical sugar over prototypal inheritance", "Only if running in strict mode", "Only in TypeScript"],
              answer: 1,
              explanation: "JavaScript classes do not introduce a new object-oriented inheritance model. They are syntactic sugar over standard prototype inheritance."
            }
          },
          {
            title: "3.2 Inheritance & Method Overriding",
            content: "Classes extend base classes using the 'extends' keyword. The 'super' keyword must be called inside the derived constructor before accessing 'this'. Overridden methods can invoke base behaviors via 'super.method()'.",
            code: `class Developer extends User {
    constructor(name, lang) {
        super(name); // Call parent constructor
        this.lang = lang;
    }
    sayHello() {
        return \`\${super.sayHello()} (codes in \${this.lang})\`;
    }
}`,
            quiz: {
              question: "What keyword is required in a subclass constructor before accessing the 'this' context?",
              options: ["this.parent()", "super()", "extends", "constructor()"],
              answer: 1,
              explanation: "JavaScript requires calling super() in derived class constructors to initialize the parent class context before using 'this'."
            }
          },
          {
            title: "3.3 Private Fields & Encapsulation",
            content: "Modern JavaScript enforces true class encapsulation using the '#' prefix. Fields prefix-marked with '#' are private, meaning they cannot be accessed or modified from outside the class scope.",
            code: `class Account {
    #balance = 0; // Private field
    
    deposit(amount) {
        this.#balance += amount;
    }
    getBalance() {
        return this.#balance;
    }
}`,
            quiz: {
              question: "What symbol denotes a private class field in modern JavaScript?",
              options: ["_", "$", "#", "@"],
              answer: 2,
              explanation: "The hash (#) symbol prefix marks a class property or method as strictly private and inaccessible outside the class block."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Promises & Async/Await",
            content: "Promises handle async operations. Async/await provides synchronous-looking syntax for promise execution, reducing callback nested structures.",
            code: `const fetchData = () => new Promise(res => setTimeout(() => res("Data"), 100));

async function main() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}`,
            quiz: {
              question: "What is the return type of a function declared with the 'async' keyword?",
              options: ["Any value", "A Promise", "A Generator", "undefined"],
              answer: 1,
              explanation: "Functions marked with 'async' automatically wrap returned values in a resolved Promise, or reject if errors are thrown."
            }
          },
          {
            title: "4.2 Generators & Custom Iterators",
            content: "Generators are functions that can be exited and re-entered. They use the 'function*' syntax and return an iterator that yields values one by one.",
            code: `function* numberGen() {
    yield 1;
    yield 2;
    return 3;
}
const gen = numberGen();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2`,
            quiz: {
              question: "What operator pauses execution in a generator function?",
              options: ["pause", "stop", "yield", "return"],
              answer: 2,
              explanation: "The 'yield' keyword pauses generator execution, returning the specified value, and resumes when next() is called."
            }
          },
          {
            title: "4.3 Proxies & Metaprogramming",
            content: "The Proxy object wraps another target object and intercepts fundamental operations like property lookups, assignments, and function invocations.",
            code: `const target = { name: "John" };
const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : "Not Found"
};
const proxy = new Proxy(target, handler);
console.log(proxy.age); // "Not Found"`,
            quiz: {
              question: "What is the function called that intercepts actions on a Proxy target?",
              options: ["Hook", "Trap", "Trigger", "Filter"],
              answer: 1,
              explanation: "The handler object in a Proxy contains functions called 'traps' (like get, set) that intercept operations on the target."
            }
          }
        ]
      },
      {
        title: "5. Standard Library / Utilities",
        topics: [
          {
            title: "5.1 Functional Array Utilities",
            content: "JavaScript arrays provide utility methods like map, filter, and reduce for declarative data processing.",
            code: `const nums = [1, 2, 3, 4];
const sumOfEvens = nums
    .filter(n => n % 2 === 0)
    .map(n => n * 10)
    .reduce((acc, val) => acc + val, 0); // 60`,
            quiz: {
              question: "Which array method aggregates collection elements down to a single output value?",
              options: ["map", "filter", "reduce", "some"],
              answer: 2,
              explanation: "reduce executes a user-supplied reducer callback on each element, accumulating results to return a single aggregate value."
            }
          },
          {
            title: "5.2 Set & Map Collections",
            content: "Set stores unique values of any type. Map stores key-value pairs where keys can be of any data type (unlike standard Objects which restrict keys to strings/symbols).",
            code: `const set = new Set([1, 1, 2]); // Size = 2
const map = new Map();
map.set(set, "Metadata"); // Object key`,
            quiz: {
              question: "What is the primary difference between a Map and an Object key constraint?",
              options: ["Map allows only strings", "Object allows objects as keys", "Map keys can be any type including functions/objects", "Object keys are sorted"],
              answer: 2,
              explanation: "A JavaScript Map allows keys of any type (objects, functions, primitives), whereas standard Objects require keys to be Strings or Symbols."
            }
          },
          {
            title: "5.3 Fetch API & Network Requests",
            content: "The Fetch API performs HTTP requests. It is promise-based, replacing XMLHttpRequest, and handles response streams cleanly.",
            code: `async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return data;
}`,
            quiz: {
              question: "Does the fetch promise reject on standard HTTP error status codes like 404 or 500?",
              options: ["Yes, always", "No, it resolves normally unless a network failure occurs", "Only in strict mode", "Only for POST requests"],
              answer: 1,
              explanation: "The Promise returned by fetch() only rejects on network failures. It resolves successfully even if the server returns a 4xx or 5xx status code."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Two Sum in JavaScript",
            content: "Map values to indices. Check if target complement exists inside a Map in O(n) runtime.",
            code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
            quiz: {
              question: "What is the runtime complexity of the map-based Two Sum lookup?",
              options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
              answer: 1,
              explanation: "The function processes the array of length N exactly once, performing O(1) map checks, yielding O(n) total time."
            }
          },
          {
            title: "6.2 Solve Valid Parentheses in JS",
            content: "Implement bracket matching using an Array as a LIFO stack.",
            code: `function isValidParentheses(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
            quiz: {
              question: "Which array methods are used to implement Stack operations in JavaScript?",
              options: ["shift and unshift", "push and pop", "slice and splice", "concat and reverse"],
              answer: 1,
              explanation: "push adds items to the end of an array, and pop removes the last item, forming a LIFO stack."
            }
          },
          {
            title: "6.3 Recursive Array Flattening",
            content: "Write a function to flatten nested arrays recursively without using the built-in Array.prototype.flat().",
            code: `function flattenArray(arr) {
    const result = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item));
        } else {
            result.push(item);
        }
    }
    return result;
}`,
            quiz: {
              question: "What operator is used to unpack elements of the returned nested array in-place?",
              options: ["Rest operator", "Spread operator (...)", "Concat operator", "Join operator"],
              answer: 1,
              explanation: "The spread operator (...) expands the elements of the recursively flattened array, allowing push to insert them individually."
            }
          }
        ]
      }
    ]
  },
  python: {
    name: "Python",
    icon: "python",
    color: "from-blue-500 to-yellow-500",
    desc: "A highly readable, dynamic language. Covers list comprehensions, indentation rules, magic methods, GIL, decorators, and asyncio.",
    officialDocs: "https://docs.python.org/3/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Dynamic Typing & Mutability",
            content: "Python is dynamically and strongly typed. Variables do not require explicit type declarations. Mutability governs value modifications: lists, dicts, and sets are mutable (in-place edits); strings, tuples, and numbers are immutable.",
            code: `# Mutable list
x = [1, 2, 3]
x[0] = 99 # Modified in-place

# Immutable string
s = "hello"
# s[0] = "H" # TypeError! Strings cannot be mutated.
s = "H" + s[1:] # Creates a new string`,
            quiz: {
              question: "Which of the following data types is immutable in Python?",
              options: ["List", "Dictionary", "Tuple", "Set"],
              answer: 2,
              explanation: "Tuples are ordered collections of items that cannot be modified in-place once created, making them immutable."
            }
          },
          {
            title: "1.2 Indentation & Control Flow",
            content: "Python uses indentation (4 spaces) instead of brackets to define execution blocks. Control flow relies on if/elif/else, alongside loops (for, while) which support an optional 'else' block executed when loops terminate normally.",
            code: `for num in range(5):
    if num == 10:
        break
else:
    print("Loop finished without break") # Executes successfully`,
            quiz: {
              question: "When does the 'else' block of a Python loop execute?",
              options: ["If the loop executes a break statement", "Only if the loop fails to start", "When the loop completes all iterations without encountering a break", "If an error is thrown"],
              answer: 2,
              explanation: "The else block of a loop executes only when the loop terminates naturally by exhaustion, without hitting a break statement."
            }
          },
          {
            title: "1.3 Arguments, Lambda & Comprehensions",
            content: "Python supports flexible function arguments: positional (*args) and keyword (**kwargs). Lambda creates inline anonymous functions. List/Dict comprehensions provide clean syntax for container generation.",
            code: `# args and kwargs wrapper
def log(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)

# List comprehension
squares = [x**2 for x in range(5) if x % 2 == 0] # [0, 4, 16]`,
            quiz: {
              question: "What is the type of the 'kwargs' parameter inside a Python function?",
              options: ["Tuple", "List", "Dictionary", "Set"],
              answer: 2,
              explanation: "The double asterisk parameter (**kwargs) collects all extra keyword arguments passed into the function as a standard Dictionary."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Memory & Garbage Collection",
            content: "Python manages memory automatically. It uses reference counting to deallocate objects as soon as their references reach zero. To solve circular references, a cyclic garbage collector runs periodically to detect isolated reference rings.",
            code: `import sys

a = [1, 2, 3]
print(sys.getrefcount(a)) # Prints reference count (typically 2)`,
            quiz: {
              question: "What is Python's primary memory management deallocation mechanism?",
              options: ["Mark-sweep collector", "Reference counting", "Manual free() calls", "Trace stack sweeps"],
              answer: 1,
              explanation: "Python primarily counts references. Objects are destroyed immediately when their reference count drops to zero."
            }
          },
          {
            title: "2.2 GIL (Global Interpreter Lock)",
            content: "The CPython interpreter uses a Global Interpreter Lock (GIL) to prevent multiple native CPU threads from executing Python bytecodes concurrently. This ensures thread-safe memory management but restricts CPU-bound tasks in standard threads.",
            code: `import threading

# Parallel threads in Python work well for I/O tasks (file/network)
# but do not speed up CPU-bound operations due to the GIL constraint.`,
            quiz: {
              question: "What type of tasks are slowed down by the Python GIL during multi-threaded execution?",
              options: ["Network requests", "CPU-bound calculations", "File read/write operations", "Database downloads"],
              answer: 1,
              explanation: "Since the GIL allows only one thread to run Python code at a time, CPU-intensive tasks gain no speedup from standard threading. Multiprocessing is used instead."
            }
          },
          {
            title: "2.3 Namespaces & LEGB Scope Rule",
            content: "Variable lookups follow the LEGB hierarchy rule: Local scope, Enclosing scope (in nested functions), Global scope (module-level), and Built-in scope (predefined keywords/functions).",
            code: `x = "global"

def outer():
    x = "enclosing"
    def inner():
        nonlocal x
        x = "modified enclosing"
    inner()
    print(x) # Prints: modified enclosing`,
            quiz: {
              question: "Which keyword allows modifying a variable defined in an outer enclosing function scope?",
              options: ["global", "nonlocal", "outer", "parent"],
              answer: 1,
              explanation: "The 'nonlocal' keyword binds a local variable name to a variable defined in the nearest enclosing non-global scope."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 Classes, self & __init__",
            content: "Python classes define methods. The '__init__' method initializes object properties. Every instance method must accept 'self' as its first parameter to bind the method invocation to the active object instance.",
            code: `class User:
    species = "Human" # Class variable
    
    def __init__(self, username):
        self.username = username # Instance variable
        
u = User("sarah")
print(u.username) # sarah`,
            quiz: {
              question: "What is the difference between a class variable and an instance variable in Python?",
              options: ["Class variables are private", "Instance variables are shared across all instances", "Class variables are shared by all instances, while instance variables belong to unique instances", "Instance variables are declared inside static methods"],
              answer: 2,
              explanation: "Class variables are shared across all objects of that class. Instance variables are unique to each class instance."
            }
          },
          {
            title: "3.2 Multiple Inheritance & MRO",
            content: "Python supports multiple inheritance. The Method Resolution Order (MRO) determines the lookup path for attributes and methods, computed via the C3 Linearization algorithm. You can query the lookup hierarchy using Class.__mro__.",
            code: `class A:
    def greet(self): print("A")
class B(A):
    def greet(self): print("B")
class C(A):
    def greet(self): print("C")
class D(B, C): pass

print(D.__mro__) # Displays lookup sequence: D -> B -> C -> A -> object`,
            quiz: {
              question: "What method or attribute displays the inheritance hierarchy lookup sequence for a class?",
              options: ["__parents__", "__mro__", "__hierarchy__", "__path__"],
              answer: 1,
              explanation: "The __mro__ attribute (or mro() method) returns the Method Resolution Order tuple representing the lookup order."
            }
          },
          {
            title: "3.3 Magic & Dunder Methods",
            content: "Double underscore (dunder) methods customize class interactions. Examples include '__str__' for user-friendly string representations, '__len__' for counting, and '__getitem__' to support array index access syntax.",
            code: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y) # Custom operator +
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"` ,
            quiz: {
              question: "Which dunder method overrides the addition (+) operator in Python classes?",
              options: ["__plus__", "__add__", "__sum__", "__append__"],
              answer: 1,
              explanation: "Implementing '__add__' in a class enables custom operator overloading when using the plus (+) symbol."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Decorators",
            content: "Decorators wrap functions or classes to modify their behaviors dynamically without modifying their source code directly.",
            code: `import functools

def log_decorator(func):
    @functools.wraps(func) # Preserves metadata
    def wrapper(*args, **kwargs):
        print("Calling", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@log_decorator
def greet(name):
    return f"Hi {name}"`,
            quiz: {
              question: "Why is 'functools.wraps' used inside custom decorators?",
              options: ["Speeds up execution", "Preserves the original function's name and docstring metadata", "Bypasses the GIL", "Converts the function to async"],
              answer: 1,
              explanation: "functools.wraps updates the wrapper function to copy name, docstring, and annotations from the original function, preserving its metadata."
            }
          },
          {
            title: "4.2 Context Managers & With Blocks",
            content: "Context managers automate resource allocation and cleanup using the 'with' statement. This is implemented via the '__enter__' and '__exit__' protocols.",
            code: `class FileOpener:
    def __init__(self, filename):
        self.filename = filename
    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self.file
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close() # Ensures file is closed`,
            quiz: {
              question: "Which two methods must be implemented in a class to satisfy the Context Manager protocol?",
              options: ["__start__ and __stop__", "__open__ and __close__", "__enter__ and __exit__", "__init__ and __del__"],
              answer: 2,
              explanation: "The context manager protocol requires implementing '__enter__' (called on entering the with block) and '__exit__' (called when leaving the block)."
            }
          },
          {
            title: "4.3 Generators & Yield Statement",
            content: "Generators yield values lazily one-at-a-time, suspending their execution state between requests. This is highly memory-efficient when handling large data feeds.",
            code: `def count_up_to(limit):
    n = 1
    while n <= limit:
        yield n
        n += 1

gen = count_up_to(1000000) # Created instantly without storing 1M ints`,
            quiz: {
              question: "What is the primary memory advantage of Python generator functions?",
              options: ["They execute on GPU", "They generate all items at compile time", "They yield elements lazily without loading the entire collection into memory", "They bypass garbage collection"],
              answer: 2,
              explanation: "Generators yield elements on-demand (lazy evaluation), maintaining a tiny memory footprint regardless of the size of the generator range."
            }
          }
        ]
      },
      {
        title: "5. Standard Library & Concurrency",
        topics: [
          {
            title: "5.1 Collections Module",
            content: "The standard collections module provides specialized container alternatives to Python's dict, list, set, and tuple (e.g. Counter, defaultdict, deque, namedtuple).",
            code: `from collections import defaultdict, Counter

# Default values for missing keys
counts = defaultdict(int)
counts["missing"] += 1 # Auto-initializes key to 0

# Count frequencies
freq = Counter("banana") # Counter({'a': 3, 'n': 2, 'b': 1})`,
            quiz: {
              question: "Which collections object provides default fallback values when querying missing dictionary keys?",
              options: ["Counter", "namedtuple", "defaultdict", "deque"],
              answer: 2,
              explanation: "defaultdict invokes a factory function (like int, list) to initialize keys that do not exist yet when accessed."
            }
          },
          {
            title: "5.2 Functools & LRU Cache",
            content: "The functools module hosts utility decorators for high-performance functional operations. 'lru_cache' caches function results (Memoization).",
            code: `from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2) # Exponential speedup via caching`,
            quiz: {
              question: "What algorithm paradigm does @lru_cache implement?",
              options: ["Garbage sweep", "Memoization / Caching", "Divide and conquer", "Async task scheduling"],
              answer: 1,
              explanation: "lru_cache caches function arguments and return values (memoization) to bypass recalculations."
            }
          },
          {
            title: "5.3 Asyncio Concurrency",
            content: "The asyncio library writes single-threaded concurrent applications using async/await syntax. An event loop coordinates executing non-blocking network tasks.",
            code: `import asyncio

async def fetch_api():
    await asyncio.sleep(1) # Non-blocking sleep
    return "API response"

async def main():
    res = await fetch_api()
    print(res)`,
            quiz: {
              question: "What function call pauses execution inside an async block in Python?",
              options: ["time.sleep()", "await asyncio.sleep()", "yield task()", "loop.wait()"],
              answer: 1,
              explanation: "await asyncio.sleep() is a non-blocking operation that yields control back to the event loop, unlike time.sleep() which blocks the entire thread."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Two Sum in Python",
            content: "Map values to their index. Check complement index key presence in a Dictionary.",
            code: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
            quiz: {
              question: "What is the average lookup complexity of 'complement in num_map' in Python?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
              answer: 0,
              explanation: "Python dictionaries use hash tables, providing average O(1) constant lookup speed."
            }
          },
          {
            title: "6.2 Solve Valid Parentheses in Python",
            content: "Verify balanced characters using a Python list as a Stack.",
            code: `def is_valid_brackets(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
            quiz: {
              question: "What list method implements stack push operations in Python?",
              options: ["push()", "insert()", "append()", "extend()"],
              answer: 2,
              explanation: "Python uses list.append() to add items to the top (end) of the list stack."
            }
          },
          {
            title: "6.3 Reverse an Integer",
            content: "Reverse the digits of an integer mathematically, accounting for negative signs and 32-bit integer boundaries.",
            code: `def reverse_int(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    res = 0
    while x > 0:
        res = res * 10 + x % 10
        x //= 10
    res *= sign
    # Handle 32-bit signed integer boundary constraints
    if res < -2**31 or res > 2**31 - 1:
        return 0
    return res`,
            quiz: {
              question: "What operator extracts the trailing digit of an integer in Python?",
              options: ["/", "//", "%", "**"],
              answer: 2,
              explanation: "The modulo operator (%) by 10 yields the remainder, which represents the last digit of the number."
            }
          }
        ]
      }
    ]
  },
  java: {
    name: "Java",
    icon: "java",
    color: "from-red-500 to-orange-600",
    desc: "A strongly typed class-based language. Covers JVM execution, garbage collection heap, strict encapsulation, abstract polymorphism, and collection streams.",
    officialDocs: "https://docs.oracle.com/en/java/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Compilation, Classpath & JVM",
            content: "Java is compiled to bytecodes using 'javac'. The Java Virtual Machine (JVM) interprets and executes these bytecodes on the host machine. The Classpath defines the directory paths where compiler and class loaders look for user classes.",
            code: `// To compile: javac Main.java
// To execute: java Main
public class Main {
    public static void main(String[] args) {
        System.out.println("Java JVM execution");
    }
}`,
            quiz: {
              question: "What does the Java compiler (javac) output?",
              options: ["Direct machine native binaries", "Assembly code", "Platform-independent bytecode files (.class)", "JavaScript files"],
              answer: 2,
              explanation: "The compiler compiles Java files down into bytecode classes which the JVM runs on target systems."
            }
          },
          {
            title: "1.2 Types, Wrappers & Autoboxing",
            content: "Java splits variables into primitives (int, double, boolean) and reference types (objects). Wrapper classes (Integer, Double) wrap primitives in objects. Autoboxing is the automatic conversion the compiler performs between primitives and wrappers.",
            code: `int primitive = 10;
Integer wrapper = primitive; // Autoboxing
int unboxed = wrapper; // Unboxing

// Wrapper classes can store null, primitives cannot
Integer nullableScore = null;`,
            quiz: {
              question: "Can standard primitive types like 'int' hold null values in Java?",
              options: ["Yes, always", "No, primitives must store concrete values", "Only inside methods", "Only when casting"],
              answer: 1,
              explanation: "Primitive data types in Java cannot hold null. If nullable variables are required, their corresponding object wrapper class must be used."
            }
          },
          {
            title: "1.3 Control Structures & Loops",
            content: "Java provides standard structured control loops (for, while, do-while) alongside advanced iteration features like enhanced for loops (for-each) to traverse iterable arrays and Collections.",
            code: `int[] numbers = {10, 20, 30};
// Enhanced for loop
for (int num : numbers) {
    System.out.println("Value: " + num);
}`,
            quiz: {
              question: "Which loop syntax simplifies traversing elements of a Java array or Collection?",
              options: ["while-each loop", "for (Type item : collection)", "do-loop", "iterator-for loop"],
              answer: 1,
              explanation: "The enhanced for loop (for-each syntax) iterates through all elements sequentially without tracking array index positions."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 JVM Memory: Stack vs Heap",
            content: "Java divides memory into: Stack (stores local variables, thread frames, references) and Heap (stores actual Object instances). The Stack allocations are fast and temporary, while Heap allocations require garbage collection.",
            code: `public void execute() {
    // localRef is stored on Stack
    // The actual User object is allocated on Heap
    User localRef = new User("John");
}`,
            quiz: {
              question: "Where are object instances allocated in Java JVM memory?",
              options: ["Stack memory", "Method Area", "Heap memory", "CPU registers"],
              answer: 2,
              explanation: "All object instances are allocated on the garbage-collected Heap, whereas stack memory stores reference pointers and local method variables."
            }
          },
          {
            title: "2.2 Garbage Collection & Generational Heap",
            content: "Java manages memory automatically via Garbage Collectors (GC). The heap is split into: Young Generation (Eden space, survivor spaces for short-lived objects) and Old Generation (holds long-lived objects). Garbage collectors run minor and major sweeps depending on generation occupancy.",
            code: `// Garbage collection is automatic. 
// System.gc() can suggest a run, but execution is not guaranteed.`,
            quiz: {
              question: "Which generational heap region stores newly allocated objects in Java?",
              options: ["Old Generation", "Eden Space", "Metaspace", "Permanent Generation"],
              answer: 1,
              explanation: "New objects are initially allocated in the Eden space, which is part of the Young Generation."
            }
          },
          {
            title: "2.3 String Pool & Immutability",
            content: "Strings are immutable in Java. The JVM maintains a special memory region called the String Constant Pool inside the heap. Reusing identical string literals avoids memory duplication.",
            code: `String s1 = "Java";
String s2 = "Java"; // Reference shared String pool
String s3 = new String("Java"); // Forces heap object creation

System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // false`,
            quiz: {
              question: "How do you check value equivalence between two String objects in Java?",
              options: ["Using the '==' operator", "Using the '.equals()' method", "Using the '.compare()' method", "Using the '===' operator"],
              answer: 1,
              explanation: "The '==' operator checks reference equality (address matching). The '.equals()' method checks character-by-character value equality."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 Encapsulation, Classes & Accessors",
            content: "Encapsulation restricts direct access to object components. Declare variables as 'private' and expose controlled accessor methods ('getters' and 'setters').",
            code: `public class BankAccount {
    private double balance; // Encapsulated variable
    
    public double getBalance() {
        return this.balance;
    }
    public void deposit(double amount) {
        if (amount > 0) this.balance += amount;
    }
}`,
            quiz: {
              question: "What is the primary purpose of declaring class variables private?",
              options: ["Improves execution speed", "Enforces encapsulation by preventing unauthorized external modifications", "Reduces compiler memory size", "Allows inheritance"],
              answer: 1,
              explanation: "Making fields private ensures that their internal representation is hidden and can only be accessed through public methods, maintaining data validity."
            }
          },
          {
            title: "3.2 Inheritance & Interface Contracts",
            content: "Java supports single inheritance for classes (using 'extends') but permits multiple interface implementation (using 'implements') to build contract contracts.",
            code: `interface Walkable { void walk(); }
interface Flyable { void fly(); }

class Duck implements Walkable, Flyable {
    public void walk() { System.out.println("Walking"); }
    public void fly() { System.out.println("Flying"); }
}`,
            quiz: {
              question: "Does Java allow a class to inherit from multiple parent classes directly?",
              options: ["Yes, using commas", "No, Java supports only single class inheritance", "Only if parent classes are abstract", "Only in Java 17+"],
              answer: 1,
              explanation: "Java prohibits multiple class inheritance to avoid ambiguity (the diamond problem). However, a class can implement multiple interfaces."
            }
          },
          {
            title: "3.3 Polymorphism & Overriding",
            content: "Polymorphism resolves method execution at runtime based on the actual object type. Derived classes override base class methods using the '@Override' annotation.",
            code: `class Animal {
    public void speak() { System.out.println("Generic Sound"); }
}
class Cat extends Animal {
    @Override
    public void speak() { System.out.println("Meow"); }
}

Animal pet = new Cat();
pet.speak(); // Prints "Meow" (runtime polymorphism)`,
            quiz: {
              question: "Which of the following determines which overridden method is executed during polymorphic calls?",
              options: ["The declared reference type", "The actual object instance type at runtime", "The compiler namespace", "The Classpath order"],
              answer: 1,
              explanation: "Java uses dynamic binding. The JVM determines which method to invoke at runtime based on the actual object instance, not the reference type."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Generics & Type Erasure",
            content: "Generics provide type-safe containers. The compiler enforces type checks at compile-time but strips out generic parameters during compilation (Type Erasure), replacing them with Object cast boundaries to maintain backward compatibility.",
            code: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
// Compiled as: ArrayList names = new ArrayList(); names.add((Object)"Alice");`,
            quiz: {
              question: "What is Type Erasure in Java?",
              options: ["A process to delete unused classes", "The removal of generic type parameter information at compile-time", "A compilation warning about type safety", "Dynamic casting at runtime"],
              answer: 1,
              explanation: "Type erasure removes all generic type parameter info during compilation, ensuring generated bytecodes are compatible with older JVM versions."
            }
          },
          {
            title: "4.2 Multi-Threading & Synchronization",
            content: "Java supports concurrent execution. Use the 'synchronized' keyword on methods or code blocks to serialize thread accesses, avoiding race conditions on shared state.",
            code: `public class Counter {
    private int count;
    
    // Thread-safe increment
    public synchronized void increment() {
        count++;
    }
}`,
            quiz: {
              question: "What monitor lock is acquired when entering a non-static synchronized method?",
              options: ["The class Object lock", "The 'this' object instance lock", "A system process lock", "A thread-group monitor"],
              answer: 1,
              explanation: "Entering an instance synchronized method locks the 'this' instance of the class for the calling thread."
            }
          },
          {
            title: "4.3 Exception Hierarchy & Handling",
            content: "Java divides exceptions into: Checked Exceptions (must be declared in 'throws' or caught in try-catch) and Unchecked Exceptions (RuntimeExceptions, unchecked).",
            code: `public void readFile() throws java.io.IOException {
    // Checked Exception: compiler forces handler declaration
    throw new java.io.IOException("File Error");
}`,
            quiz: {
              question: "Which class represents unchecked exceptions in Java?",
              options: ["Exception", "Throwable", "RuntimeException", "IOException"],
              answer: 2,
              explanation: "RuntimeException and its subclasses are unchecked exceptions. The compiler does not require explicit try-catch or throws clauses for them."
            }
          }
        ]
      },
      {
        title: "5. Java Collections & Streams",
        topics: [
          {
            title: "5.1 Collections Framework",
            content: "Java Collections provide core data structures: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap). List stores duplicates, Set stores unique keys, and Map manages key-value configurations.",
            code: `import java.util.*;

List<Integer> list = new ArrayList<>();
Set<String> uniqueKeys = new HashSet<>();
Map<String, Integer> map = new HashMap<>();`,
            quiz: {
              question: "Which Collection class maintains insertion order and provides O(1) index-based access?",
              options: ["HashSet", "ArrayList", "LinkedList", "TreeMap"],
              answer: 1,
              explanation: "ArrayList is backed by a dynamically resized array, offering O(1) runtime index lookups while preserving insertion orders."
            }
          },
          {
            title: "5.2 Functional Interfaces & Lambdas",
            content: "Functional Interfaces (e.g. Runnable, Consumer, Function) contain exactly one abstract method. Lambda expressions implement these interfaces cleanly without anonymous class definitions.",
            code: `@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

MathOperation add = (a, b) -> a + b; // Lambda implementation`,
            quiz: {
              question: "What constraint must an interface satisfy to allow Lambda implementation?",
              options: ["Must contain only static methods", "Must contain exactly one abstract method", "Must be marked private", "Must implement Serializable"],
              answer: 1,
              explanation: "Lambda expressions are compatible only with Functional Interfaces, which contain exactly one abstract method."
            }
          },
          {
            title: "5.3 Streams API",
            content: "The Streams API provides a declarative pipeline for transforming collections. Operations are split into intermediate (filter, map - lazy) and terminal (collect, reduce, forEach - trigger execution).",
            code: `import java.util.*;
import java.util.stream.*;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<String> filtered = names.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList()); // Terminal operation`,
            quiz: {
              question: "Are stream intermediate operations evaluated immediately when declared?",
              options: ["Yes, always", "No, they are lazy and only execute when a terminal operation is invoked", "Only if running parallel streams", "Only inside transaction blocks"],
              answer: 1,
              explanation: "Intermediate operations (like filter, map) are lazy. They construct execution pipelines but execute only when a terminal operation is called."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Two Sum in Java",
            content: "Map values to index positions. Iterate and check target complement indices in O(n) using HashMap.",
            code: `import java.util.HashMap;

public int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
            quiz: {
              question: "What is the average runtime complexity of map.containsKey() in a Java HashMap?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
              answer: 0,
              explanation: "HashMap buckets resolve hashing collisions, yielding O(1) constant time on average."
            }
          },
          {
            title: "6.2 Solve Valid Parentheses in Java",
            content: "Parse balanced brackets using the Stack class in O(n) runtime.",
            code: `import java.util.Stack;

public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return stack.isEmpty();
}`,
            quiz: {
              question: "What occurs if you call pop() on an empty Stack in Java?",
              options: ["Returns null", "Returns '#'", "Throws EmptyStackException", "Yields false"],
              answer: 2,
              explanation: "The pop() method throws an EmptyStackException if the stack contains no elements to remove."
            }
          },
          {
            title: "6.3 Reverse an Integer in Java",
            content: "Reverse 32-bit digits mathematically. Use conditional checks to prevent value overflow.",
            code: `public int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;
        // Check for 32-bit signed integer overflows
        if (rev > Integer.MAX_VALUE/10 || (rev == Integer.MAX_VALUE/10 && pop > 7)) return 0;
        if (rev < Integer.MIN_VALUE/10 || (rev == Integer.MIN_VALUE/10 && pop < -8)) return 0;
        rev = rev * 10 + pop;
    }
    return rev;
}`,
            quiz: {
              question: "What is the maximum limit value of a standard signed 32-bit integer in Java?",
              options: ["2,147,483,647", "4,294,967,295", "9,223,372,036,854,775,807", "32,767"],
              answer: 0,
              explanation: "Integer.MAX_VALUE corresponds to 2^31 - 1, which equals 2,147,483,647."
            }
          }
        ]
      }
    ]
  },
  cpp: {
    name: "C++",
    icon: "cpp",
    color: "from-indigo-500 to-blue-600",
    desc: "A high-performance, compiled, statically-typed systems language. Covers pointers, manual dynamic memory, OOP hierarchies, templates, multithreading, and the Standard Template Library (STL).",
    officialDocs: "https://en.cppreference.com/",
    sections: [
      {
        title: "1. C++ Basics",
        topics: [
          {
            title: "1.1 Introduction to C++",
            content: "🤖 Imagine programming is like writing a recipe for a robot chef. C++ is a super-fast, powerful language that is like the engine of a Formula 1 race car. It is used to build heavy-duty games like Minecraft, operating systems like Windows, and space rockets!\n\n💡 Let's break down the basic C++ recipe:\n1. 📦 #include <iostream>: This is like unpacking your toy box before playing. It brings standard tools (like std::cout to talk) into your workshop.\n2. 🚪 int main(): This is the 'Start Game' button. All C++ programs begin their execution at this main function.\n3. 📣 std::cout << 'Hello...';: This is like writing a message on a whiteboard with a megaphone. The << points to the screen, sending the words there!\n4. 🏁 return 0;: This tells the computer, 'Done! The recipe worked perfectly without any errors.'",
            code: `#include <iostream>

// Entry point of execution
int main() {
    std::cout << "Hello, CodeVerse C++ World!\\n";
    return 0; // Indicates successful execution
}`,
            quiz: {
              question: "Which function serves as the entry point of execution in every standard C++ program?",
              options: ["start()", "main()", "init()", "execute()"],
              answer: 1,
              explanation: "All C++ programs start their execution at the standard main() function, which must return an integer."
            }
          },
          {
            title: "1.2 Data Types",
            content: "🎒 Imagine your computer has different sized boxes to store toys. In C++, these boxes are called Data Types:\n- int: a box for whole numbers (like 5, 100, or -20).\n- double: a box for decimal numbers (like 19.99 or 3.14).\n- char: a box for a single letter (like 'C' or 'A').\n- bool: a light switch that can only be true (on) or false (off).\n\n🔍 The 'sizeof' operator is like a scale that weighs a box to see how much memory space it takes up in bytes.",
            code: `#include <iostream>

int main() {
    char letter = 'C';
    int count = 100;
    double price = 19.99;
    bool isValid = true;
    
    std::cout << "Size of char: " << sizeof(letter) << " byte\\n";
    std::cout << "Size of int: " << sizeof(count) << " bytes\\n";
    std::cout << "Size of double: " << sizeof(price) << " bytes\\n";
    return 0;
}`,
            quiz: {
              question: "Which C++ operator is used to retrieve the memory size of a type or variable in bytes?",
              options: ["size()", "sizeof", "length()", "capacity()"],
              answer: 1,
              explanation: "The sizeof operator is a built-in compile-time operator that returns the size of a type or variable in bytes."
            }
          },
          {
            title: "1.3 Variables & Constants",
            content: "🏷️ A Variable is like a labeled container where you store your toys (data). You can change what's inside whenever you want!\n- A Constant (const or constexpr) is like a container glued shut. Once you put a toy inside, you can never change it—it's read-only forever!",
            code: `#include <iostream>

int main() {
    int score = 10; // mutable variable
    score = 15;
    
    const double PI = 3.14159; // constant
    constexpr int BUFFER_SIZE = 1024 + 512; // compile-time constant
    
    std::cout << "Buffer: " << BUFFER_SIZE << "\\n";
    return 0;
}`,
            quiz: {
              question: "What keyword specifies that a variable value is a compile-time constant evaluated during compilation?",
              options: ["const", "constexpr", "static", "volatile"],
              answer: 1,
              explanation: "constexpr guarantees that the variable is evaluated at compile-time, allowing the compiler to optimize performance."
            }
          },
          {
            title: "1.4 Operators",
            content: "🧮 Operators are action signs we use to do math or make decisions:\n- Arithmetic Operators (+, -, *, /) are like standard calculator buttons.\n- Relational Operators (<, >, ==) compare items (like deciding who is taller).\n- Logical Operators (&&, ||, !) combine choices (like checking if you have both homework AND toys).",
            code: `#include <iostream>

int main() {
    int a = 10;
    int b = 3;
    
    int remainder = a % b; // Modulo
    bool isGreater = (a > b);
    
    // Ternary operator
    int minVal = (a < b) ? a : b;
    
    std::cout << "Remainder: " << remainder << "\\n";
    std::cout << "Min Value: " << minVal << "\\n";
    return 0;
}`,
            quiz: {
              question: "What does the expression '17 % 5' evaluate to in C++?",
              options: ["3", "2", "0", "3.4"],
              answer: 1,
              explanation: "The modulo operator (%) returns the remainder of the division. 17 divided by 5 is 3 with a remainder of 2."
            }
          },
          {
            title: "1.5 Basic Input / Output",
            content: "🗣️ How does your program talk to you and listen?\n- std::cout: a megaphone pointing out (using <<) to print words on the screen.\n- std::cin: an ear listening in (using >>) to catch whatever you type on the keyboard and put it in a variable!",
            code: `#include <iostream>

int main() {
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age; // Read from standard input
    
    std::cout << "You are " << age << " years old." << std::endl;
    return 0;
}`,
            quiz: {
              question: "Which stream object is used for reading user input from the standard keyboard console?",
              options: ["std::cout", "std::cin", "std::cerr", "std::clog"],
              answer: 1,
              explanation: "std::cin (standard input stream) reads data from the standard input source, typically the console keyboard."
            }
          },
          {
            title: "1.6 Control Flow Statements",
            content: "🚦 Control Flow is like a road trip with crossroads. We use 'if' and 'else' to decide which way to go:\n- 'IF it is raining, we take an umbrella, ELSE we wear sunglasses!'\n- switch is like an elevator panel with buttons—each button goes to a different floor (case) instantly!",
            code: `#include <iostream>

int main() {
    int choice = 2;
    
    switch (choice) {
        case 1:
            std::cout << "Choice 1\\n";
            break;
        case 2:
            std::cout << "Choice 2\\n";
            break; // Prevents fallthrough
        default:
            std::cout << "Unknown choice\\n";
    }
    return 0;
}`,
            quiz: {
              question: "What is the purpose of the 'break' statement inside a switch case block?",
              options: [
                "It terminates the entire program",
                "It skips the next statement inside case",
                "It exits the switch statement, preventing execution from falling through to subsequent cases",
                "It restarts the switch loop"
              ],
              answer: 2,
              explanation: "The break statement terminates execution of the switch block, immediately transferring control to the code after switch."
            }
          },
          {
            title: "1.7 Loops",
            content: "🎡 Loops are like a merry-go-round that repeats instructions until a condition is met:\n- for loop: repeats a set number of times (like doing 5 jumping jacks).\n- while loop: repeats as long as a condition is true (like eating cookies while the jar is not empty).\n- do-while loop: does the action at least once, then decides if it should repeat.",
            code: `#include <iostream>
#include <vector>

int main() {
    // Range-based for loop
    std::vector<int> scores = {90, 80, 95};
    for (int s : scores) {
        std::cout << "Score: " << s << "\\n";
    }
    
    // Standard while loop
    int count = 0;
    while (count < 3) {
        std::cout << count << " ";
        count++;
    }
    std::cout << "\\n";
    return 0;
}`,
            quiz: {
              question: "Which loop construct guarantees that the code block will execute at least once before checking the condition?",
              options: ["for loop", "while loop", "do-while loop", "range-based for loop"],
              answer: 2,
              explanation: "The do-while loop evaluates its conditional expression at the end of the loop, guaranteeing that the body runs at least once."
            }
          },
          {
            title: "1.8 Functions",
            content: "📦 A Function is like a mini-robot helper that performs a specific chore. Instead of writing the same instructions over and over, you write them once inside a function and just call the helper's name whenever you need it (like makeJuice())!",
            code: `#include <iostream>

// Inline function
inline int doubleValue(int x) { return x * 2; }

// Overloaded functions
void print(int val) {
    std::cout << "Int: " << val << "\\n";
}
void print(double val) {
    std::cout << "Double: " << val << "\\n";
}

int main() {
    print(doubleValue(10)); // Call inline and overloaded function
    print(5.5);
    return 0;
}`,
            quiz: {
              question: "How does the compiler distinguish between overloaded functions in C++?",
              options: [
                "By function names and return types",
                "By parameter signatures (number and types of parameters)",
                "By the order they are defined",
                "By whether they are marked inline"
              ],
              answer: 1,
              explanation: "Function overloading relies on parameter signature differences (count, order, types) to resolve which overloaded implementation to call."
            }
          },
          {
            title: "1.9 Arrays",
            content: "🥚 An Array is like an egg carton that holds multiple items of the same type in a row. Each slot has a number, starting at index 0. Be careful not to reach outside the carton, or your program will crash!",
            code: `#include <iostream>

int main() {
    // 1D Array declaration and initialization
    int numbers[5] = {10, 20, 30, 40, 50};
    
    // Multidimensional Array
    int grid[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    
    std::cout << "Array index 0: " << numbers[0] << "\\n";
    std::cout << "Grid element [1][2]: " << grid[1][2] << "\\n";
    return 0;
}`,
            quiz: {
              question: "What represents the index of the first element in a standard C++ array?",
              options: ["1", "0", "-1", "Index is dynamic"],
              answer: 1,
              explanation: "Arrays in C++ are zero-indexed, meaning the first element is accessed at index 0."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Pointers and References",
            content: "Pointers store memory addresses of variables. The address-of operator (&) retrieves the address; the dereference operator (*) accesses the value stored at that address. References are aliases to existing variables. Unlike pointers, references must be initialized on declaration, cannot be changed to refer to other objects, and cannot be null.",
            code: `#include <iostream>

int main() {
    int val = 42;
    int* ptr = &val;
    int& ref = val;
    *ptr = 100;
    ref = 200;
    std::cout << "Val: " << val << "\\n"; // Prints 200
    return 0;
}`,
            quiz: {
              question: "Which of the following is true about references in C++?",
              options: [
                "References can be null",
                "References must be initialized upon declaration and cannot be reassigned",
                "References can be reassigned to point to a different variable",
                "References use the pointer syntax (*) to modify the value"
              ],
              answer: 1,
              explanation: "References must be initialized at the time of declaration and cannot be changed to reference another variable thereafter."
            }
          },
          {
            title: "2.2 new and delete Operators",
            content: "Dynamic memory is allocated on the heap at runtime. Use the 'new' operator to allocate memory (returns pointer) and the 'delete' operator to release it. For dynamic arrays, use 'new[]' and 'delete[]'. Failing to release allocated heap memory causes memory leaks.",
            code: `#include <iostream>

int main() {
    int* p = new int(5);
    int* arr = new int[10];
    delete p;
    delete[] arr; // Release dynamic array
    return 0;
}`,
            quiz: {
              question: "Which operator must be used to deallocate memory allocated with 'new[]'?",
              options: ["delete", "delete[]", "free", "release"],
              answer: 1,
              explanation: "Memory allocated with new[] must be freed using delete[] to ensure destructors are called for all array elements."
            }
          },
          {
            title: "2.3 Templates in C++",
            content: "Templates parameterize types, enabling generic functions and classes. The compiler instantiates concrete code for each type used.",
            code: `#include <iostream>

template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << getMax<int>(5, 10) << "\\n";
    std::cout << getMax<double>(5.5, 2.1) << "\\n";
    return 0;
}`,
            quiz: {
              question: "When are C++ template functions concrete types generated by the compiler?",
              options: [
                "At runtime",
                "At compile-time (during instantiation)",
                "During preprocessing",
                "During linking"
              ],
              answer: 1,
              explanation: "Templates are compiled at compile-time as soon as the compiler encounters an instantiation of the template with a concrete type."
            }
          },
          {
            title: "2.4 Struct Union Enum",
            content: "Custom user-defined data structures. 'struct' groups related members (public by default). 'union' allocates shared memory for all members, saving space as only one member can be used at a time. 'enum class' defines type-safe scoped enumerations.",
            code: `#include <iostream>
#include <string>

struct Student {
    std::string name;
    int age;
};

union Data {
    int i;
    float f;
};

enum class Color { Red, Green, Blue };

int main() {
    Student s = {"Alice", 20};
    Data d;
    d.i = 42;
    Color c = Color::Red;
    return 0;
}`,
            quiz: {
              question: "What is the key difference between a C++ struct and class?",
              options: [
                "Structs cannot have methods",
                "Struct members are public by default; class members are private by default",
                "Classes cannot be inherited",
                "Structs are stored on the stack; classes on the heap"
              ],
              answer: 1,
              explanation: "In C++, the only difference between a struct and a class is that struct members are public by default, while class members are private by default."
            }
          },
          {
            title: "2.5 Exception Handling",
            content: "Exception handling isolates errors using try, catch, and throw. Standard exceptions inherit from std::exception.",
            code: `#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::runtime_error("An error occurred");
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << "\\n";
    }
    return 0;
}`,
            quiz: {
              question: "Which keyword is used to signal the occurrence of an anomaly/error in C++?",
              options: ["catch", "try", "throw", "raise"],
              answer: 2,
              explanation: "The 'throw' keyword is used to throw an exception when an error is detected."
            }
          },
          {
            title: "2.6 File Handling",
            content: "File input and output stream classes. ifstream for reading, ofstream for writing, and fstream for both.",
            code: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ofstream out("test.txt");
    out << "Hello Files";
    out.close();
    
    std::ifstream in("test.txt");
    std::string line;
    std::getline(in, line);
    std::cout << line << "\\n";
    return 0;
}`,
            quiz: {
              question: "Which standard header file is required to perform file I/O operations in C++?",
              options: ["<iostream>", "<fstream>", "<fileio>", "<stdio.h>"],
              answer: 1,
              explanation: "<fstream> contains declarations for file stream classes like ifstream and ofstream."
            }
          },
          {
            title: "2.7 Multithreading",
            content: "Thread execution in parallel. Spawn threads using std::thread. Use std::mutex and std::lock_guard to prevent data races.",
            code: `#include <iostream>
#include <thread>
#include <mutex>
#include <string>

std::mutex mtx;

void printMsg(std::string msg) {
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << msg << "\\n";
}

int main() {
    std::thread t1(printMsg, "Hello from Thread 1");
    std::thread t2(printMsg, "Hello from Thread 2");
    t1.join();
    t2.join();
    return 0;
}`,
            quiz: {
              question: "Why is std::lock_guard preferred over manually calling lock() and unlock() on a mutex?",
              options: [
                "It is faster",
                "It unlocked automatically when it goes out of scope (RAII), preventing deadlocks",
                "It runs code asynchronously",
                "It is required by the compiler"
              ],
              answer: 1,
              explanation: "std::lock_guard locks the mutex in its constructor and unlocks it in its destructor, ensuring the mutex is released even if an exception or early return occurs."
            }
          },
          {
            title: "2.8 Namespace",
            content: "Namespaces resolve naming conflicts by grouping symbols under custom scope identifiers.",
            code: `#include <iostream>

namespace First {
    void show() { std::cout << "First Namespace\\n"; }
}

namespace Second {
    void show() { std::cout << "Second Namespace\\n"; }
}

int main() {
    First::show();
    Second::show();
    return 0;
}`,
            quiz: {
              question: "How do you call a function 'calculate()' that resides inside a namespace 'Math'?",
              options: ["Math.calculate()", "Math->calculate()", "Math::calculate()", "using Math.calculate()"],
              answer: 2,
              explanation: "The scope resolution operator (::) is used to access members within a namespace."
            }
          }
        ]
      },
      {
        title: "3. OOP",
        topics: [
          {
            title: "3.1 OOP Concepts",
            content: "Object-Oriented Programming (OOP) is a paradigm based on 'objects' which contain data and methods. Its 4 pillars are Encapsulation (hiding data), Abstraction (hiding details), Inheritance (reusing code), and Polymorphism (multi-forms).",
            code: `#include <iostream>
#include <string>

class Animal {
public:
    virtual void makeSound() = 0; // Pure virtual function (Abstraction)
};

class Dog : public Animal {
public:
    void makeSound() override { std::cout << "Woof!\\n"; }
};

int main() {
    Dog d;
    d.makeSound();
    return 0;
}`,
            quiz: {
              question: "Which of the following is NOT one of the four main pillars of OOP?",
              options: ["Encapsulation", "Compilation", "Inheritance", "Polymorphism"],
              answer: 1,
              explanation: "The four main pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is a build phase."
            }
          },
          {
            title: "3.2 Inheritance",
            content: "Inheritance establishes parent-child relationships (base and derived classes). Multiple inheritance allows inheriting from more than one base. Virtual inheritance prevents duplicate bases in diamond configurations.",
            code: `#include <iostream>

class Vehicle {
public:
    void start() { std::cout << "Vehicle started\\n"; }
};

class Car : public Vehicle {};

int main() {
    Car c;
    c.start();
    return 0;
}`,
            quiz: {
              question: "What keyword is used to prevent the duplicate grandparent instance in the Diamond Problem?",
              options: ["override", "virtual", "final", "abstract"],
              answer: 1,
              explanation: "Virtual inheritance ('class A : virtual public Base') ensures that only a single instance of the grandparent base class is created."
            }
          },
          {
            title: "3.3 Polymorphism",
            content: "Polymorphism supports unified interfaces for distinct types. Compile-time polymorphism uses function/operator overloading. Runtime polymorphism uses inheritance and virtual methods.",
            code: `#include <iostream>

class Shape {
public:
    virtual void draw() { std::cout << "Drawing shape\\n"; }
};

class Circle : public Shape {
public:
    void draw() override { std::cout << "Drawing circle\\n"; }
};

int main() {
    Shape* s = new Circle();
    s->draw(); // Prints: Drawing circle
    delete s;
    return 0;
}`,
            quiz: {
              question: "What table does the C++ compiler construct to enable dynamic dispatch / runtime polymorphism?",
              options: ["Vptr table", "Vtable (Virtual Method Table)", "Function table", "Call stack"],
              answer: 1,
              explanation: "The compiler uses a Virtual Method Table (vtable) for classes containing virtual functions to resolve functions at runtime."
            }
          },
          {
            title: "3.4 Encapsulation",
            content: "Restricting direct access to data by wrapping it into a single unit (class) and using access specifiers (private, protected, public).",
            code: `#include <iostream>

class Employee {
private:
    double salary;
public:
    void setSalary(double s) { salary = s; }
    double getSalary() const { return salary; }
};

int main() {
    Employee e;
    e.setSalary(50000.0);
    std::cout << e.getSalary() << "\\n";
    return 0;
}`,
            quiz: {
              question: "Which access specifier makes members accessible within the class and its derived classes, but not from outside?",
              options: ["private", "protected", "public", "internal"],
              answer: 1,
              explanation: "Protected members are accessible inside the class and by classes that inherit from it, but remain private to external access."
            }
          },
          {
            title: "3.5 Abstraction",
            content: "Abstraction hides implementation details and shows only the essential interface to the user. Accomplished using abstract classes and pure virtual functions (e.g. virtual void run() = 0;).",
            code: `#include <iostream>

class Keypad {
public:
    virtual void pressButton() = 0; // Pure virtual
};

class PhoneKeypad : public Keypad {
public:
    void pressButton() override { std::cout << "Button pressed\\n"; }
};

int main() {
    PhoneKeypad pk;
    pk.pressButton();
    return 0;
}`,
            quiz: {
              question: "How is an abstract class created in C++?",
              options: [
                "By declaring it using the 'abstract' keyword",
                "By declaring at least one pure virtual function in the class",
                "By hiding all of its constructors",
                "By declaring all members protected"
              ],
              answer: 1,
              explanation: "A class with at least one pure virtual function (a virtual function assigned to 0, e.g., 'virtual void foo() = 0;') becomes an abstract class in C++ and cannot be directly instantiated."
            }
          }
        ]
      },
      {
        title: "4. Standard Template Library (STL)",
        topics: [
          {
            title: "4.1 STL",
            content: "The Standard Template Library is a powerful set of template classes providing containers, iterators, algorithms, and functors.",
            code: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> v = {1, 2, 3};
    std::cout << "Size: " << v.size() << "\\n";
    return 0;
}`,
            quiz: {
              question: "What are the three main components of the C++ Standard Template Library?",
              options: ["Classes, Objects, Methods", "Containers, Iterators, Algorithms", "Pointers, References, Memory", "Compilers, Preprocessors, Linkers"],
              answer: 1,
              explanation: "The STL consists of three primary components: Containers (data structures), Iterators (traversal bridges), and Algorithms (processing utilities)."
            }
          },
          {
            title: "4.2 Container Library",
            content: "STL containers hold data. Sequence containers (vector, list, deque), associative containers (map, set), unordered containers (unordered_map, unordered_set), and container adaptors (stack, queue, priority_queue).",
            code: `#include <iostream>
#include <vector>
#include <map>

int main() {
    std::vector<int> vec = {10, 20, 30};
    std::map<std::string, int> ages;
    ages["Bob"] = 25;
    std::cout << ages["Bob"] << "\\n";
    return 0;
}`,
            quiz: {
              question: "Which dynamic sequence container allows O(1) time inserts and lookups at the back, but is slow for middle insertions?",
              options: ["std::list", "std::vector", "std::map", "std::set"],
              answer: 1,
              explanation: "std::vector manages a contiguous array of elements, offering fast index lookups and amortized O(1) push_back operations, but requires O(n) shifted reallocations for insertions in the middle."
            }
          },
          {
            title: "4.3 Iterators",
            content: "Iterators are smart pointer-like objects that traverse the elements of STL containers.",
            code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
            quiz: {
              question: "What does the iterator returned by `.end()` represent in STL?",
              options: ["The last element", "A null pointer", "The position one past the last element in the container", "The middle element"],
              answer: 2,
              explanation: "The .end() iterator acts as a sentinel pointing one element beyond the actual end of the container."
            }
          },
          {
            title: "4.4 Algorithm Library",
            content: "Generic functions to sort, search, count, and modify container ranges defined by iterators. Examples: std::sort, std::binary_search, std::find, std::reverse.",
            code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {4, 1, 3, 2};
    std::sort(v.begin(), v.end());
    bool found = std::binary_search(v.begin(), v.end(), 3);
    std::cout << "Found 3: " << (found ? "Yes" : "No") << "\\n";
    return 0;
}`,
            quiz: {
              question: "What algorithm is used to sort a range in C++ and what is its time complexity?",
              options: ["std::find, O(n)", "std::sort, O(n log n)", "std::binary_search, O(log n)", "std::reverse, O(n)"],
              answer: 1,
              explanation: "std::sort sorts elements in O(n log n) time on average."
            }
          }
        ]
      },
      {
        title: "5. Practice & Exercises",
        topics: [
          {
            title: "5.1 Solve Two Sum in C++",
            content: "Solve the classic Two Sum challenge. Given an array of integers and a target value, find indices of the two elements that sum to the target. Write an optimized O(n) solver using 'std::unordered_map' to cache visited elements and their indexes.",
            code: `#include <vector>
#include <unordered_map>
#include <iostream>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> numMap; // value -> index
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {}; // No solution
}

int main() {
    std::vector<int> nums = {2, 7, 11, 15};
    std::vector<int> indices = twoSum(nums, 9);
    if (!indices.empty()) {
        std::cout << "Indices: " << indices[0] << ", " << indices[1] << "\\n";
    }
    return 0;
}`,
            quiz: {
              question: "What is the average time complexity of the Two Sum algorithm using a hash map?",
              options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
              answer: 2,
              explanation: "We traverse the array of length N exactly once, performing constant O(1) average lookup operations inside the hash map, resulting in O(n) overall time."
            }
          },
          {
            title: "5.2 Solve Valid Parentheses in C++",
            content: "Check if a string of brackets is valid. Brackets must close in LIFO sequence and match opening counterparts. Implement an O(n) check using 'std::stack' to match closing characters.",
            code: `#include <iostream>
#include <stack>
#include <string>

bool isValidBrackets(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    std::string test = "{[()]}";
    std::cout << "Is valid: " << (isValidBrackets(test) ? "Yes" : "No") << "\\n";
    return 0;
}`,
            quiz: {
              question: "Which data structure is best suited for matching open/close brackets sequentially?",
              options: ["std::queue", "std::stack", "std::vector", "std::list"],
              answer: 1,
              explanation: "A LIFO stack is ideal because the last opened bracket must be the first one to close."
            }
          },
          {
            title: "5.3 Binary Search on Sorted Vector",
            content: "Implement binary search to locate target values in sorted vectors. Perform logarithmic divide-and-conquer checks by splitting the search boundaries in half iteratively.",
            code: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents overflow
        if (nums[mid] == target) {
            return mid; // Found index
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1; // Not found
}

int main() {
    std::vector<int> data = {1, 3, 5, 7, 9, 11};
    std::cout << "Index of 7: " << binarySearch(data, 7) << "\\n";
    return 0;
}`,
            quiz: {
              question: "Why do we calculate the middle index as 'left + (right - left) / 2' instead of '(left + right) / 2'?",
              options: [
                "It makes division operations faster",
                "It prevents integer overflow errors when left and right are very large values",
                "It automatically rounds up",
                "It is a requirement of STL containers"
              ],
              answer: 1,
              explanation: "If left and right are large, adding them directly can exceed the maximum range of a 32-bit signed integer (overflow). Subtracting before dividing avoids this."
            }
          }
        ]
      }
    ]
  },
  typescript: {
    name: "TypeScript",
    icon: "typescript",
    color: "from-blue-600 to-indigo-600",
    desc: "A typed superset of JavaScript. Features interface vs type declaration, type assertions, generics, utility types, and strict rules.",
    officialDocs: "https://www.typescriptlang.org/docs/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Static Types & Annotations",
            content: "TypeScript introduces compile-time type verification. Annotate variables, function parameters, and return types explicitly to detect bugs early.",
            code: `let age: number = 28;
let username: string = "Sarah";

function add(a: number, b: number): number {
  return a + b;
}`,
            quiz: {
              question: "Does TypeScript perform type checking at runtime?",
              options: ["Yes, type checks are run in browsers", "No, TypeScript types are compiled away", "Only if running in Node.js", "Only inside async statements"],
              answer: 1,
              explanation: "TypeScript is purely a compile-time tool. Types are stripped out, generating raw JavaScript to run in engines."
            }
          },
          {
            title: "1.2 Primitive Types & Arrays",
            content: "TypeScript supports standard primitives (string, number, boolean, symbol, void, null, undefined) alongside typed arrays (e.g. number[], Array<string>) and fixed-length tuples.",
            code: `const scores: number[] = [90, 85, 100];
const employee: [number, string] = [101, "Alice"]; // Tuple definition`,
            quiz: {
              question: "How do you specify a fixed-length array containing predefined types at each index in TypeScript?",
              options: ["Array map", "Tuple", "Union type", "Enum"],
              answer: 1,
              explanation: "A Tuple type represents an array with a fixed number of elements whose types are known and ordered."
            }
          },
          {
            title: "1.3 Literal Types & Enums",
            content: "TypeScript allows defining literal values as types (e.g. status: 'open' | 'closed'). Numeric and string Enums allow defining sets of named constants.",
            code: `type Action = "CREATE" | "DELETE";

enum Direction {
  Up = "UP",
  Down = "DOWN"
}
const dir: Direction = Direction.Up;`,
            quiz: {
              question: "What type restricts a variable to hold exactly one of a specific set of primitive values?",
              options: ["Interface type", "Literal union type", "Object type", "Dynamic type"],
              answer: 1,
              explanation: "Literal union types (like 'A' | 'B') restrict values to exactly those specified literal values."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Structural Typing",
            content: "TypeScript uses a structural typing system (duck typing). If an object contains all the required properties of a type shape, TypeScript accepts it as compatible, regardless of explicit declarations.",
            code: `interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(\`\${p.x}, \${p.y}\`);
}

const obj = { x: 10, y: 20, z: 30 };
printPoint(obj); // Compiles! Contains x and y.`,
            quiz: {
              question: "What is structural typing often referred to as?",
              options: ["Nominal typing", "Duck typing", "Strict typing", "Safe typing"],
              answer: 1,
              explanation: "Structural typing is often called 'duck typing' because compatibility is based on properties ('if it walks like a duck, it is a duck')."
            }
          },
          {
            title: "2.2 Type vs Interface",
            content: "Types and Interfaces declare object shapes. Interfaces support declaration merging (appending properties by redeclaring), whereas Types support union/intersection compositions directly.",
            code: `// Interfaces merge automatically
interface Window { title: string; }
interface Window { width: number; }

// Types compose via union
type ID = string | number;`,
            quiz: {
              question: "Which declaration construct supports auto-merging when redeclared multiple times in a codebase?",
              options: ["type alias", "interface", "class", "enum"],
              answer: 1,
              explanation: "Interfaces allow declaration merging. Defining the same interface name multiple times merges their signatures."
            }
          },
          {
            title: "2.3 Type Assertions & Guards",
            content: "Type assertions (as Type) tell the compiler to treat a variable as a specific type. Type guards ('typeof', 'instanceof', custom predicates) narrow down types inside conditional blocks.",
            code: `function processValue(val: string | number) {
    if (typeof val === "string") {
        console.log(val.toUpperCase()); // Narrowed to string
    }
}`,
            quiz: {
              question: "Which operator is used to narrow union types down inside a conditional check based on property existence?",
              options: ["as", "in", "is", "instanceof"],
              answer: 1,
              explanation: "The 'in' operator check ('property in object') acts as a type guard, narrowing union shapes based on key existence."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 Interfaces, Abstract Classes & Modifiers",
            content: "TS extends ES6 classes with access modifiers (public, private, protected) and interfaces to support modular OOP structures.",
            code: `abstract class Employee {
  constructor(protected name: string) {}
  abstract getSalary(): number;
}

class FullTimeEmployee extends Employee {
  getSalary() { return 5000; }
}`,
            quiz: {
              question: "Which modifier restricts member access to the class and its subclasses?",
              options: ["public", "private", "protected", "readonly"],
              answer: 2,
              explanation: "The 'protected' modifier makes members accessible inside the declaring class and derived subclasses, but not outside."
            }
          },
          {
            title: "3.2 Class Property Parameter Shorthand",
            content: "TypeScript provides parameter properties, enabling developers to declare and initialize class fields directly in the constructor parameters list.",
            code: `class Product {
  // Shorthand for field declaration and assignment
  constructor(public id: number, private price: double) {}
}`,
            quiz: {
              question: "How are properties declared in constructor arguments initialized automatically?",
              options: ["By calling super()", "By prefixing with an access modifier (public/private/protected)", "Using a setup method", "They are not, it throws a compile error"],
              answer: 1,
              explanation: "Adding public, private, or protected access modifiers directly to constructor parameters automatically creates and assigns the property."
            }
          },
          {
            title: "3.3 Abstract Classes vs Interfaces",
            content: "Abstract classes can contain concrete methods with implementation logic. Interfaces define contract shapes only (no implementation, compiled away completely).",
            code: `abstract class Logger {
  log(msg: string) { console.log(msg); } // Concrete method
  abstract record(msg: string): void; // Abstract method
}`,
            quiz: {
              question: "Do TypeScript interfaces generate any JavaScript code when compiled?",
              options: ["Yes, object prototypes", "Yes, function closures", "No, they are completely erased during compile-time", "Only in strict mode"],
              answer: 2,
              explanation: "Interfaces are purely design-time metadata constructs. They generate zero runtime bytecode or JavaScript lines."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Generics & Union/Intersection Types",
            content: "Generics parameterize types, enabling reusable classes and helper utilities. Unions (|) allow variable values to accept several types.",
            code: `type APIResponse<T> = {
  data: T;
  error?: string;
};

const userRes: APIResponse<{ name: string }> = {
  data: { name: "David" }
};`,
            quiz: {
              question: "Which operator represents an intersection type in TypeScript?",
              options: ["|", "&", "?", "!"],
              answer: 1,
              explanation: "The intersection operator (&) combines multiple type shapes into a single composite type."
            }
          },
          {
            title: "4.2 Conditional & Mapped Types",
            content: "Conditional types perform evaluations (T extends U ? X : Y). Mapped types iterate through object keys to construct transformed type configurations.",
            code: `type IsString<T> = T extends string ? true : false;
type StringResult = IsString<number>; // false

// Mapped type making all keys boolean
type BooleanFlags<T> = {
  [K in keyof T]: boolean;
};`,
            quiz: {
              question: "What is the primary usage of mapped types in TypeScript?",
              options: ["To construct arrays", "To transform properties of an existing type shape into a new one", "To perform network API routing", "To handle exceptions"],
              answer: 1,
              explanation: "Mapped types allow creating new type definitions by iterating through the properties of an existing type."
            }
          },
          {
            title: "4.3 Utility Helpers: Keyof, typeof & Lookup",
            content: "The 'keyof' operator returns union literal keys of an object. The 'typeof' operator extracts types from existing variable value declarations.",
            code: `const config = { host: "localhost", port: 80 };
type ConfigType = typeof config; // { host: string, port: number }
type ConfigKeys = keyof ConfigType; // "host" | "port"`,
            quiz: {
              question: "What is returned when calling 'keyof' on an object type shape?",
              options: ["A list of values", "A union type of its keys as string literals", "The constructor function reference", "An array index list"],
              answer: 1,
              explanation: "The keyof operator takes an object type and produces a union of its keys as string or numeric literals."
            }
          }
        ]
      },
      {
        title: "5. Standard Library / Utilities",
        topics: [
          {
            title: "5.1 Built-in Utility Types",
            content: "TypeScript provides global utility types to transform type declarations easily (e.g. Partial, Pick, Omit, Readonly).",
            code: `interface Task {
  title: string;
  completed: boolean;
}

// Partial makes all properties optional
const draft: Partial<Task> = { title: "Refactor" };`,
            quiz: {
              question: "Which utility type makes all fields in an interface optional?",
              options: ["Readonly", "Pick", "Omit", "Partial"],
              answer: 3,
              explanation: "Partial<T> construct a type with all properties of T set to optional."
            }
          },
          {
            title: "5.2 Omit & Pick Utilities",
            content: "Pick<T, K> constructs a type by choosing specific keys K from type T. Omit<T, K> does the opposite, removing keys K.",
            code: `interface Article {
  id: number;
  title: string;
  content: string;
}
type ArticlePreview = Pick<Article, "id" | "title">;
type ArticleInput = Omit<Article, "id">;`,
            quiz: {
              question: "Which utility type constructs a type shape by dropping specified keys from an interface?",
              options: ["Pick", "Partial", "Omit", "Exclude"],
              answer: 2,
              explanation: "Omit<T, K> takes a type T and returns a new shape lacking the keys specified in K."
            }
          },
          {
            title: "5.3 Readonly & Record",
            content: "Readonly<T> blocks mutations on properties of T. Record<K, T> constructs an object type whose keys are K and values are T.",
            code: `const pageViewCounts: Record<string, number> = {
    "/home": 100,
    "/about": 20
};`,
            quiz: {
              question: "What utility helper represents key-value mapping configurations with typed keys and values?",
              options: ["Pick", "Record", "Readonly", "Map"],
              answer: 1,
              explanation: "Record<Keys, Values> creates a type mapping specific property keys to a uniform value type."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Valid Parentheses typed in TS",
            content: "Validate bracket sequences using a typed Stack.",
            code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
            quiz: {
              question: "What is the runtime space complexity of this bracket validation algorithm?",
              options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
              answer: 1,
              explanation: "In the worst case (e.g. all opening brackets), the stack grows to hold all N elements, requiring O(n) space."
            }
          },
          {
            title: "6.2 Two Sum with Typed Maps",
            content: "Implement Two Sum in TypeScript ensuring explicit type signatures for inputs, maps, and output arrays.",
            code: `function twoSum(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement: number = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
            quiz: {
              question: "What does the exclamation mark (!) represent in 'map.get(complement)!'?",
              options: ["Modulo operations", "Not operator", "Non-null assertion operator", "Boolean casting"],
              answer: 2,
              explanation: "The exclamation mark (!) is the non-null assertion operator, telling the TypeScript compiler that the value is guaranteed to be defined."
            }
          },
          {
            title: "6.3 Binary Search in TS",
            content: "Implement a type-safe Binary Search returning target index or -1.",
            code: `function binarySearch(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left <= right) {
    const mid: number = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
            quiz: {
              question: "Why is Math.floor used in calculating the middle index in TypeScript/JS?",
              options: ["To speed up execution", "To round down division to a valid integer array index", "It is required by the TS compiler", "To convert to float"],
              answer: 1,
              explanation: "Since division in JavaScript/TypeScript produces floating-point numbers by default, Math.floor is required to get an integer index."
            }
          }
        ]
      }
    ]
  },
  go: {
    name: "Go",
    icon: "go",
    color: "from-cyan-500 to-teal-500",
    desc: "A compiled concurrent language by Google. Covers strict syntax, gopher compiler checks, implicit interfaces, goroutines, and standard networking.",
    officialDocs: "https://go.dev/doc/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Go Syntax & Strict Rules",
            content: "Go values simplicity. The compiler forces strict rules: unused variables and imported libraries result in compile errors. Loops are restricted to the single 'for' keyword.",
            code: `package main
import "fmt"

func main() {
    message := "Go language basics"
    fmt.Println(message)
}`,
            quiz: {
              question: "Which statement loop structures are supported natively in Go?",
              options: ["for, while, do-while", "for, while", "for only", "while only"],
              answer: 2,
              explanation: "Go has only the 'for' loop construct, which handles standard loops, conditional loops (while equivalencies), and range traversals."
            }
          },
          {
            title: "1.2 Types, Slices & Maps",
            content: "Go is strongly typed. Dynamic arrays are called Slices, built over fixed-size Arrays. Maps store key-value configurations initialized via 'make()'.",
            code: `package main
import "fmt"

func playCollections() {
    // Array (fixed size)
    var arr [3]int
    
    // Slice (dynamic)
    slice := []int{10, 20}
    slice = append(slice, 30) // Resizes automatically
    
    // Map
    ages := make(map[string]int)
    ages["Gopher"] = 15
}`,
            quiz: {
              question: "How do you add elements dynamically to a Go slice?",
              options: ["slice.Add()", "append(slice, element)", "slice.Push()", "insert(slice, element)"],
              answer: 1,
              explanation: "The built-in 'append()' function appends elements to a slice, reallocating the underlying array when necessary."
            }
          },
          {
            title: "1.3 Functions & Error Handling",
            content: "Go supports multiple return values. Errors are returned as standard values instead of throwing exceptions. The 'defer' keyword schedules execution calls to run on function exit.",
            code: `package main
import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}`,
            quiz: {
              question: "How does Go handle standard recoverable runtime errors in functions?",
              options: ["Try-catch blocks", "Returning the error as the final return value", "Panic kernel signals", "Throwing exceptions"],
              answer: 1,
              explanation: "Go handles errors by returning an 'error' interface value as the final return parameter, requiring callers to check for nil."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Memory Allocation & Escape Analysis",
            content: "Go compiles to native binary executables. The compiler performs escape analysis to decide whether to allocate variable memory on the stack or on the garbage-collected heap.",
            code: `// Escape analysis sample
func createUser() *User {
    u := User{Name: "Gopher"}
    return &u // Escapes to Heap because its address is returned
}`,
            quiz: {
              question: "What process determines if a Go variable is placed on the heap or stack?",
              options: ["Garbage sweep", "Escape analysis", "Static profiling", "Pointer tracking"],
              answer: 1,
              explanation: "Escape analysis occurs at compile-time. The compiler checks if variables outlive their stack frames; if so, they 'escape' to the heap."
            }
          },
          {
            title: "2.2 Structs, Pointers & Receivers",
            content: "Go uses structs for custom types. Receivers add methods to structs. Pointers (*Type) avoid copying data payloads during method calls.",
            code: `type Circle struct {
    radius float64
}

// Pointer receiver modifies struct fields
func (c *Circle) setRadius(r float64) {
    c.radius = r
}`,
            quiz: {
              question: "Which type of method receiver allows modifying struct field values inside the method?",
              options: ["Value receiver", "Pointer receiver", "Static receiver", "Function receiver"],
              answer: 1,
              explanation: "A pointer receiver (*Type) passes a pointer to the struct, allowing methods to modify its fields directly."
            }
          },
          {
            title: "2.3 Packages, Visibility & Exports",
            content: "Go organizes code into packages. Visibilities are determined by capitalization: names starting with uppercase are exported (public); lowercase names are unexported (private).",
            code: `package math

// Exported (Public)
func Add(a, b int) int { return a + b }

// Unexported (Private to package math)
func compute(a, b int) int { return a * b }`,
            quiz: {
              question: "How does Go mark a package function or struct field as public (exported)?",
              options: ["Using the 'public' keyword", "Annotating with @Export", "Starting the name with an uppercase letter", "Declaring in main.go"],
              answer: 2,
              explanation: "Go uses capitalization for exports. Any identifier starting with an uppercase letter is accessible outside its declaring package."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 Implicit Interfaces & Composition",
            content: "Go avoids inheritance, favoring composition through struct embedding. Interfaces are satisfied implicitly. If a struct implements all interface methods, Go satisfies it automatically without explicit declaration.",
            code: `type Reader interface {
    Read() string
}

type File struct{}
// satisfy Reader implicitly
func (f File) Read() string {
    return "Data block"
}`,
            quiz: {
              question: "How are interfaces satisfied in Go?",
              options: ["Using 'implements' keyword", "Satisfied implicitly by implementing method signatures", "Using annotation @Satisfies", "By registering in main()"],
              answer: 1,
              explanation: "Go uses structural typing for interfaces. Satisfying interface signatures implicitly makes implementations simpler."
            }
          },
          {
            title: "3.2 Composition & Struct Embedding",
            content: "Go achieves code reuse through composition (embedding structs within other structs). Inner fields and methods are promoted to the outer wrapper struct.",
            code: `type Engine struct { HP int }
type Car struct {
    Engine // Embedded struct (composition)
    Model  string
}

func testDrive() {
    c := Car{Engine: Engine{HP: 300}, Model: "Sedan"}
    fmt.Println(c.HP) // HP is promoted directly
}`,
            quiz: {
              question: "What Go mechanism replaces class inheritance?",
              options: ["Dynamic class links", "Struct embedding / Composition", "Interface templates", "Friend macros"],
              answer: 1,
              explanation: "Struct embedding promotes fields and methods of the nested type to the outer type, supporting composition over inheritance."
            }
          },
          {
            title: "3.3 Interface Values & Nil Checks",
            content: "An interface value in Go holds two components: concrete value type and underlying value. An interface is nil only if both type and value are nil.",
            code: `var r Reader // nil interface
// type = nil, value = nil

var f *File = nil
r = f // interface is NOT nil anymore (type is *File, value is nil!)`,
            quiz: {
              question: "When is an interface value considered strictly nil in Go?",
              options: ["When its underlying value is nil", "When both its dynamic type and dynamic value are nil", "Always before main() runs", "If it has no methods"],
              answer: 1,
              explanation: "An interface value is nil only when both its dynamic type descriptor and dynamic value are nil."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Goroutines & Channels",
            content: "Goroutines are lightweight threads scheduled multiplexed onto native threads by the Go runtime scheduler. Channels pass data concurrently without mutex locks.",
            code: `package main
import "fmt"

func main() {
    ch := make(chan int)
    go func() {
        ch <- 100 // Sends to channel
    }()
    val := <-ch  // Receives from channel
    fmt.Println(val)
}`,
            quiz: {
              question: "What operator is used to send or receive values from a Go channel?",
              options: ["<-", "->", "=>", "<<"],
              answer: 0,
              explanation: "The channel operator (<-) determines data flow directions: 'ch <- val' sends; 'val = <-ch' receives."
            }
          },
          {
            title: "4.2 Select Multiplexing",
            content: "The 'select' statement lets a goroutine wait on multiple channel operations, blocking until one of its cases is ready to execute.",
            code: `select {
case msg1 := <-ch1:
    fmt.Println("Received", msg1)
case ch2 <- 10:
    fmt.Println("Sent to ch2")
default:
    fmt.Println("Non-blocking fallback")
}`,
            quiz: {
              question: "Which statement coordinate multiple channel read/write select pathways?",
              options: ["switch", "select", "defer", "chan-switch"],
              answer: 1,
              explanation: "The select statement multiplexes channel operations, executing the first case that becomes unblocked."
            }
          },
          {
            title: "4.3 WaitGroups & Mutexes",
            content: "Go provides concurrency primitives in the 'sync' package: 'sync.WaitGroup' blocks until parallel jobs finish; 'sync.Mutex' guards shared resources against data races.",
            code: `import "sync"

var mu sync.Mutex
var count int

func safeIncrement() {
    mu.Lock()
    count++
    mu.Unlock()
}`,
            quiz: {
              question: "Which sync package primitive prevents multiple goroutines from accessing shared memory simultaneously?",
              options: ["sync.Once", "sync.Mutex", "sync.WaitGroup", "sync.Cond"],
              answer: 1,
              explanation: "Mutex (Mutual Exclusion) locks guarantee exclusive access to critical sections, avoiding data races."
            }
          }
        ]
      },
      {
        title: "5. Standard Library / Networking",
        topics: [
          {
            title: "5.1 Net/Http Web Server",
            content: "Go's robust standard library contains 'net/http', which is production-ready out-of-the-box for high-throughput HTTP REST APIs.",
            code: `package main
import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello from Go Server!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    http.ListenAndServe(":8080", nil)
}`,
            quiz: {
              question: "Which standard package handles HTTP routing in Go?",
              options: ["net/http", "io/http", "fmt/http", "web"],
              answer: 0,
              explanation: "The net/http package provides HTTP client and server implementations natively."
            }
          },
          {
            title: "5.2 JSON Encoding & Decoding",
            content: "Go handles JSON payloads natively via structural tags using the 'encoding/json' package.",
            code: `type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}
// json.Marshal(user) parses structs to JSON bytes.`,
            quiz: {
              question: "How are struct metadata attributes specified to guide JSON parsing in Go?",
              options: ["annotations", "structural tags using backticks", "XML schemas", "map variables"],
              answer: 1,
              explanation: "Go uses struct tags (\`json:\"name\"\`) to map struct fields to JSON property keys."
            }
          },
          {
            title: "5.3 Context Propagation",
            content: "The standard 'context' package propagates deadlines, cancellation signals, and request-scoped values across API call boundaries.",
            code: `import "context"

func handleRequest(ctx context.Context) {
    select {
    case <-ctx.Done():
        // Timeout or cancelled
    }
}`,
            quiz: {
              question: "What package coordinates cancellation signals across Go thread calls?",
              options: ["sync", "context", "os", "runtime"],
              answer: 1,
              explanation: "The context package manages cancellations, timeout deadlines, and context metadata propagation."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Two Sum in Go",
            content: "Find index positions matching target complement using Go maps.",
            code: `func twoSum(nums []int, target int) []int {
    numMap := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, found := numMap[complement]; found {
            return []int{idx, i}
        }
        numMap[num] = i
    }
    return nil
}`,
            quiz: {
              question: "How do you check if a key exists in a Go map?",
              options: ["val := map[key]; if val != nil", "val, exists := map[key]", "if map.Contains(key)", "query(map, key)"],
              answer: 1,
              explanation: "Go map retrievals return a second boolean value (often named ok/exists) confirming key presence."
            }
          },
          {
            title: "6.2 Solve Valid Parentheses in Go",
            content: "Match balanced brackets using slice-based LIFO stacks.",
            code: `func isValid(s string) bool {
    var stack []rune
    mapping := map[rune]rune{')': '(', '}': '{', ']': '['}
    for _, char := range s {
        if match, found := mapping[char]; found {
            if len(stack) == 0 || stack[len(stack)-1] != match {
                return false
            }
            stack = stack[:len(stack)-1] // pop
        } else {
            stack = append(stack, char) // push
        }
    }
    return len(stack) == 0
}`,
            quiz: {
              question: "What Go type represents a Unicode code point character inside a string?",
              options: ["byte", "char", "rune", "string"],
              answer: 2,
              explanation: "A 'rune' is an alias for int32, used to represent individual Unicode code point characters."
            }
          },
          {
            title: "6.3 Concurrent URL Response Checker",
            content: "Check multiple URLs in parallel using goroutines, sync.WaitGroup, and channels.",
            code: `package main
import (
    "net/http"
    "sync"
)

func checkURL(url string, wg *sync.WaitGroup, ch chan<- string) {
    defer wg.Done()
    _, err := http.Get(url)
    if err != nil {
        ch <- url + " is down"
        return
    }
    ch <- url + " is active"
}`,
            quiz: {
              question: "Which sync package object coordinates goroutine completions?",
              options: ["sync.Mutex", "sync.WaitGroup", "sync.Once", "sync.Cond"],
              answer: 1,
              explanation: "sync.WaitGroup tracks active parallel execution threads, blocking till counters hit zero."
            }
          }
        ]
      }
    ]
  },
  rust: {
    name: "Rust",
    icon: "rust",
    color: "from-orange-600 to-red-700",
    desc: "A systems language for absolute memory safety. Covers ownership, borrow checker, lifetimes, traits, Option/Result, and pattern matching.",
    officialDocs: "https://doc.rust-lang.org/book/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 Variables & Default Immutability",
            content: "Variables in Rust are immutable by default. Add the 'mut' keyword to allow reassignment. Rust requires type annotations when compiler inferences are ambiguous.",
            code: `fn main() {
    let x = 5;      // Immutable
    let mut y = 10; // Mutable
    y += 5;
    println!("y is {}", y);
}`,
            quiz: {
              question: "Are variables mutable by default in Rust?",
              options: ["Yes", "No, they are immutable by default", "Only primitive types", "Only inside main()"],
              answer: 1,
              explanation: "Rust enforces immutability by default to encourage thread safety and compile-time data race checks."
            }
          },
          {
            title: "1.2 Pattern Matching & Conditionals",
            content: "Rust conditional constructs behave as expressions, returning values. 'match' statements evaluate patterns exhaustively, verifying all possible paths at compile-time.",
            code: `fn get_priority(level: u32) -> &'static str {
    match level {
        1 => "High",
        2 => "Medium",
        _ => "Low", // Default wildcard case
    }
}`,
            quiz: {
              question: "Is the default wildcard case (_) mandatory in 'match' if all other cases are not matched?",
              options: ["No, switch cases are optional", "Yes, Rust matches must be exhaustive", "Only for string types", "Only in debug compilations"],
              answer: 1,
              explanation: "The compiler forces 'match' expressions to cover all possible values. The wildcard (_) handles all otherwise unmatched cases."
            }
          },
          {
            title: "1.3 Functions & Control Expressions",
            content: "Rust functions return expressions. Leaving out the semicolon at the end of the final line acts as an implicit return statement.",
            code: `fn add(a: i32, b: i32) -> i32 {
    a + b // No return keyword, no semicolon = returned expression
}`,
            quiz: {
              question: "How does a function return a value implicitly in Rust?",
              options: ["Omitting parameters", "Omitting the semicolon on the final expression line", "Using backticks", "Using arrow operators"],
              answer: 1,
              explanation: "Leaving off the semicolon at the end of the final block expression causes Rust to return that value automatically."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Ownership & The Move Semantics",
            content: "Rust does not use a garbage collector. Memory is managed via a strict compiler check called the Borrow Checker. Rules: 1) Each value has a single owner. 2) When owner goes out of scope, memory is freed. 3) You can have either one mutable reference OR multiple immutable references.",
            code: `fn main() {
    let s1 = String::from("Rust");
    let s2 = s1; // Ownership is MOVED. s1 is now invalid.
    
    // println!("{}", s1); // Compilation Error!
    print_str(&s2);      // Borrowing references
}

fn print_str(val: &String) {
    println!("{}", val);
}`,
            quiz: {
              question: "What is the name of the Rust compiler component that validates pointer references?",
              options: ["Garbage Collector", "Borrow Checker", "Static Compiler", "Interpreter"],
              answer: 1,
              explanation: "The Borrow Checker enforces reference lifetimes and aliasing rules at compile time, eliminating memory leaks and data races."
            }
          },
          {
            title: "2.2 Borrowing & Reference Rules",
            content: "References allow referencing data without taking ownership. Rust restricts reference access to: either exactly one mutable reference (&mut T) OR any number of immutable references (&T) within a scope.",
            code: `fn main() {
    let mut data = String::from("Hi");
    
    let r1 = &data; // OK
    let r2 = &data; // OK
    // let r3 = &mut data; // COMPILE ERROR! Cannot mix mutable/immutable
}`,
            quiz: {
              question: "How many mutable references can exist for a variable inside a specific scope in Rust?",
              options: ["Unlimited", "Zero", "Exactly one", "Two"],
              answer: 2,
              explanation: "To prevent data races, Rust permits only a single active mutable reference (&mut) to a variable inside any scope."
            }
          },
          {
            title: "2.3 Lifetimes & Reference Safety",
            content: "Lifetimes ('a) are explicit annotations the compiler uses to ensure references remain valid as long as they are in use, avoiding dangling pointer bugs.",
            code: `// Lifetime 'a guarantees returned reference remains valid 
// as long as both input references are in scope
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
            quiz: {
              question: "What is the purpose of lifetime annotations in Rust?",
              options: ["To delay garbage collection", "To ensure referenced memory does not outlive its owner", "To count references", "To compile multi-threaded blocks"],
              answer: 1,
              explanation: "Lifetimes prevent dangling references by ensuring the borrow duration matches the owner's storage scope."
            }
          }
        ]
      },
      {
        title: "3. Object-Oriented Programming (OOP)",
        topics: [
          {
            title: "3.1 Traits & Structs",
            content: "Rust doesn't have classes. Instead, developers define data layouts inside Structs, and behavioral contracts inside Traits (similar to interfaces).",
            code: `struct Developer {
    name: String,
    xp: u32,
}

trait Coder {
    fn code(&self);
}

impl Coder for Developer {
    fn code(&self) {
        println!("{} is coding", self.name);
    }
}`,
            quiz: {
              question: "What is Rust's equivalent to interface declarations?",
              options: ["Struct", "Class", "Trait", "Enum"],
              answer: 2,
              explanation: "Traits define shared behaviors. Structs implement those traits using the 'impl Trait for Struct' syntax block."
            }
          },
          {
            title: "3.2 Struct Encodings & Associated Functions",
            content: "Structs support associated functions (similar to static methods in other languages) declared in 'impl' blocks that do not accept a 'self' receiver.",
            code: `struct Rect { width: u32, height: u32 }

impl Rect {
    // Associated function (Constructor equivalent)
    fn new(w: u32, h: u32) -> Self {
        Rect { width: w, height: h }
    }
}`,
            quiz: {
              question: "How do you invoke an associated function that has no 'self' parameter in Rust?",
              options: ["rect.new()", "Rect::new()", "Rect.new()", "new Rect()"],
              answer: 1,
              explanation: "Associated functions are called using the double colon (::) path selector (e.g. Rect::new(10, 20))."
            }
          },
          {
            title: "3.3 Default Trait Implementations",
            content: "Traits can provide default method implementations. Implementing structs can accept these defaults or override them.",
            code: `trait Greeter {
    fn greet(&self) {
        println!("Hello!"); // Default method implementation
    }
}
struct User;
impl Greeter for User {} // Inherits default greet()`,
            quiz: {
              question: "Can a Rust trait contain concrete method bodies?",
              options: ["No, only method declarations", "Yes, they can define default implementation methods", "Only for numeric traits", "Only inside main()"],
              answer: 1,
              explanation: "Traits can define default behaviors. Implementing structs inherit these defaults automatically unless they override them."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Pattern Matching & Enums",
            content: "Enums in Rust can hold data payloads. Pattern matching ('match') is exhaustive, forcing compilation checks to handle every possible value case.",
            code: `enum NetworkState {
    Offline,
    Active(String), // Payload string
}

fn handle_state(state: NetworkState) {
    match state {
        NetworkState::Offline => println!("Disconnected"),
        NetworkState::Active(ip) => println!("IP: {}", ip),
    }
}`,
            quiz: {
              question: "Which keyword executes conditional code by exhaustively matching values?",
              options: ["if-else", "switch", "match", "select"],
              answer: 2,
              explanation: "The match keyword evaluates an expression and matches it against patterns. Rust requires match statements to be exhaustive."
            }
          },
          {
            title: "4.2 Option & Result Error Types",
            content: "Rust does not have a null pointer. Nullability is solved using the 'Option<T>' enum (Some/None). Recoverable errors are returned using 'Result<T, E>'.",
            code: `fn find_user(id: u32) -> Option<String> {
    if id == 1 { Some("Sarah".to_string()) } else { None }
}`,
            quiz: {
              question: "How does Rust represent nullable (optional) values in a type-safe way?",
              options: ["Null pointer", "Option enum (Some / None)", "Void casts", "Throwing NullPointerException"],
              answer: 1,
              explanation: "Rust represents nullable states using the Option<T> type. The compiler forces checking both Some(val) and None cases."
            }
          },
          {
            title: "4.3 Concurrency & Fearless Threading",
            content: "Rust guarantees thread safety via Send (allows transferring ownership across threads) and Sync (allows sharing references across threads) traits, prevented data races at compile-time.",
            code: `use std::thread;

fn spawn_job() {
    let handle = thread::spawn(|| {
        println!("Running in thread!");
    });
    handle.join().unwrap();
}`,
            quiz: {
              question: "Which trait designates that ownership of a type can be transferred safely across thread boundaries?",
              options: ["Sync", "Copy", "Send", "Clone"],
              answer: 2,
              explanation: "Types implementing the Send trait can transfer ownership to another thread safely, validated by the compiler."
            }
          }
        ]
      },
      {
        title: "5. Standard Library / Errors",
        topics: [
          {
            title: "5.1 Vectors & String Types",
            content: "Rust standard collections include Vec<T> (heap-allocated growable list) and String (UTF-8 growable text block). Standard string slices (&str) reference borrowed parts of text.",
            code: `fn play_strings() {
    let mut vec = vec![1, 2, 3];
    let mut s: String = String::from("Rust");
    let slice: &str = &s[0..2]; // "Ru"
}`,
            quiz: {
              question: "What is the differences between &str and String in Rust?",
              options: ["String is a read-only constant", "&str is heap-owned while String is a stack slice", "String is a growable heap-owned text block, while &str is an immutable borrowed string slice", "They are identical"],
              answer: 2,
              explanation: "String manages its own heap buffer and can grow. &str is a reference (slice) pointing to some existing UTF-8 characters owned elsewhere."
            }
          },
          {
            title: "5.2 Error Propagation with '?' Operator",
            content: "The question mark (?) operator propagates errors. It unwraps Ok values or returns Err directly to the calling function, simplifying nested checks.",
            code: `use std::fs::File;
use std::io;

fn open_log() -> Result<File, io::Error> {
    let f = File::open("log.txt")?; // returns error immediately if open fails
    Ok(f)
}`,
            quiz: {
              question: "What does the '?' operator do when placed after a Result value in a function?",
              options: ["Throws a panic", "Returns the unwrapped Ok value, or returns the Err early from the function", "Starts debugging", "Casts to bool"],
              answer: 1,
              explanation: "The '?' operator checks a Result. If Ok, it yields the inner value. If Err, it returns the error immediately from the outer function."
            }
          },
          {
            title: "5.3 Smart Pointers: Box, Rc & RefCell",
            content: "Standard smart pointers allocate and coordinate memory: Box (heap allocation), Rc (reference-counted shared ownership), and RefCell (enforces interior mutability at runtime).",
            code: `use std::rc::Rc;

let shared_data = Rc::new(100);
let clone1 = Rc::clone(&shared_data); // Increments Rc count`,
            quiz: {
              question: "Which smart pointer permits multiple readers (shared ownership) of an immutable heap value?",
              options: ["Box", "Rc", "RefCell", "std::unique_ptr"],
              answer: 1,
              explanation: "Rc (Reference Counter) enables shared ownership on the heap. Multiple owners can reference Rc pointers; memory is freed when reference count hits zero."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Two Sum solved in Rust",
            content: "Rust implementation of Two Sum using a HashMap.",
            code: `use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&prev_idx) = map.get(&complement) {
            return vec![prev_idx as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}`,
            quiz: {
              question: "What is the benefit of returning a Vec instead of raw arrays?",
              options: ["Faster runtime", "Vec is heap-allocated and supports dynamic sizing", "Saves stack memory", "Vec bypasses type checks"],
              answer: 1,
              explanation: "Vec is Rust's standard growable vector type, allocated on the heap, allowing sizes to be determined dynamically at runtime."
            }
          },
          {
            title: "6.2 Solve Valid Parentheses in Rust",
            content: "Verify balanced bracket structures using a Stack (Vec) in Rust.",
            code: `pub fn is_valid(s: String) -> bool {
    let mut stack = Vec::new();
    for c in s.chars() {
        match c {
            '(' | '{' | '[' => stack.push(c),
            ')' => if stack.pop() != Some('(') { return false; },
            '}' => if stack.pop() != Some('{') { return false; },
            ']' => if stack.pop() != Some('[') { return false; },
            _ => {}
        }
    }
    stack.is_empty()
}`,
            quiz: {
              question: "What Rust construct handles character branch matching cleanly in the Valid Parentheses solution?",
              options: ["if-else if", "match expressions", "select blocks", "trait loops"],
              answer: 1,
              explanation: "The match block matches bracket characters exhaustively, executing specific stack operations for each pattern."
            }
          },
          {
            title: "6.3 Binary Search in Rust",
            content: "Implement Binary Search in Rust utilizing usize array index arithmetic safely.",
            code: `pub fn binary_search(nums: &[i32], target: i32) -> Option<usize> {
    let mut left = 0;
    let mut right = nums.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if nums[mid] == target { return Some(mid); }
        else if nums[mid] < target { left = mid + 1; }
        else { right = mid; }
    }
    None
}`,
            quiz: {
              question: "Why does the binary search return Option<usize> instead of a raw integer?",
              options: ["To speed up execution", "To represent the optional presence of the index in a type-safe way", "Because array sizes can change", "To comply with thread safety"],
              answer: 1,
              explanation: "Returning Option<usize> cleanly indicates whether the element was found (Some(index)) or not (None), avoiding magic return values like -1."
            }
          }
        ]
      }
    ]
  },
  sql: {
    name: "SQL",
    icon: "sql",
    color: "from-blue-600 to-indigo-700",
    desc: "Structured Query Language. Covers DQL filters, execution order, transactions (ACID), window functions, indexes, and performance optimization.",
    officialDocs: "https://www.postgresql.org/docs/",
    sections: [
      {
        title: "1. Language Basics",
        topics: [
          {
            title: "1.1 DQL Filtering & Aggregate",
            content: "SQL queries fetch data. Use SELECT to pick columns, WHERE to filter rows, and aggregate functions (SUM, AVG, COUNT) with GROUP BY to consolidate data sets.",
            code: `SELECT department_id, COUNT(*) as employee_count, AVG(salary) as avg_sal
FROM employees
WHERE hire_date > '2020-01-01'
GROUP BY department_id
HAVING AVG(salary) > 50000;`,
            quiz: {
              question: "Which clause is used to filter aggregated data results in SQL?",
              options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
              answer: 1,
              explanation: "While WHERE filters raw source rows, HAVING filters consolidated aggregates created by a GROUP BY clause."
            }
          },
          {
            title: "1.2 Joins & Set Operations",
            content: "Joins combine columns from multiple tables. Inner Join returns matched keys, Left Join includes unmatched left-table rows. Set operations (UNION, INTERSECT, EXCEPT) combine query output rows.",
            code: `SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;`,
            quiz: {
              question: "Which Join returns all records from the left table and matched records from the right?",
              options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
              answer: 1,
              explanation: "LEFT JOIN (or LEFT OUTER JOIN) fetches all rows from the left table, inserting nulls for right-table attributes where keys do not match."
            }
          },
          {
            title: "1.3 SQL Constraints & Schema Creation",
            content: "DDL defines schemas. Constraints enforce database integrity rules: PRIMARY KEY (unique identifier), FOREIGN KEY (referential link), UNIQUE, NOT NULL, and CHECK.",
            code: `CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    age INT CHECK (age >= 18)
);`,
            quiz: {
              question: "Which constraint validates that values in a column satisfy a custom boolean check condition?",
              options: ["CHECK", "UNIQUE", "DEFAULT", "FOREIGN KEY"],
              answer: 0,
              explanation: "The CHECK constraint validates that values inserted into a column satisfy a boolean condition (e.g. age >= 18) before allowing the insert."
            }
          }
        ]
      },
      {
        title: "2. Core Concepts",
        topics: [
          {
            title: "2.1 Query Order of Execution",
            content: "Although written starting with SELECT, SQL engines execute clauses in a different logical order: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.",
            code: `-- Logical sequence:
-- 1. Scan employees table (FROM)
-- 2. Filter rows with age > 25 (WHERE)
-- 3. Extract requested fields (SELECT)
SELECT name, age FROM employees WHERE age > 25;`,
            quiz: {
              question: "Which of the following executes first in SQL engine logical query order?",
              options: ["SELECT", "WHERE", "FROM", "HAVING"],
              answer: 2,
              explanation: "The engine must identify the target dataset source (FROM) before performing filters or selecting attributes."
            }
          },
          {
            title: "2.2 Subqueries & Nested SELECTs",
            content: "Subqueries are queries nested inside another query. They can be Scalar (returns one value), Multi-Row (used with IN, ANY, ALL), or Correlated (references columns of the outer query).",
            code: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees); // Scalar subquery`,
            quiz: {
              question: "What is a correlated subquery in SQL?",
              options: ["A query that executes on GPU", "A nested query that references columns of the outer query, executing once for each candidate row", "A query containing JOINS", "A query run in parallel"],
              answer: 1,
              explanation: "A correlated subquery references columns from the parent query, meaning it is executed repeatedly for each row evaluated by the outer query."
            }
          },
          {
            title: "2.3 Null Valued Logic & Three-Valued Logic",
            content: "SQL uses Three-Valued Logic (True, False, Unknown) because of NULL values. Operations comparing NULL values using '=' evaluate to Unknown. Check NULLs using 'IS NULL' or 'IS NOT NULL'.",
            code: `-- Incorrect: SELECT * FROM users WHERE email = NULL; (returns nothing)
-- Correct:
SELECT * FROM users WHERE email IS NULL;`,
            quiz: {
              question: "What does 'NULL = NULL' evaluate to in SQL database engines?",
              options: ["True", "False", "Unknown / NULL", "Compilation error"],
              answer: 2,
              explanation: "Comparing NULL to anything, even another NULL, yields Unknown because NULL represents an unknown value, not a specific value."
            }
          }
        ]
      },
      {
        title: "3. Transactions & ACID",
        topics: [
          {
            title: "3.1 ACID properties & Transaction Blocks",
            content: "ACID ensures transaction safety. Atomicity (all or nothing), Consistency (preserves schemas), Isolation (prevents race states), and Durability (survives crashes). Use isolation levels to manage race conditions.",
            code: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- If either fails, call ROLLBACK;`,
            quiz: {
              question: "What does the 'A' in ACID stand for?",
              options: ["Association", "Aggregation", "Atomicity", "Availability"],
              answer: 2,
              explanation: "Atomicity guarantees that all commands in a transaction block complete successfully, or all changes are rolled back completely."
            }
          },
          {
            title: "3.2 Transaction Isolation Levels",
            content: "Isolation levels manage concurrency read anomalies: Dirty Read (reading uncommitted edits), Non-Repeatable Read (row values change mid-transaction), and Phantom Read (new rows appear). Isolation levels include Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
            code: `-- Set isolation level in PostgreSQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`,
            quiz: {
              question: "Which isolation level prevents all read anomalies, including Phantom Reads?",
              options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
              answer: 3,
              explanation: "Serializable is the highest isolation level. It forces transactions to execute as if they were serial, completely avoiding dirty, non-repeatable, and phantom reads."
            }
          },
          {
            title: "3.3 Database Locks (Shared vs Exclusive)",
            content: "Engines lock rows/tables to prevent conflicts. Shared Locks (Read Locks) allow concurrent reads but block updates. Exclusive Locks (Write Locks) block both reads and writes.",
            code: `-- Acquire exclusive lock on row for updates
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;`,
            quiz: {
              question: "What keyword is appended to a SELECT query to acquire write locks on targeted rows until transaction commit?",
              options: ["LOCK ROW", "FOR UPDATE", "SECURE", "EXCLUDE"],
              answer: 1,
              explanation: "The 'FOR UPDATE' clause locks matching rows, block other transactions from updating or locking them until the active transaction commits or rolls back."
            }
          }
        ]
      },
      {
        title: "4. Advanced Features",
        topics: [
          {
            title: "4.1 Window Functions & CTEs",
            content: "Window functions calculate values across related rows without grouping them. Common Table Expressions (CTEs) create clean, reusable query views.",
            code: `WITH RankedSalaries AS (
    SELECT employee_id, name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as sal_rank
    FROM employees
)
SELECT * FROM RankedSalaries WHERE sal_rank <= 3;`,
            quiz: {
              question: "Which window function assigns ranks without gaps between identical values?",
              options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "LEAD()"],
              answer: 1,
              explanation: "DENSE_RANK() assigns consecutive rank values, preventing ranking gaps when values tie."
            }
          },
          {
            title: "4.2 Recursive CTEs",
            content: "Recursive CTEs reference themselves, allowing SQL queries to traverse hierarchical structures like organizational employee charts or tree networks.",
            code: `WITH RECURSIVE OrgChart AS (
    // Anchor member
    SELECT emp_id, manager_id, name, 1 as level
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    // Recursive member
    SELECT e.emp_id, e.manager_id, e.name, o.level + 1
    FROM employees e
    INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT * FROM OrgChart;`,
            quiz: {
              question: "What query construct is designed to traverse trees or hierarchy charts recursively in SQL?",
              options: ["Recursive CTE", "Inner Joins list", "Window Ranking", "Having filters"],
              answer: 0,
              explanation: "A Recursive Common Table Expression (CTE) references its own output repeatedly, making it ideal for graph or hierarchy traversals."
            }
          },
          {
            title: "4.3 Database Triggers & Stored Procedures",
            content: "Stored Procedures encapsulate business logic on the database side. Triggers are procedures invoked automatically in response to database events (INSERT, UPDATE, DELETE).",
            code: `CREATE TRIGGER audit_log
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION log_new_user();`,
            quiz: {
              question: "What object executes automatically in response to table modifications like INSERT or UPDATE?",
              options: ["Stored Procedure", "Database Trigger", "Index Plan", "Common Table Expression"],
              answer: 1,
              explanation: "A Trigger is a database handler that fires automatically whenever its configured DML event modifies the target table."
            }
          }
        ]
      },
      {
        title: "5. DB Schema & Optimizations",
        topics: [
          {
            title: "5.1 Database Indexing & Query Plans",
            content: "Indexes (like B-Trees) speed up lookup times from O(n) scan to O(log n). Analyze queries with the EXPLAIN keyword to check index usage.",
            code: `CREATE INDEX idx_emp_email ON employees(email);

-- Analyze execution plan
EXPLAIN ANALYZE SELECT * FROM employees WHERE email = 'test@codeverse.com';`,
            quiz: {
              question: "What data structure is most commonly used for relational database indexes?",
              options: ["Hash Table", "Binary Search Tree", "B-Tree", "Linked List"],
              answer: 2,
              explanation: "Relational engines primarily use B-Trees (and B+ Trees) because they are highly efficient for range checks and disk-page reads."
            }
          },
          {
            title: "5.2 Database Normalization Forms",
            content: "Normalization reduces data redundancy. Key levels: 1NF (atomic values, unique row keys), 2NF (eliminates partial dependencies), and 3NF (eliminates transitive dependencies).",
            code: `-- 3NF enforces that non-key attributes must depend 
-- only on the primary key, avoiding redundant repetitions.`,
            quiz: {
              question: "Which normal form requires resolving transitive dependencies?",
              options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form"],
              answer: 2,
              explanation: "Third Normal Form (3NF) requires a table to be in 2NF and have all non-key columns depend strictly on the primary key, eliminating transitive dependencies."
            }
          },
          {
            title: "5.3 Partitioning & Sharding",
            content: "Partitioning splits tables into smaller logical child tables on a single server (e.g. by date range). Sharding distributes partitions horizontally across multiple database nodes.",
            code: `CREATE TABLE measurements (
    id INT,
    log_date DATE NOT NULL
) PARTITION BY RANGE (log_date);`,
            quiz: {
              question: "What is the difference between partitioning and sharding?",
              options: ["Partitioning requires NoSQL databases", "Partitioning divides data within a single instance, whereas sharding distributes data across multiple machines", "They are identical", "Sharding is done inside RAM memory"],
              answer: 1,
              explanation: "Table partitioning splits a table locally on one server. Sharding goes a step further, distributing segments horizontally across separate server nodes."
            }
          }
        ]
      },
      {
        title: "6. Practice & Exercises",
        topics: [
          {
            title: "6.1 Solve Duplicate Emails Query",
            content: "Write a query to isolate duplicate entries in a User contact list.",
            code: `SELECT email, COUNT(email)
FROM users
GROUP BY email
HAVING COUNT(email) > 1;`,
            quiz: {
              question: "Which operator filters duplicate aggregates?",
              options: ["WHERE COUNT(email) > 1", "HAVING COUNT(email) > 1", "GROUP BY COUNT(email) > 1", "DISTINCT COUNT(email)"],
              answer: 1,
              explanation: "HAVING is used to filter aggregated group values (COUNT > 1)."
            }
          },
          {
            title: "6.2 Second Highest Salary",
            content: "Write a query to find the second highest salary from an Employee table. Handle tie cases using subqueries or window functions.",
            code: `SELECT MAX(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
            quiz: {
              question: "How does the subquery solution avoid returning ties for the absolute highest salary?",
              options: ["By grouping salaries", "By filtering out salaries equal to the absolute maximum salary value", "By sorting in ascending order", "Using distinct rows count"],
              answer: 1,
              explanation: "The subquery finds the maximum salary. The outer query then finds the maximum salary strictly smaller than that value, isolating the second highest."
            }
          },
          {
            title: "6.3 Nth Highest Salary",
            content: "Write a query or CTE to find the Nth highest salary in the Employee table using dense ranking.",
            code: `WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as r
    FROM employees
)
SELECT salary FROM RankedSalaries WHERE r = 2; -- e.g. 2nd highest`,
            quiz: {
              question: "Why is DENSE_RANK() preferred over ROW_NUMBER() when finding Nth highest values?",
              options: ["ROW_NUMBER() takes longer", "DENSE_RANK() assigns the same rank to identical values, preserving ties without skipping rank counts", "ROW_NUMBER() is not supported in window clauses", "DENSE_RANK() requires no partitions"],
              answer: 1,
              explanation: "DENSE_RANK() handles duplicate values by awarding them the same rank and continuing with the next consecutive integer, ensuring tied values do not skip rank positions."
            }
          }
        ]
      }
    ]
  }
};
