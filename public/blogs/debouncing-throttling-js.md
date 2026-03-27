# The Subtle Art of Debouncing in JavaScript

In the world of frontend development, application performance isn't solely defined by the initial page loading speed—it is equally, if not more, about interaction speed and responsiveness. When a user interacts with a web page by typing, scrolling, or resizing the window, the browser fires corresponding events.

If we attach expensive functions (like updating the DOM or making API calls) directly to these frequent events, the function can fire hundreds of times per second. This phenomenon, known as Event Overload, quickly floods the JavaScript Call Stack, causing the UI to freeze, leading to "jank," and severely degrading the user experience.

To combat this inefficiency and maintain smooth responsiveness, developers use rate-limiting techniques. This article introduces two essential patterns for controlling function execution frequency: Debouncing and Throttling. These techniques allow us to manage resource consumption effectively by ensuring functions run only when necessary, rather than aggressively on every single event trigger.
In modern frontend development, many user interactions trigger events (like typing, scrolling, or resizing) far more frequently than necessary. This leads to **Event Overload**, causing the browser's main thread to become clogged, resulting in UI lag, or "jank."



---
## 🛡️ Debouncing in Detail: Optimizing Event Handlers
**Debouncing** is a core performance optimization technique in JavaScript used to control how often a function is executed, particularly when that function is attached to a rapidly firing event.

**Debouncing** is a technique to limit how often a function is executed, especially when it’s triggered very frequently (like while typing, scrolling, resizing, etc.).
👉 It waits for a pause in events before running the function.

### ✅ Simple Explanation:

Imagine you are typing in a search box.

- Each keystroke fires an event (very fast).
- You don’t want to hit the API on every keypress.
- You wait until the **user stops typing** for `500ms` before firing the request.

That delay logic is **debouncing**.

````javascript
"use client";

import { useEffect, useState } from "react";

function DebouncingAndThrottlingPage() {
  const [defaultText, setDefaultText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [debounceProducts, setDebounceProducts] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(defaultText);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [defaultText]);

  // Fetch products when debouncedText changes
  useEffect(() => {
    if (!debouncedText.trim()) {
      setDebounceProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedText}`
        );
        const data = await res.json();
        setDebounceProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [debouncedText]);

  return (
    <main>
      {/* DEBOUNCING SECTION */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:max-h-[80vh]">
        <section className="md:min-h-[60vh] md:max-h-[80vh] col-span-2 lg:col-span-1 text-center rounded-2xl border-gray-700 border-t-2 shadow-gray-700 shadow-sm p-2 ">
          <h1 className="text-2xl lg:text-3xl font-bold py-1  text-blue-500">
            Debouncing
          </h1>
          <div className="flex flex-col w-full mt-4 gap-y-4">
            <p>Search Product to See Debouncing</p>
            <input
              type="text"
              onChange={(e: any) => setDefaultText(e.target.value)}
              className="self-center bg-neutral-400 font-semibold rounded-lg h-8 min-w-[85vw] md:min-w-[25vw] text-black px-3"
            />
            <p className="self-start font-bold text-xl">
              Default Text: {defaultText}
            </p>
            <p className="self-start font-bold text-xl">
              Debounced Text: {debouncedText}
            </p>
          </div>
        </section>

        <section className="md:min-h-[60vh] col-span-2 lg:col-span-1 text-center rounded-2xl border-gray-700 border-t-2 shadow-gray-700 shadow-sm p-2 flex flex-col">
          <h2 className="font-bold text-2xl">Products</h2>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:min-h-[59vh] md:max-h-[70vh] mt-2 overflow-y-scroll custom-scrollbar">
            {debounceProducts.length > 0 ? (
              debounceProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="border p-2 rounded-md shadow-md w-64 md:h-28  text-left bg-white text-black flex items-start md:flex-col md:justify-center justify-between gap-x-3"
                >
                  <p className="font-semibold">{product.title}</p>
                  {/* <p className="text-sm">{product.description}</p> */}
                  <p className="text-green-600 font-bold mt-1">
                    ₹ {product.price}
                  </p>
                </div>
              ))
            ) : (
              <p className="italic text-gray-500">No products found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DebouncingAndThrottlingPage;

### 🧠 Samajhne ke liye Real Example:

Tum input box me type karte ho: **"laptop"**

Step-by-step typing:

1. 🟡 You type: `"l"`

- `defaultText = "l"` hota hai
- `useEffect` chalega kyunki `defaultText` change hua
- Ek `setTimeout` set hota hai: `setDebouncedText("l")` after 1 sec
- But... tumne 1 sec wait **nahi** kiya, turant next letter likh diya

2. 🔴 You type: `"a"`

- `defaultText = "la"`
- `useEffect` firse chalega
- Purana timeout (jo `"l"` ke liye laga tha) **cancel** ho jata hai `clearTimeout`
- Naya timeout set hota hai for `"la"`

3. 🔴 You type: `"p"`

- `defaultText = "lap"`
- Purana timeout (`"la"` ka) **cancel**
- Naya timeout for `"lap"`

4. 🟢 You stop typing after `"laptop"` (1 sec rukte ho)

- `defaultText = "laptop"`
- Timeout set hota hai: `setDebouncedText("laptop")` after 1 sec
- Tum typing **band** kar chuke ho, to 1 sec ke baad `setDebouncedText` run ho jata hai

### 🧪 Result:

- `debouncedText = "laptop"` set hota hai
- `debouncedText` change hone par dusra `useEffect` chalta hai jo API call karta hai:
````

---

## Throttling
**Throttling** is a technique used to **limit the number of times a function can be executed** over time. 

It ensures that a function is called **at most once** in a specified time interval, no matter how many times the triggering event occurs.

"With throttling, we control how frequently a function runs even if it is being triggered continuously.”

**Throttle** ka matlab hai:

> "Chahe user jitni bhi baar action kare (jaise typing ya scrolling), hum us action ko ek fixed interval (e.g., 1 sec) me sirf ek baar allow karenge."
>


> Real-life Analogy:
> 
> - **Debounce**: Tum kisi se baat karte ho, aur vo tumhare bolne ke **rukne ke baad** hi response deta hai.
> - **Throttle**: Vo har 1 sec baad tumhari baat ka response deta hai, chahe tum kuch bhi bol rahe ho.


### Simple Explanation:

- Suppose a user scrolls 100 times in a second.
- With **throttling**, we **restrict** the execution of the scroll handler to **once every 1000ms** (or any fixed time).

🛠️ Use-cases:

- Scroll events
- Window resize
- Mouse movement
- Network-intensive tasks


````javascript
"use client";

import { useEffect, useRef, useState } from "react";

function DebouncingAndThrottlingPage() {

  //throttle states
  const [clickCounter, setClickCounter] = useState<number>(0);
  const [throttleCounter, setThrottleCounter] = useState(0);
  const lastExecutedRef = useRef<number>(0);
  const [cooldown, setCooldown] = useState<number | null>(null);


  // throttle logic
  const updateCounter = () => {
    setClickCounter((prev) => prev + 1);
    setCooldown(5); // start timer at 5 seconds

    const now = Date.now();
    if (now - lastExecutedRef.current > 5000) {
      setThrottleCounter((prev) => prev + 1);
      lastExecutedRef.current = now;
    }
  };

  useEffect(() => {
    if (cooldown === null) return;
    const intervalId = setInterval(() => {
      setCooldown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalId);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldown]);

  return (
    <main className="space-y-4">
      
      {/* THROTTLING SECTION */}
      <div className="md:min-h-[60vh] rounded-2xl border-gray-700 border-t-2 shadow-gray-700 shadow-sm p-2 space-y-4">
        <h1 className="text-center text-3xl lg:text-3xl font-bold py-1 text-blue-500">
          Throttling
        </h1>
        {/* example 1 */}

        <section className="bg-gray-950 py-8 rounded-2xl px-2 md:px-4 ">
          <p className="flex gap-x-2">
            <span className="text-xl font-extrabold">#1</span>
            <span className="text-lg text-gray-300 italic mb-4">
              Clicking the button increases the{" "}
              <span className="font-semibold text-blue-400">Click Counter</span>{" "}
              immediately, but the{" "}
              <span className="font-semibold text-green-400">
                Throttle Counter
              </span>{" "}
              updates at most
              <span className="underline"> once every 5 seconds</span>, even if
              you click many times.
            </span>
          </p>
          <article className="md:px-6 font-sans flex flex-col gap-y-2">
            <span className="bg-gray-900 text-gray-300 font-medium max-w-max px-2 rounded-lg">
              <b className="">Leading Edge Throttling: </b>First call turant ho
              jati hai, fir n seconds tak koi aur call nahi.
            </span>
            <span className="bg-gray-900 text-gray-300 font-medium max-w-max px-2 rounded-lg">
              It is like tumnne maanga, tumhe mil gya, ab dobara mangoge to nhi
              milega ab tumhe 5 seconds baad milega{" "}
            </span>
          </article>
          <div className="bg-gray-900 my-12 pl-5 grid md:grid-cols-5 md:items-center justify-center gap-x-8 py-3 rounded-2xl">
            <div className="col-span-1  flex items-center justify-center">
              <button
                className="bg-blue-500 text-white text-sm md:text-[15px] font-semibold px-4 py-1 rounded-xl cursor-pointer"
                onClick={updateCounter}
              >
                Click to See Throttling
              </button>
            </div>
            <div className="col-span-1  flex items-center justify-center">
              <h1 className="font-bold text-lg">Counter : {clickCounter}</h1>
            </div>
            <div className="col-span-1  flex items-center justify-center">
              {cooldown !== null && (
                <p className="text-yellow-400 text-lg text-center animate-pulse">
                  Throttle updates in: {cooldown}s
                </p>
              )}
            </div>
            <div className="col-span-1  flex items-center justify-center">
              <h1 className="font-bold text-lg ">
                Throttle Counter : {throttleCounter}
              </h1>
            </div>
            <div className="col-span-1  flex items-center justify-center">
              <button
                className="bg-orange-500 text-white text-sm md:text-[15px] font-semibold px-4 py-1 rounded-xl cursor-pointer"
                onClick={() => {
                  setClickCounter(0);
                  setThrottleCounter(0);
                  lastExecutedRef.current = 0;
                }}
              >
                Reset Counter
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DebouncingAndThrottlingPage;

````