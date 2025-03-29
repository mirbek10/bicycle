import React from 'react'
import Banner from '../../Components/banner/Banner'
import EuroBrand from '../../Components/euro-brand/EuroBrand'
import Mountain from '../../Components/mountain/Mountain'
import Advantages from '../../Components/advantages/Advantages'

function Home() {
    return (
        <div>
            <Banner/>
            <EuroBrand/>
            <Mountain/>
            <Advantages/>
        </div>
    )
}

export default Home
