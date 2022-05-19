import { useState } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = (value: number) => setCount((count) => count + value);

    const handleClick = () => {
        increment(1);
        setTimeout(() => increment(3), 3000);
    }

    return <div>
        <div>{count}</div>
        <button onClick={handleClick}>increment</button>
    </div>
}

export default Counter;