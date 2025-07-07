require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});

const editors = {};
const defaultCode = {
    'home': 'print("Hello, World!")',
    'intro': 'print("Hello, World!")',
    'hello': 'print("Hello, World!")',
    'run-hello': 'python hello.py',
    'version': 'import sys\nprint(sys.version)',
    'syntax-repl': '>>> print("Hello, World!")\nHello, World!',
    'syntax-cmd': 'C:\\Users\\نام شما >python myfile.py',
    'indentation': 'if 5 > 2:\n    print("پنج بزرگتر از دو است.")',
    'indentation-error': 'if 5 > 2:\nprint("پنج برگتر از دو است.")',
    'indentation-valid': 'if 5 > 2:\n print("پنج برگتر از دو است.")',
    'indentation-invalid': 'if 5 > 2:\n    print("پنج برگتر از دو است.")\n     print("پنج برگتر از دو است.")',
    'variables': 'x = Python #ایکس یک متغیر است با مقدار نام\ny = "3" #y یک متغیر است با مقدار 3\nprint(x)\nprint(y)',
    'comments': '# این یک کامنت است که پایتون آن را نادیده میگیرد و اجرا نمیشود\nprint("Hello, World!")',
    'comments-simple': '# این یک کامنت است که اجرا نمیشود\nprint("Hello, World!")',
    'comments-inline': 'print("Hello, World!!")  # خروجی: Hello, World!',
    'comments-disable': '# print("این خط اجرا نمی‌شود")\nprint("این خط اجرا می‌شود")',
    'comments-multiline': '# این یک توضیح است\n# که در چند خط\n# نوشته شده\nprint("Hello, World!")',
    'comments-multiline-string': '"""\nاین یک توضیح است\nکه در چند خط\nنوشته شده\nو اجرا نمیشود\n"""\nprint("Hello, World!")',
    'install-cmd': 'python --version',
    'install-terminal': 'python --version',
    'python-repl': '>>> print("Hello, World!")\nHello, World!\n>>> exit()',
    'variables-create': 'x = 5\ny = "Apple"\nprint(x)\nprint(y)',
    'variables-type': 'x = 4       # نوع متغیر ایکس int با عدد است\nx = "Apple" # اما حالا نوع متغیر ایکس استرینگ است str\nprint(x)',
    'variables-casting': 'x = str(3)    # x استرینگ خواهد بود\ny = int(3)    # y عدد خواهد بود\nz = float(3)  # z نوع اعشار خواهد بود\nprint(x)\nprint(y)\nprint(z)',
    'variables-type-check': 'x = 5\ny = "Apple"\nprint(type(x))\nprint(type(y))',
    'variables-quotes': 'x = "Apple"\n# "Apple" و \'Apple\' یکی هستند\nx = \'Apple\'\nprint(x)',
    'variables-case': 'a = 4\nA = "Apple"\nprint(a)\nprint(A)',
    'variable-names-legal': 'myvar = "Apple"\nmy_var = "Apple"\n_my_var = "Apple"\nmyVar = "Apple"\nMYVAR = "Apple"\nmyvar2 = "Apple"\nprint(myvar)\nprint(my_var)\nprint(_my_var)\nprint(myVar)\nprint(MYVAR)\nprint(myvar2)',
    'variable-names-illegal': '2myvar = "Apple"\nmy-var = "Apple"\nmy var = "Apple"\nprint(2myvar)\nprint(my-var)\nprint(my var)',
    'variable-names-conventions': 'myVariableName = "Green"  # Camel Case\nMyVariableName = "Red"  # Pascal Case\nmy_variable_name = "Black"  # Snake Case\nprint(myVariableName)\nprint(MyVariableName)\nprint(my_variable_name)',
    'assign-multi': 'x, y, z = "Orange", "Banana", "Cherry"\nprint(x)\nprint(y)\nprint(z)',
    'assign-single': 'x = y = z = "Orange"\nprint(x)\nprint(y)\nprint(z)',
    'assign-unpack': 'fruits = ["apple", "banana", "cherry"]\nx, y, z = fruits\nprint(x)\nprint(y)\nprint(z)',
    'output-simple': 'x = "Herat Code School"\nprint(x)',
    'output-multi': 'x = "Herat"\ny = "Code"\nz = "School"\nprint(x, y, z)',
    'output-concat': 'x = "Herat "\ny = "Code "\nz = "School"\nprint(x + y + z)',
    'output-number': 'x = 5\ny = 10\nprint(x + y)',
    'output-error': 'x = 5\ny = "Orange"\nprint(x + y)',
    'output-mixed': 'x = 5\ny = "Orange"\nprint(x, y)',
    'global-simple': 'x = "awesome"\n\ndef myfunction():\n    print("Python is " + x)\n\nmyfunction()',
    'global-local': 'x = "awesome"\n\ndef myfunction():\n    x = "fantastic"\n    print("Python is " + x)\n\nmyfunction()\n\nprint("Python is " + x)',
    'global-keyword': 'def myfunc():\n    global x\n    x = "fantastic"\n\nmyfunc()\n\nprint("Python is " + x)',
    'global-change': 'x = "awesome"\n\ndef myfunc():\n    global x\n    x = "fantastic"\n\nmyfunc()\n\nprint("Python is " + x)',
    'data-type-check': 'x = 5\nprint(type(x))',
    'data-types': 'x = "Hello World"\nprint(type(x))  # str\nx = 20\nprint(type(x))  # int\nx = 20.5\nprint(type(x))  # float\nx = 1j\nprint(type(x))  # complex\nx = ["apple", "banana", "cherry"]\nprint(type(x))  # list',
    'specific-data-types': 'x = str("Hello World")\nprint(type(x))  # str\nx = int(20)\nprint(type(x))  # int\nx = float(20.5)\nprint(type(x))  # float\nx = complex(1j)\nprint(type(x))  # complex\nx = list(("apple", "banana", "cherry"))\nprint(type(x))  # list',
    'numbers-create': 'x = 1    # int\ny = 2.8  # float\nz = 1j   # complex\nprint(x)\nprint(y)\nprint(z)',
    'numbers-type-check': 'x = 1\ny = 2.8\nz = 1j\nprint(type(x))\nprint(type(y))\nprint(type(z))',
    'numbers-int': 'x = 1\ny = 35656222554887711\nz = -3255522\nprint(type(x))\nprint(type(y))\nprint(type(z))',
    'numbers-float': 'x = 1.10\ny = 1.0\nz = -35.59\nprint(type(x))\nprint(type(y))\nprint(type(z))',
    'numbers-scientific': 'x = 35e3\ny = 12E4\nz = -87.7e100\nprint(type(x))\nprint(type(y))\nprint(type(z))',
    'numbers-complex': 'x = 3+5j\ny = 5j\nz = -5j\nprint(type(x))\nprint(type(y))\nprint(type(z))',
    'numbers-conversion': 'x = 1    # int\ny = 2.8  # float\nz = 1j   # complex\n\na = float(x)\nb = int(y)\nc = complex(x)\n\nprint(a)\nprint(b)\nprint(c)\n\nprint(type(a))\nprint(type(b))\nprint(type(c))',
    'numbers-random': 'import random\n\nprint(random.randrange(1, 10)) # با هر بار اجرا عددی بین ۱ تا ۱۰ چاپ خواهد کرد',
    'casting-integers': 'x = int(1)\ny = int(2.8)\nz = int("3")\nprint(x)\nprint(y)\nprint(z)',
    'casting-floats': 'x = float(1)\ny = float(2.8)\nz = float("3")\nw = float("4.2")\nprint(x) # => type()\nprint(y) # => type()\nprint(z) # => type()\nprint(w) # => type()',
    'casting-strings': 'x = str("s1")\ny = str(2)\nz = str(3.0)\nprint(x) # => type()\nprint(y) # => type()\nprint(z) # => type()',
    'strings-print': 'print("Hello")\nprint(\'Hello\')',
    'strings-quotes': 'print("I\'m fine")\nprint("=> \' ")\nprint(\'=> "" \')',
    'strings-assign': 'a = "Hello"\nprint(a)',
    'strings-multiline': 'a = """Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua."""\nprint(a)',
    'strings-array': 'a = "Hello, World!"\nprint(a[0])\nprint(a[1])\nprint(a[2])\nprint(a[3])\nprint(a[4])\nprint(a[5])\nprint(a[6])\nprint(a[7])',
    'strings-loop': 'for x in "banana":\n    print(x)',
    'strings-length': 'a = "Hello, World!"\nprint(len(a))',
    'strings-check': 'txt = "The best things in life are free!"\nprint("free" in txt)',
    'strings-check-if': 'txt = "The best things in life are free!"\nif "free" in txt:\n    print("Yes, \'free\' is present.")',
    'strings-not-check': 'txt = "The best things in life are free!"\nprint("expensive" not in txt)',
    'strings-not-check-if': 'txt = "The best things in life are free!"\nif "expensive" not in txt:\n    print("No, \'expensive\' is NOT present.")',
    'strings-slice': 'b = "Hello, World!"\nprint(b[2:5])\nprint(b[0:5])',
    'strings-slice-start': 'b = "Hello, World!"\nprint(b[:5])',
    'strings-slice-end': 'b = "Hello, World!"\nprint(b[2:])',
    'strings-slice-negative': 'b = "Hello, World!"\nprint(b[-5:-2])',
    'strings-upper': 'a = "Hello, World!"\nprint(a.upper())',
    'strings-lower': 'a = "Hello, World!"\nprint(a.lower())',
    'strings-strip': 'a = " Hello, World! "\nprint(a.strip())',
    'strings-replace': 'a = "Hello, World!"\nprint(a.replace("H", "J"))',
    'strings-split': 'a = "Hello, World!"\nprint(a.split(","))',
    'strings-concatenate': 'a = "Hello"\nb = "World"\nc = a + b\nprint(c)',
    'strings-concatenate-space': 'a = "Hello"\nb = "World"\nc = a + " " + b\nprint(c)',
    'strings-format-error': 'age = 36\ntxt = "I am " + age\nprint(txt)',
    'strings-f-string': 'age = 36\ntxt = f"I am {age} years old"\nprint(txt)',
    'strings-f-string-placeholder': 'price = 59\ntxt = f"The price is {price}$"\nprint(txt)',
    'strings-f-string-modifier': 'price = 59\ntxt = f"The price is {price:.2f}$"\nprint(txt)',
    'strings-f-string-operation': 'txt = f"The price is {20 * 59}$"\nprint(txt)',
    'strings-escape-error': 'txt = "in our "python" course, you will learn python from zero to 100',
    'strings-escape-quote': 'txt = "in our \\"python\\" course, you will learn python from zero to 100"\nprint(txt)',
    'strings-escape-chars': 'txt = "Hello\\nWorld!"\nprint(txt)',
    'booleans-comparison': 'print(10 > 9)\nprint(10 == 9)\nprint(10 < 9)',
    'booleans-if': 'a = 200\nb = 33\n\nif b > a:\n    print("b is greater than a")\nelse:\n    print("b is not greater than a")',
    'booleans-evaluate': 'print(bool("Hello"))\nprint(bool(15))',
    'booleans-variables': 'x = "Hello"\ny = 15\n\nprint(bool(x))\nprint(bool(y))',
    'booleans-true': 'print(bool("abc"))\nprint(bool(123))\nprint(bool(["apple", "cherry", "banana"]))',
    'booleans-false': 'print(bool(False))\nprint(bool(None))\nprint(bool(0))\nprint(bool(""))\nprint(bool(()))\nprint(bool([]))\nprint(bool({}))',
    'booleans-class': 'class myclass():\n    def __len__(self):\n        return 0\n\nmyobj = myclass()\nprint(bool(myobj))',
    'booleans-function': 'def myFunction():\n    return True\n\nprint(myFunction())',
    'booleans-function-if': 'def myFunction():\n    return True\n\nif myFunction():\n    print("YES!")\nelse:\n    print("NO!")',
    'booleans-isinstance': 'x = 200\nprint(isinstance(x, int))',
    'operators-addition': 'print(10 + 5)',
    'arithmetic-operators': 'x = 10\ny = 3\nprint(x + y)  # جمع\nprint(x - y)  # تفریق\nprint(x * y)  # ضرب\nprint(x / y)  # تقسیم\nprint(x % y)  # مدولوس\nprint(x ** y) # توان\nprint(x // y) # تقسیم صحیح',
    'assignment-operators': 'x = 5\nprint(x)  # =\nx += 3\nprint(x)  # +=\nx -= 3\nprint(x)  # -=\nx *= 3\nprint(x)  # *=\nx /= 3\nprint(x)  # /=\nx %= 3\nprint(x)  # %=\nx = 5\nx //= 3\nprint(x)  # //=\nx = 5\nx **= 3\nprint(x)  # **=\nx = 5\nx &= 3\nprint(x)  # &=\nx = 5\nx |= 3\nprint(x)  # |=\nx = 5\nx ^= 3\nprint(x)  # ^=\nx = 5\nx >>= 3\nprint(x)  # >>=\nx = 5\nx <<= 3\nprint(x)  # <<=\nprint(x := 3)  # :=',
    'comparison-operators': 'x = 5\ny = 3\nprint(x == y)  # مساوی\nprint(x != y)  # نابرابر\nprint(x > y)   # بزرگ‌تر\nprint(x < y)   # کوچک‌تر\nprint(x >= y)  # بزرگ‌تر یا مساوی\nprint(x <= y)  # کوچک‌تر یا مساوی',
    'logical-operators': 'x = 5\nprint(x < 5 and x < 10)  # and\nprint(x < 5 or x < 4)    # or\nprint(not(x < 5 and x < 10))  # not',
    'identity-operators': 'x = ["apple", "banana"]\ny = ["apple", "banana"]\nz = x\nprint(x is z)      # همان شیء\nprint(x is y)      # شیء متفاوت\nprint(x == y)      # مقادیر برابر\nprint(x is not y)  # شیء متفاوت',
    'membership-operators': 'x = "apple"\ny = ["apple", "banana"]\nprint(x in y)      # in\nprint(x not in y)  # not in',
    'bitwise-operators': 'x = 5\ny = 3\nprint(x & y)   # AND\nprint(x | y)   # OR\nprint(x ^ y)   # XOR\nprint(~x)      # NOT\nprint(x << 2)\nprint(x >> 2)',
    'precedence-parentheses': 'print((6 + 3) - (6 + 3))',
    'precedence-multiplication': 'print(100 + 5 * 3)',
    'precedence-same': 'print(5 + 4 - 7 + 3)',
    'list-create': 'thislist = ["apple", "banana", "cherry"]\nprint(thislist)',
    'list-duplicates': 'thislist = ["apple", "banana", "cherry", "apple", "cherry"]\nprint(thislist)',
    'list-length': 'thislist = ["apple", "banana", "cherry"]\nprint(len(thislist))',
    'list-data-types': 'list1 = ["apple", "banana", "cherry"]\nlist2 = [1, 5, 7, 9, 3]\nlist3 = [True, False, False]\nprint(list1)\nprint(list2)\nprint(list3)',
    'list-mixed-types': 'list1 = ["abc", 34, True, 40, "male"]\nprint(list1)',
    'list-type': 'mylist = ["apple", "banana", "cherry"]\nprint(type(mylist))',
    'list-constructor': 'thislist = list(("apple", "banana", "cherry"))\nprint(thislist)',
    'list-access': 'thislist = ["apple", "banana", "cherry"]\nprint(thislist[1])',
    'list-negative-index': 'thislist = ["apple", "banana", "cherry"]\nprint(thislist[-1])',
    'list-range-index': 'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\nprint(thislist[2:5])',
    'list-range-start': 'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\nprint(thislist[:4])',
    'list-range-end': 'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\nprint(thislist[2:])',
    'list-negative-range': 'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]\nprint(thislist[-4:-1])',
    'list-check-item': 'thislist = ["apple", "banana", "cherry"]\nif "apple" in thislist:\n    print("Apple در لیست میوه‌ها قرار دارد")',
    'list-change-item': 'thislist = ["apple", "banana", "cherry"]\nthislist[1] = "blackcurrant"\nprint(thislist)',
    'list-change-range': 'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]\nthislist[1:3] = ["blackcurrant", "watermelon"]\nprint(thislist)',
    'list-change-more': 'thislist = ["apple", "banana", "cherry"]\nthislist[1:2] = ["blackcurrant", "watermelon"]\nprint(thislist)',
    'list-change-less': 'thislist = ["apple", "banana", "cherry"]\nthislist[1:3] = ["watermelon"]\nprint(thislist)',
    'list-insert': 'thislist = ["apple", "banana", "cherry"]\nthislist.insert(2, "watermelon")\nprint(thislist)',
    'list-append': 'thislist = ["apple", "banana", "cherry"]\nthislist.append("orange")\nprint(thislist)',
    'list-insert-position': 'thislist = ["apple", "banana", "cherry"]\nthislist.insert(1, "orange")\nprint(thislist)',
    'list-extend': 'thislist = ["apple", "banana", "cherry"]\ntropical = ["mango", "pineapple", "papaya"]\nthislist.extend(tropical)\nprint(thislist)',
    'list-extend-iterable': 'thislist = ["apple", "banana", "cherry"]\nthistuple = ("kiwi", "orange")\nthislist.extend(thistuple)\nprint(thislist)',
    'list-remove': 'thislist = ["apple", "banana", "cherry"]\nthislist.remove("banana")\nprint(thislist)',
    'list-remove-first': 'thislist = ["apple", "banana", "cherry", "banana", "kiwi"]\nthislist.remove("banana")\nprint(thislist)',
    'list-pop': 'thislist = ["apple", "banana", "cherry"]\nthislist.pop(1)\nprint(thislist)',
    'list-pop-last': 'thislist = ["apple", "banana", "cherry"]\nthislist.pop()\nprint(thislist)',
    'list-del': 'thislist = ["apple", "banana", "cherry"]\ndel thislist[0]\nprint(thislist)',
    'list-del-all': 'thislist = ["apple", "banana", "cherry"]\ndel thislist\n# print(thislist) # این باعث ایجاد خطا می‌شود زیرا لیست دیگر وجود ندارد',
    'list-clear': 'thislist = ["apple", "banana", "cherry"]\nthislist.clear()\nprint(thislist)',
    'list-loop-for': 'thislist = ["apple", "banana", "cherry"]\nfor x in thislist:\n    print(x)',
    'list-loop-index': 'thislist = ["apple", "banana", "cherry"]\nfor i in range(len(thislist)):\n    print(thislist[i])',
    'list-loop-while': 'thislist = ["apple", "banana", "cherry"]\ni = 0\nwhile i < len(thislist):\n    print(thislist[i])\n    i = i + 1',
    'list-comprehension-loop': 'thislist = ["apple", "banana", "cherry"]\n[print(x) for x in thislist]',
    'list-comprehension-without': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = []\n\nfor x in fruits:\n    if "a" in x:\n        newlist.append(x)\n\nprint(newlist)',
    'list-comprehension-with': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x for x in fruits if "a" in x]\nprint(newlist)',
    'list-comprehension-condition': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x for x in fruits if x != "apple"]\nprint(newlist)',
    'list-comprehension-no-condition': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x for x in fruits]\nprint(newlist)',
    'list-comprehension-range': 'newlist = [x for x in range(10)]\nprint(newlist)',
    'list-comprehension-range-condition': 'newlist = [x for x in range(10) if x < 5]\nprint(newlist)',
    'list-comprehension-upper': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x.upper() for x in fruits]\nprint(newlist)',
    'list-comprehension-hello': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = ["hello" for x in fruits]\nprint(newlist)',
    'list-comprehension-replace': 'fruits = ["apple", "banana", "cherry", "kiwi", "mango"]\nnewlist = [x if x != "banana" else "orange" for x in fruits]\nprint(newlist)',
    'list-sort-alpha': 'thislist = ["orange", "mango", "kiwi", "pineapple", "banana"]\nthislist.sort()\nprint(thislist)',
    'list-sort-numeric': 'thislist = [100, 50, 65, 82, 23]\nthislist.sort()\nprint(thislist)',
    'list-sort-desc-alpha': 'thislist = ["orange", "mango", "kiwi", "pineapple", "banana"]\nthislist.sort(reverse=True)\nprint(thislist)',
    'list-sort-desc-numeric': 'thislist = [100, 50, 65, 82, 23]\nthislist.sort(reverse=True)\nprint(thislist)',
    'list-sort-custom': 'def myfunc(n):\n    return abs(n - 50)\n\nthislist = [100, 50, 65, 82, 23]\nthislist.sort(key=myfunc)\nprint(thislist)',
    'list-sort-case-insensitive': 'thislist = ["banana", "Orange", "Kiwi", "cherry"]\nthislist.sort(key=str.lower)\nprint(thislist)',
    'list-reverse': 'thislist = ["banana", "Orange", "Kiwi", "cherry"]\nthislist.reverse()\nprint(thislist)',
    'list-copy-method': 'thislist = ["apple", "banana", "cherry"]\nmylist = thislist.copy()\nprint(mylist)',
    'list-copy-list': 'thislist = ["apple", "banana", "cherry"]\nmylist = list(thislist)\nprint(mylist)',
    'list-copy-slice': 'thislist = ["apple", "banana", "cherry"]\nmylist = thislist[:]\nprint(mylist)',
    'list-join-plus': 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\nlist3 = list1 + list2\nprint(list3)',
    'list-join-append': 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\n\nfor x in list2:\n    list1.append(x)\n\nprint(list1)',
    'list-join-extend': 'list1 = ["a", "b", "c"]\nlist2 = [1, 2, 3]\nlist1.extend(list2)\nprint(list1)',
    'tuple-create': 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple)',
    'tuple-duplicates': 'thistuple = ("apple", "banana", "cherry", "apple", "cherry")\nprint(thistuple)',
    'tuple-length': 'thistuple = ("apple", "banana", "cherry")\nprint(len(thistuple))',
    'tuple-one-item': 'thistuple = ("apple",)\nprint(type(thistuple))\n\n# بدون کاما به عنوان استرینگ در نظر گرفته خواهد شد\nthistuple = ("apple")\nprint(type(thistuple))',
    'tuple-data-types': 'tuple1 = ("apple", "banana", "cherry")\ntuple2 = (1, 5, 7, 9, 3)\ntuple3 = (True, False, False)\nprint(tuple1)\nprint(tuple2)\nprint(tuple3)',
    'tuple-mixed-types': 'tuple1 = ("abc", 34, True, 40, "male")\nprint(tuple1)',
    'tuple-type': 'mytuple = ("apple", "banana", "cherry")\nprint(type(mytuple))',
    'tuple-constructor': 'thistuple = tuple(("apple", "banana", "cherry"))\nprint(thistuple)',
    'tuple-access': 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple[1])',
    'tuple-negative-index': 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple[-1])',
    'tuple-range-index': 'thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")\nprint(thistuple[2:5])',
    'tuple-range-start': 'thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")\nprint(thistuple[:4])',
    'tuple-range-end': 'thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")\nprint(thistuple[2:])',
    'tuple-negative-range': 'thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")\nprint(thistuple[-4:-1])',
    'tuple-check-item': 'thistuple = ("apple", "banana", "cherry")\nif "apple" in thistuple:\n    print("Yes, \'apple\' is in the fruits tuple")',
    'tuple-change': 'x = ("apple", "banana", "cherry")\ny = list(x)\ny[1] = "kiwi"\nx = tuple(y)\nprint(x)',
    'tuple-add-list': 'thistuple = ("apple", "banana", "cherry")\ny = list(thistuple)\ny.append("orange")\nthistuple = tuple(y)\nprint(thistuple)',
    'tuple-add-tuple': 'thistuple = ("apple", "banana", "cherry")\ny = ("orange",)\nthistuple += y\nprint(thistuple)',
    'tuple-remove': 'thistuple = ("apple", "banana", "cherry")\ny = list(thistuple)\ny.remove("apple")\nthistuple = tuple(y)\nprint(thistuple)',
    'tuple-delete': 'thistuple = ("apple", "banana", "cherry")\ndel thistuple\n# print(thistuple) # این باعث ایجاد خطا می‌شود زیرا تاپل دیگر وجود ندارد',
    'tuple-packing': 'fruits = ("apple", "banana", "cherry")\nprint(fruits)',
    'tuple-unpacking': 'fruits = ("apple", "banana", "cherry")\n(green, yellow, red) = fruits\nprint(green)\nprint(yellow)\nprint(red)',
    'tuple-unpack-asterisk': 'fruits = ("apple", "banana", "cherry", "strawberry", "raspberry")\n(green, yellow, *red) = fruits\nprint(green)\nprint(yellow)\nprint(red)',
    'tuple-unpack-middle': 'fruits = ("apple", "mango", "papaya", "pineapple", "cherry")\n(green, *tropic, red) = fruits\nprint(green)\nprint(tropic)\nprint(red)',
    'tuple-loop-for': 'thistuple = ("apple", "banana", "cherry")\nfor x in thistuple:\n    print(x)',
    'tuple-loop-index': 'thistuple = ("apple", "banana", "cherry")\nfor i in range(len(thistuple)):\n    print(thistuple[i])',
    'tuple-loop-while': 'thistuple = ("apple", "banana", "cherry")\ni = 0\nwhile i < len(thistuple):\n    print(thistuple[i])\n    i = i + 1',
    'tuple-join': 'tuple1 = ("a", "b", "c")\ntuple2 = (1, 2, 3)\ntuple3 = tuple1 + tuple2\nprint(tuple3)',
    'tuple-multiply': 'fruits = ("apple", "banana", "cherry")\nmytuple = fruits * 2\nprint(mytuple)',
    'set-create': 'thisset = {"apple", "banana", "cherry"}\nprint(thisset)',
    'set-duplicates': 'thisset = {"apple", "banana", "cherry", "apple"}\nprint(thisset)',
    'set-true-one': 'thisset = {"apple", "banana", "cherry", True, 1, 2}\nprint(thisset)',
    'set-false-zero': 'thisset = {"apple", "banana", "cherry", False, True, 0}\nprint(thisset)',
    'set-length': 'thisset = {"apple", "banana", "cherry"}\nprint(len(thisset))',
    'set-data-types': 'set1 = {"apple", "banana", "cherry"}\nset2 = {1, 5, 7, 9, 3}\nset3 = {True, False, False}\nprint(set1)\nprint(set2)\nprint(set3)',
    'set-mixed-types': 'set1 = {"abc", 34, True, 40, "male"}\nprint(set1)',
    'set-type': 'myset = {"apple", "banana", "cherry"}\nprint(type(myset))',
    'set-constructor': 'thisset = set(("apple", "banana", "cherry"))\nprint(thisset)',
    'set-loop': 'thisset = {"apple", "banana", "cherry"}\nfor x in thisset:\n    print(x)',
    'set-check-in': 'thisset = {"apple", "banana", "cherry"}\nprint("banana" in thisset)',
    'set-check-not-in': 'thisset = {"apple", "banana", "cherry"}\nprint("banana" not in thisset)',
    'set-add': 'thisset = {"apple", "banana", "cherry"}\nthisset.add("orange")\nprint(thisset)',
    'set-update-set': 'thisset = {"apple", "banana", "cherry"}\ntropical = {"pineapple", "mango", "papaya"}\nthisset.update(tropical)\nprint(thisset)',
    'set-update-iterable': 'thisset = {"apple", "banana", "cherry"}\nmylist = ["kiwi", "orange"]\nthisset.update(mylist)\nprint(thisset)',
    'set-remove': 'thisset = {"apple", "banana", "cherry"}\nthisset.remove("banana")\nprint(thisset)',
    'set-discard': 'thisset = {"apple", "banana", "cherry"}\nthisset.discard("banana")\nprint(thisset)',
    'set-pop': 'thisset = {"apple", "banana", "cherry"}\nx = thisset.pop()\nprint(x)\nprint(thisset)',
    'set-clear': 'thisset = {"apple", "banana", "cherry"}\nthisset.clear()\nprint(thisset)',
    'set-delete': 'thisset = {"apple", "banana", "cherry"}\ndel thisset\n# print(thisset) # این باعث ایجاد خطا می‌شود زیرا مجموعه دیگر وجود ندارد.',
    'set-loop-items': 'thisset = {"apple", "banana", "cherry"}\nfor x in thisset:\n    print(x)',
    'set-union': 'set1 = {"a", "b", "c"}\nset2 = {1, 2, 3}\nset3 = set1.union(set2)\nprint(set3)',
    'set-union-operator': 'set1 = {"a", "b", "c"}\nset2 = {1, 2, 3}\nset3 = set1 | set2\nprint(set3)',
    'set-union-multiple': 'set1 = {"a", "b", "c"}\nset2 = {1, 2, 3}\nset3 = {"John", "Elena"}\nset4 = {"apple", "bananas", "cherry"}\nmyset = set1.union(set2, set3, set4)\nprint(myset)',
    'set-union-multiple-operator': 'set1 = {"a", "b", "c"}\nset2 = {1, 2, 3}\nset3 = {"John", "Elena"}\nset4 = {"apple", "bananas", "cherry"}\nmyset = set1 | set2 | set3 | set4\nprint(myset)',
    'set-union-tuple': 'x = {"a", "b", "c"}\ny = (1, 2, 3)\nz = x.union(y)\nprint(z)',
    'set-update': 'set1 = {"a", "b", "c"}\nset2 = {1, 2, 3}\nset1.update(set2)\nprint(set1)',
    'set-intersection': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1.intersection(set2)\nprint(set3)',
    'set-intersection-operator': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1 & set2\nprint(set3)',
    'set-intersection-update': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset1.intersection_update(set2)\nprint(set1)',
    'set-intersection-true-false': 'set1 = {"apple", 1, "banana", 0, "cherry"}\nset2 = {False, "google", 1, "apple", 2, True}\nset3 = set1.intersection(set2)\nprint(set3)',
    'set-difference': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1.difference(set2)\nprint(set3)',
    'set-difference-operator': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1 - set2\nprint(set3)',
    'set-difference-update': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset1.difference_update(set2)\nprint(set1)',
    'set-symmetric-difference': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1.symmetric_difference(set2)\nprint(set3)',
    'set-symmetric-difference-operator': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset3 = set1 ^ set2\nprint(set3)',
    'set-symmetric-difference-update': 'set1 = {"apple", "banana", "cherry"}\nset2 = {"google", "microsoft", "apple"}\nset1.symmetric_difference_update(set2)\nprint(set1)',
    'dict-create': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(thisdict)',
    'dict-access-brand': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(thisdict["brand"])',
    'dict-duplicates': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964,\n  "year": 2020\n}\nprint(thisdict)',
    'dict-length': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(len(thisdict))',
    'dict-data-types': 'thisdict = {\n  "brand": "Ford",\n  "electric": False,\n  "year": 1964,\n  "colors": ["red", "white", "blue"]\n}\nprint(thisdict)',
    'dict-type': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nprint(type(thisdict))',
    'dict-constructor': 'thisdict = dict(name="John", age=36, country="Norway")\nprint(thisdict)',
    'dict-access': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = thisdict["model"]\nprint(x)',
    'dict-get': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = thisdict.get("model")\nprint(x)',
    'dict-keys': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = thisdict.keys()\nprint(x)',
    'dict-keys-update': 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = car.keys()\nprint(x) # قبل از تغیر\ncar["color"] = "white"\nprint(x) # بعد از تغیر',
    'dict-values': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = thisdict.values()\nprint(x)',
    'dict-values-update': 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = car.values()\nprint(x) # قبل از تغیر\ncar["year"] = 2020\nprint(x) # بعد از تغیر',
    'dict-values-add': 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = car.values()\nprint(x) # قبل از تغیر\ncar["color"] = "red"\nprint(x) # بعد از تغیر',
    'dict-items': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = thisdict.items()\nprint(x)',
    'dict-items-update': 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = car.items()\nprint(x) # قبل از تغیر\ncar["year"] = 2020\nprint(x) # بعد از تغیر',
    'dict-items-add': 'car = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nx = car.items()\nprint(x) # قبل از تغیر\ncar["color"] = "red"\nprint(x) # بعد از تغیر',
    'dict-check-key': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nif "model" in thisdict:\n    print("بله، Model یکی از کلیدهای دیکشنری است.")',
    'dict-change': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict["year"] = 2018\nprint(thisdict)',
    'dict-update': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.update({"year": 2020})\nprint(thisdict)',
    'dict-add': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict["color"] = "red"\nprint(thisdict)',
    'dict-add-update': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.update({"color": "red"})\nprint(thisdict)',
    'dict-pop': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.pop("model")\nprint(thisdict)',
    'dict-popitem': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.popitem()\nprint(thisdict)',
    'dict-del-item': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\ndel thisdict["model"]\nprint(thisdict)',
    'dict-delete': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\ndel thisdict\n# print(thisdict) # این باعث خطا می‌شود زیرا "thisdict" دیگر وجود ندارد.',
    'dict-clear': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nthisdict.clear()\nprint(thisdict)',
    'dict-loop-keys': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nfor x in thisdict:\n    print(x)',
    'dict-loop-values': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nfor x in thisdict:\n    print(thisdict[x])',
    'dict-loop-values-method': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nfor x in thisdict.values():\n    print(x)',
    'dict-loop-keys-method': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nfor x in thisdict.keys():\n    print(x)',
    'dict-loop-items': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nfor x, y in thisdict.items():\n    print(x, y)',
    'dict-copy': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nmydict = thisdict.copy()\nprint(mydict)',
    'dict-copy-dict': 'thisdict = {\n  "brand": "Ford",\n  "model": "Mustang",\n  "year": 1964\n}\nmydict = dict(thisdict)\nprint(mydict)',
    'dict-nested': 'myfamily = {\n  "child1" : {\n    "name" : "Emil",\n    "year" : 2004\n  },\n  "child2" : {\n    "name" : "Tobias",\n    "year" : 2007\n  }\n}\nprint(myfamily)',
    'dict-nested-combine': 'child1 = {\n  "name" : "Emil",\n  "year" : 2004\n}\nchild2 = {\n  "name" : "Tobias",\n  "year" : 2007\n}\nchild3 = {\n  "name" : "Linus",\n  "year" : 2011\n}\nmyfamily = {\n  "child1" : child1,\n  "child2" : child2,\n  "child3" : child3\n}\nprint(myfamily)',
    'dict-nested-access': 'myfamily = {\n  "child1" : {\n    "name" : "Emil",\n    "year" : 2004\n  },\n  "child2" : {\n    "name" : "Tobias",\n    "year" : 2007\n  }\n}\nprint(myfamily["child2"]["name"])',
    'dict-nested-loop': 'myfamily = {\n  "child1" : {\n    "name" : "Emil",\n    "year" : 2004\n  },\n  "child2" : {\n    "name" : "Tobias",\n    "year" : 2007\n  }\n}\nfor x, obj in myfamily.items():\n    print(x)\n    for y in obj:\n        print(y + \':\', obj[y])',
    'if-statement': 'a = 33\nb = 200\nif b > a:\n print("b is greater than a")',
    'if-no-indentation': 'a = 33\nb = 200\nif b > a:\nprint("b is greater than a") # ایرور خواهد داد',
    'if-elif': 'a = 33\nb = 33\nif b > a:\n print("b is greater than a")\nelif a == b:\n print("a and b are equal")',
    'if-else': 'a = 200\nb = 33\nif b > a:\n print("b is greater than a")\nelif a == b:\n print("a and b are equal")\nelse:\n print("a is greater than b")',
    'if-else-no-elif': 'a = 200\nb = 33\nif b > a:\n print("b is greater than a")\nelse:\n print("b is not greater than a")',
    'if-short': 'a = 200\nb = 33\nif a > b: print("a is greater than b")',
    'if-else-short': 'a = 2\nb = 330\nprint("A") if a > b else print("B")',
    'if-else-short-multiple': 'a = 330\nb = 330\nprint("A") if a > b else print("=") if a == b else print("B")',
    'if-and': 'a = 200\nb = 33\nc = 500\nif a > b and c > a:\n print("Both conditions are True")',
    'if-or': 'a = 200\nb = 33\nc = 500\nif a > b or a > c:\n print("At least one of the conditions is True")',
    'if-not': 'a = 33\nb = 200\nif not a > b:\n print("a is NOT greater than b")',
    'if-nested': 'x = 41\nif x > 10:\n print("Above ten,")\n if x > 20:\n print("and also above 20!")\n else:\n print("but not above 20.")',
    'if-pass': 'a = 33\nb = 200\nif b > a:\n pass',
    'match-syntax': 'match expression:\n    case x:\n        # code block\n    case y:\n        # code block\n    case z:\n        # code block',
    'match-weekday': 'day = 2\nmatch day:\n    case 1:\n        print("شنبه")\n    case 2:\n        print("یکشنبه")\n    case 3:\n        print("دوشنبه")',
    'match-default': 'day = 3\nmatch day:\n    case 4:\n        print("سه شنبه")\n    case 5:\n        print("چهار شنبه")\n    case _:\n        print("آخر هفته")',
    'match-combine': 'day = 4\nmatch day:\n    case 1 | 2 | 3 | 4 | 5:\n        print("شنبه، یکشنبه، دوشنبه، سه شنبه، چهارشنبه")\n    case 6 | 7:\n        print("آخر هفته")',
    'match-guards': 'month = 5\nday = 4\nmatch day:\n    case 1 | 2 | 3 | 4 | 5 if month == 4:\n        print("A weekday in April")\n    case 1 | 2 | 3 | 4 | 5 if month == 5:\n        print("A weekday in May")\n    case _:\n        print("No match")',
    'while-loop': 'i = 1\nwhile i < 6:\n    print(i)\n    i += 1',
    'while-break': 'i = 1\nwhile i < 6:\n    print(i)\n    if i == 3:\n        break\n    i += 1',
    'while-continue': 'i = 0\nwhile i < 6:\n    i += 1\n    if i == 3:\n        continue\n    print(i)',
    'while-else': 'i = 1\nwhile i < 6:\n    print(i)\n    i += 1\nelse:\n    print("i is no longer less than 6")',
    'for-loop': 'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n    print(x)',
    'for-string': 'for x in "banana":\n    print(x)',
    'for-break': 'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n    print(x)\n    if x == "banana":\n        break',
    'for-break-before-print': 'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n    if x == "banana":\n        break\n    print(x)',
    'for-continue': 'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n    if x == "banana":\n        continue\n    print(x)',
    'for-range': 'for x in range(6):\n    print(x)',
    'for-range-start': 'for x in range(2, 6):\n    print(x)',
    'for-range-step': 'for x in range(2, 30, 3):\n    print(x)',
    'for-else': 'for x in range(6):\n    print(x)\nelse:\n    print("Finally finished!")',
    'for-else-break': 'for x in range(6):\n    if x == 3: break\n    print(x)\nelse:\n    print("Finally finished!")',
    'for-nested': 'adj = ["red", "big", "tasty"]\nfruits = ["apple", "banana", "cherry"]\nfor x in adj:\n    for y in fruits:\n        print(x, y)',
    'for-pass': 'for x in [0, 1, 2]:\n    pass',
    'function-create': 'def my_function():\n    print("Hello from a function")',
    'function-call': 'def my_function():\n    print("Hello from a function")\n\nmy_function()',
    'function-args': 'def my_function(fname):\n    print(fname + " Refsnes")\n\nmy_function("Emil")\nmy_function("Tobias")\nmy_function("Linus")',
    'function-num-args': 'def my_function(fname, lname):\n    print(fname + " " + lname)\n\nmy_function("Emil", "Refsnes")',
    'function-num-args-error': 'def my_function(fname, lname):\n    print(fname + " " + lname)\n\nmy_function("Emil")',
    'function-args-star': 'def my_function(*kids):\n    print("The youngest child is " + kids[2])\n\nmy_function("Emil", "Tobias", "Linus")',
    'function-kwargs': 'def my_function(child3, child2, child1):\n    print("The youngest child is " + child3)\n\nmy_function(child1="Emil", child2="Tobias", child3="Linus")',
    'function-kwargs-star': 'def my_function(**kid):\n    print("His last name is " + kid["lname"])\n\nmy_function(fname="Tobias", lname="Refsnes")',
    'function-default': 'def my_function(country="Norway"):\n    print("I am from " + country)\n\nmy_function("Sweden")\nmy_function("India")\nmy_function()\nmy_function("Brazil")',
    'function-list': 'def my_function(food):\n    for x in food:\n        print(x)\n\nfruits = ["apple", "banana", "cherry"]\n\nmy_function(fruits)',
    'function-return': 'def my_function(x):\n    return 5 * x\n\nprint(my_function(3))\nprint(my_function(5))\nprint(my_function(9))',
    'function-pass': 'def myfunction():\n    pass',
    'function-positional-only': 'def my_function(x, /):\n    print(x)\n\nmy_function(3)',
    'function-positional-keyword': 'def my_function(x):\n    print(x)\n\nmy_function(x=3)',
    'function-positional-only-error': 'def my_function(x, /):\n    print(x)\n\nmy_function(x=3)',
    'function-keyword-only': 'def my_function(*, x):\n    print(x)\n\nmy_function(x=3)',
    'function-keyword-positional': 'def my_function(x):\n    print(x)\n\nmy_function(3)',
    'function-keyword-only-error': 'def my_function(*, x):\n    print(x)\n\nmy_function(3)',
    'function-positional-keyword-combined': 'def my_function(a, b, /, *, c, d):\n    print(a + b + c + d)\n\nmy_function(5, 6, c=7, d=8)',
    'function-recursion': 'def tri_recursion(k):\n    if(k > 0):\n        result = k + tri_recursion(k - 1)\n        print(result)\n    else:\n        result = 0\n    return result\n\nprint("Recursion Example Results:")\ntri_recursion(6)',
    'lambda-basic': 'x = lambda a : a + 10\nprint(x(5))',
    'lambda-multiply': 'x = lambda a, b : a * b\nprint(x(5, 6))',
    'lambda-sum': 'x = lambda a, b, c : a + b + c\nprint(x(5, 6, 2))',
    'lambda-inside-function': 'def myfunc(n):\n    return lambda a : a * n',
    'lambda-doubler': 'def myfunc(n):\n    return lambda a : a * n\n\nmydoubler = myfunc(2)\n\nprint(mydoubler(11))',
    'lambda-tripler': 'def myfunc(n):\n    return lambda a : a * n\n\nmytripler = myfunc(3)\n\nprint(mytripler(11))',
    'lambda-doubler-tripler': 'def myfunc(n):\n    return lambda a : a * n\n\nmydoubler = myfunc(2)\nmytripler = myfunc(3)\n\nprint(mydoubler(11))\nprint(mytripler(11))',
    'array-create': 'cars = ["Ford", "Volvo", "BMW"]\nprint(cars)',
    'array-access': 'cars = ["Ford", "Volvo", "BMW"]\nx = cars[0]\nprint(x)',
    'array-modify': 'cars = ["Ford", "Volvo", "BMW"]\ncars[0] = "Toyota"\nprint(cars)',
    'array-length': 'cars = ["Ford", "Volvo", "BMW"]\nx = len(cars)\nprint(x)',
    'array-loop': 'cars = ["Ford", "Volvo", "BMW"]\nfor x in cars:\n    print(x)',
    'array-append': 'cars = ["Ford", "Volvo", "BMW"]\ncars.append("Honda")\nprint(cars)',
    'array-pop': 'cars = ["Ford", "Volvo", "BMW"]\ncars.pop(1)\nprint(cars)',
    'array-remove': 'cars = ["Ford", "Volvo", "BMW"]\ncars.remove("Volvo")\nprint(cars)',
    'class-create': 'class MyClass:\n    x = 5\nprint(MyClass.x)',
    'class-object': 'class MyClass:\n    x = 5\n\np1 = MyClass()\nprint(p1.x)',
    'class-init': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("John", 36)\n\nprint(p1.name)\nprint(p1.age)',
    'class-str-without': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("John", 36)\n\nprint(p1)',
    'class-str-with': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def __str__(self):\n        return f"{self.name}({self.age})"\n\np1 = Person("John", 36)\n\nprint(p1)',
    'class-method': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def myfunc(self):\n        print("Hello my name is " + self.name)\n\np1 = Person("John", 36)\np1.myfunc()',
    'class-self-alternative': 'class Person:\n    def __init__(mysillyobject, name, age):\n        mysillyobject.name = name\n        mysillyobject.age = age\n\n    def myfunc(abc):\n        print("Hello my name is " + abc.name)\n\np1 = Person("John", 36)\np1.myfunc()',
    'class-modify-property': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("John", 36)\np1.age = 40\nprint(p1.age)',
    'class-delete-property': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("John", 36)\ndel p1.age\n\nprint("Attribute age was deleted")',
    'class-delete-object': 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np1 = Person("John", 36)\ndel p1\n\nprint("Object p1 was deleted")',
    'class-pass': 'class Person:\n    pass',
    'inheritance-parent': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nx = Person("John", "Doe")\nx.printname()',
    'inheritance-child': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    pass\n\nx = Student("Mike", "Olsen")\nx.printname()',
    'inheritance-init': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname):\n        Person.__init__(self, fname, lname)\n\nx = Student("Mike", "Olsen")\nx.printname()',
    'inheritance-super': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname):\n        super().__init__(fname, lname)\n\nx = Student("Mike", "Olsen")\nx.printname()',
    'inheritance-property': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname):\n        super().__init__(fname, lname)\n        self.graduationyear = 2019\n\nx = Student("Mike", "Olsen")\nprint(x.graduationyear)',
    'inheritance-property-year': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname, year):\n        super().__init__(fname, lname)\n        self.graduationyear = year\n\nx = Student("Mike", "Olsen", 2019)\nprint(x.graduationyear)',
    'inheritance-method': 'class Person:\n    def __init__(self, fname, lname):\n        self.firstname = fname\n        self.lastname = lname\n\n    def printname(self):\n        print(self.firstname, self.lastname)\n\nclass Student(Person):\n    def __init__(self, fname, lname, year):\n        super().__init__(fname, lname)\n        self.graduationyear = year\n\n    def welcome(self):\n        print("Welcome", self.firstname, self.lastname, "to the class of", self.graduationyear)\n\nx = Student("Mike", "Olsen", 2019)\nx.welcome()',
    'iterator-tuple': 'mytuple = ("apple", "banana", "cherry")\nmyit = iter(mytuple)\n\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))',
    'iterator-string': 'mystr = "banana"\nmyit = iter(mystr)\n\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))\nprint(next(myit))',
    'iterator-loop-tuple': 'mytuple = ("apple", "banana", "cherry")\n\nfor x in mytuple:\n    print(x)',
    'iterator-loop-string': 'mystr = "banana"\n\nfor x in mystr:\n    print(x)',
    'iterator-create': 'class MyNumbers:\n    def __iter__(self):\n        self.a = 1\n        return self\n\n    def __next__(self):\n        x = self.a\n        self.a += 1\n        return x\n\nmyclass = MyNumbers()\nmyiter = iter(myclass)\n\nprint(next(myiter))\nprint(next(myiter))\nprint(next(myiter))\nprint(next(myiter))\nprint(next(myiter))',
    'iterator-stop': 'class MyNumbers:\n    def __iter__(self):\n        self.a = 1\n        return self\n\n    def __next__(self):\n        if self.a <= 20:\n            x = self.a\n            self.a += 1\n            return x\n        else:\n            raise StopIteration\n\nmyclass = MyNumbers()\nmyiter = iter(myclass)\n\nfor x in myiter:\n    print(x)',
    'poly-len-string': 'x = "Hello World!"\nprint(len(x))',
    'poly-len-tuple': 'mytuple = ("apple", "banana", "cherry")\nprint(len(mytuple))',
    'poly-len-dict': 'thisdict = {\n    "brand": "Ford",\n    "model": "Mustang",\n    "year": 1964\n}\nprint(len(thisdict))',
    'poly-class': 'class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\n    def move(self):\n        print("Drive!")\n\nclass Boat:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\n    def move(self):\n        print("Sail!")\n\nclass Plane:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\n    def move(self):\n        print("Fly!")\n\ncar1 = Car("Ford", "Mustang")\nboat1 = Boat("Ibiza", "Touring 20")\nplane1 = Plane("Boeing", "747")\n\nfor x in (car1, boat1, plane1):\n    x.move()',
    'poly-inheritance': 'class Vehicle:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\n    def move(self):\n        print("Move!")\n\nclass Car(Vehicle):\n    pass\n\nclass Boat(Vehicle):\n    def move(self):\n        print("Sail!")\n\nclass Plane(Vehicle):\n    def move(self):\n        print("Fly!")\n\ncar1 = Car("Ford", "Mustang")\nboat1 = Boat("Ibiza", "Touring 20")\nplane1 = Plane("Boeing", "747")\n\nfor x in (car1, boat1, plane1):\n    print(x.brand)\n    print(x.model)\n    x.move()',
    'scope-local': 'def myfunc():\n    x = 300\n    print(x)\n\nmyfunc()',
    'scope-inner-function': 'def myfunc():\n    x = 300\n    def myinnerfunc():\n        print(x)\n    myinnerfunc()\n\nmyfunc()',
    'scope-global': 'x = 300\n\ndef myfunc():\n    print(x)\n\nmyfunc()\nprint(x)',
    'scope-naming': 'x = 300\n\ndef myfunc():\n    x = 200\n    print(x)\n\nmyfunc()\nprint(x)',
    'scope-global-keyword': 'def myfunc():\n    global x\n    x = 300\n\nmyfunc()\nprint(x)',
    'scope-global-modify': 'x = 300\n\ndef myfunc():\n    global x\n    x = 200\n\nmyfunc()\nprint(x)',
    'scope-nonlocal': 'def myfunc1():\n    x = "Jane"\n    def myfunc2():\n        nonlocal x\n        x = "hello"\n    myfunc2()\n    return x\n\nprint(myfunc1())',
    'user-input-simple': 'print("Enter your name:")\nname = input()\nprint(f"Hello {name}")',
    'user-input-prompt': 'name = input("Enter your name: ")\nprint(f"Hello {name}")',
    'user-input-multiple': 'name = input("Enter your name: ")\nprint(f"Hello {name}")\nfav1 = input("What is your favorite animal: ")\nfav2 = input("What is your favorite color: ")\nfav3 = input("What is your favorite number: ")\nprint(f"Do you want a {fav2} {fav1} with {fav3} legs?")',
    'user-input-number': 'import math\nx = input("Enter a number: ")\ny = math.sqrt(float(x))\nprint(f"The square root of {x} is {y}")',
    'user-input-validate': 'y = True\nwhile y == True:\n    x = input("Enter a number: ")\n    try:\n        x = float(x)\n        y = False\n    except:\n        print("Wrong input, please try again.")\nprint("Thank you!")',
    'try-except-basic': 'try:\n  print(x)\nexcept:\n  print("یک استثنا رخ داد")',
    'try-except-error': 'print(x)',
    'try-except-multiple': 'try:\n  print(x)\nexcept NameError:\n  print("متغیر x تعریف نشده است")\nexcept:\n  print("اشتباهی رخ داد!")',
    'try-except-else': 'try:\n  print("Hello")\nexcept:\n  print("اشتباهی رخ داد!")\nelse:\n  print("اشتباهی رخ نداد!")',
    'try-except-finally': 'try:\n  print(x)\nexcept:\n  print("اشتباهی رخ داد!")\nfinally:\n  print("پایان...")',
    'try-except-file': 'try:\n  f = open("demofile.txt")\n  try:\n    f.write("Lorum Ipsum")\n  except:\n    print("هنگام نوشتن در فایل، مشکلی پیش آمد")\n  finally:\n    f.close()\nexcept:\n  print("هنگام باز کردن فایل مشکلی پیش آمد")',
    'raise-exception': 'x = -1\nif x < 0:\n  raise Exception("هیچ عددی زیر صفر نیست")',
    'raise-type-error': 'x = "hello"\nif not type(x) is int:\n  raise TypeError("فقط اعداد صحیح مجاز هستند")',
    'file-open-basic': 'f = open("demofile.txt")\nprint(f.read())',
    'file-open-rt': 'f = open("demofile.txt", "rt")\nprint(f.read())',
    'file-read': 'f = open("demofile.txt")\nprint(f.read())',
    'file-read-path': 'f = open("D:\\\\myfiles\\welcome.txt")\nprint(f.read())',
    'file-with': 'with open("demofile.txt") as f:\n  print(f.read())',
    'file-close': 'f = open("demofile.txt")\nprint(f.readline())\nf.close()',
    'file-read-partial': 'with open("demofile.txt") as f:\n  print(f.read(5))',
    'file-read-line': 'with open("demofile.txt") as f:\n  print(f.readline())',
    'file-read-two-lines': 'with open("demofile.txt") as f:\n  print(f.readline())\n  print(f.readline())',
    'file-read-lines-loop': 'with open("demofile.txt") as f:\n  for x in f:\n    print(x)',
    'file-append': 'with open("demofile.txt", "a") as f:\n  f.write("Now the file has more content!")\nwith open("demofile.txt") as f:\n  print(f.read())',
    'file-overwrite': 'with open("demofile.txt", "w") as f:\n  f.write("Woops! I have deleted the content!")\nwith open("demofile.txt") as f:\n  print(f.read())',
    'file-create': 'f = open("myfile.txt", "x")',
    'file-delete': 'import os\nos.remove("demofile.txt")',
    'file-check-delete': 'import os\nif os.path.exists("demofile.txt"):\n  os.remove("demofile.txt")\nelse:\n  print("The file does not exist")',
    'file-delete-folder': 'import os\nos.rmdir("myfolder")',
    'builtin-abs': 'x = -10\nprint(abs(x))',
    'builtin-len': 'my_list = [1, 2, 3, 4, 5]\nmy_string = "Hello"\nprint(len(my_list))\nprint(len(my_string))',
    'builtin-map': 'def square(num):\n    return num * num\nnumbers = [1, 2, 3, 4]\nresult = list(map(square, numbers))\nprint(result)',
    'builtin-sorted': 'numbers = [5, 2, 8, 1, 9]\nprint(sorted(numbers))',
    'keywords-if-else': 'x = 10\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is 5 or less")',
    'keywords-for': 'for i in range(5):\n    print(i)',
    'keywords-try-except': 'try:\n    print(undefined_variable)\nexcept:\n    print("اشتباهی رخ داد!")',
    'keywords-def-return': 'def add(a, b):\n    return a + b\nresult = add(3, 4)\nprint(result)',
    'exceptions-name-error': 'print(undefined_variable)',
    'exceptions-zero-division': 'x = 10 / 0',
    'exceptions-type-error': 'x = "hello" + 5',
    'exceptions-key-error': 'my_dict = {"name": "Ali"}\nprint(my_dict["age"])',
    'glossary-indentation': 'if True:\n    print("This is indented correctly")\nelse:\n    print("This will not run")',
    'glossary-list': 'my_list = ["apple", "banana", "cherry"]\nmy_list.append("orange")\nprint(my_list)',
    'glossary-dictionary': 'my_dict = {"name": "Ali", "age": 30}\nmy_dict["city"] = "Tehran"\nprint(my_dict)',
    'glossary-lambda': 'square = lambda x: x * x\nprint(square(5))',
    'pip-camelcase': 'import package:\n# یا \nfrom package import ...'
};
function initEditors() {
    require(['vs/editor/editor.main'], function() {
        document.querySelectorAll('.monaco-editor-container').forEach(container => {
            const editorId = container.id.replace('editor-', '');
            const language = editorId.includes('cmd') || editorId.includes('terminal') || editorId.includes('repl') ? 'plaintext' : 'python';
            
            editors[editorId] = monaco.editor.create(container, {
                value: defaultCode[editorId] || '',
                language: language,
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: language === 'python' ? 'on' : 'off',
                roundedSelection: true,
                scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden',
                    handleMouseWheel: false
                },
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0
            });
        });
    });
}
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
const fabButton = document.getElementById('fabButton');
const fabMenu = document.getElementById('fabMenu');

fabButton.addEventListener('click', (e) => {
    e.stopPropagation();
    fabMenu.classList.toggle('active');
});
document.addEventListener('click', () => {
    fabMenu.classList.remove('active');
});
document.querySelectorAll('.fab-menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
        fabMenu.classList.remove('active');
    });
});
function showSection(sectionId) {
    document.querySelectorAll('.tutorial-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    document.querySelectorAll('.tutorial-sidebar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo(0, 0);
}

const initialSectionId = window.location.hash.substring(1) || 'home';
showSection(initialSectionId);

document.querySelectorAll('.tutorial-sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
        
        if (history.pushState) {
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const editorContainer = this.closest('.code-editor').querySelector('.monaco-editor-container');
        const editorId = editorContainer.id.replace('editor-', '');
        const codeContent = editors[editorId].getValue();
        
        navigator.clipboard.writeText(codeContent).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> کپی شد!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
});
document.querySelectorAll('.editor-btn.run').forEach((btn) => {
    btn.addEventListener('click', async function() {
        const codeEditor = this.closest('.code-editor');
        const outputElement = codeEditor.querySelector('.code-output');
        const editorContainer = codeEditor.querySelector('.monaco-editor-container');
        const editorId = editorContainer.id.replace('editor-', '');
        const codeContent = editors[editorId].getValue();
        outputElement.textContent = "در حال اجرا...";
        outputElement.classList.add('active');
        if (!pyodideReady) {
            outputElement.textContent = "لطفاً صبر کنید تا Pyodide بارگذاری شود...";
            await loadPyodideAndRun();
            if (!pyodideReady) {
                outputElement.textContent = "خطا در بارگذاری Pyodide. صفحه را رفرش کنید.";
                return;
            }
        }
        try {
            let output = '';
            pyodide.globals.set("print", (text) => {
                output += text + '\n';
            });
            await pyodide.runPythonAsync(codeContent);
            outputElement.textContent = output || "کد اجرا شد (بدون خروجی)";
        } catch (e) {
            outputElement.textContent = `خطا: ${e.message}`;
        }
    });
});
document.addEventListener('DOMContentLoaded', initEditors);
