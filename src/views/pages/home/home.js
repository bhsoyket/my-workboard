import React from 'react'
import Content from "../../components/content";

function Home({employees}) {
    return (
        <div>
            <Content employees={employees} />
        </div>
    )
}

export default Home
