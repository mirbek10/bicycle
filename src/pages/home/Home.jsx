import React from 'react'
import Banner from '../../Components/banner/Banner'
import EuroBrand from '../../Components/euro-brand/EuroBrand'
import Mountain from '../../Components/mountain/Mountain'
import Advantages from '../../Components/advantages/Advantages'
import Block3 from '../../Components/Block-3/Block3'
import Menu from '../../Components/menu/Menu'

function Home() {
    return (
        <div>
            <Banner/>
            <Block3/>
            <Menu/>
            <EuroBrand/>
            <Mountain/>
            <Advantages/>
        </div>
    )
}

export default Home
