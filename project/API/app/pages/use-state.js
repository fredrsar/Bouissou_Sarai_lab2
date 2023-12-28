import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

function Pages({ title, component }) {
    const [count, setCount] = useState(0);

 useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
               -- Click me --
            </button>
        </div>
    );
}

export default function HomePage() {
    return (
        <Layout>
            <Pages title="Contact Us !" component="------------------" />
        </Layout>
    );
}
