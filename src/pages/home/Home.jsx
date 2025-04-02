import React from 'react'
import Banner from '../../Components/banner/Banner'
import EuroBrand from '../../Components/euro-brand/EuroBrand'
import Mountain from '../../Components/mountain/Mountain'
import Advantages from '../../Components/advantages/Advantages'
import Block3 from '../../Components/Block-3/Block3'
import Menu from '../../Components/menu/Menu'
import Contacts from '../../Components/contacts/Contacts'
import Block8 from '../../Components/Block-8/Block8'
import BikeBrands from '../../Components/BikeBrand/Bikebrands'

function Home() {
    return (
        <div>
            <Banner/>
            <BikeBrands/>
            <Block3/>
            <Menu/>
            <EuroBrand/>
            <Mountain/>
            <Advantages/>
            <Block8/>
            <Contacts/>
        </div>
    )
}

export default Home
