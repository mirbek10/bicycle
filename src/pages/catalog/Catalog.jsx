import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Catalog.scss'
import { fetchBicycles } from '../../store/bikeSlice'
import { fetchParts } from '../../store/partsSlice'
import { fetchAccessories } from '../../store/accessoriesSlice'
import { getEquipment } from '../../store/Equipmentslice/EquipmentSLice'
import { getbikeStation } from '../../store/BikeStation/bikeStation'
import ProductList from '../../Components/ProducList/ProductList'
import Banner from '../../Components/banner/Banner'
import { CiFilter } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import NotFoundMessage from './notFound/NoteFound'

const Catalog = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const { bicycles } = useSelector((state) => state.bike)
  const { parts } = useSelector((state) => state.parts)
  const { accessories } = useSelector((state) => state.accessories)
  const { data: equipment } = useSelector((state) => state.equipment)
  const { list } = useSelector((state) => state.bikeStation)

  const [priceRange, setPriceRange] = useState([0, 1600])
  const [categories, setCategories] = useState({
    'bicycles': true,
    'parts': true,
    'accessories': true,
    'equipment': true,
    'bikeStation': true
  })

  const [colors, setColors] = useState([
    { name: 'Red', value: '#FF0000', selected: false },
    { name: 'Blue', value: '#0000FF', selected: false },
    { name: 'Green', value: '#008000', selected: false },
    { name: 'silver', value: '#C0C0C0', selected: false },
    { name: 'Black', value: '#000000', selected: false },
    { name: 'White', value: '#FFFFFF', selected: false },
    { name: 'Yellow', value: '#FFFF00', selected: false },
    { name: 'Pink', value: '#FFC0CB', selected: false },
    { name: 'Purple', value: '#800080', selected: false },
    { name: 'Orange', value: '#FFA500', selected: false },
    { name: 'Brown', value: '#A52A2A', selected: false }
  ])

  const [materials, setMaterials] = useState({
    'Aluminum': false,
    'Steel': false,
    'Carbon': false
  })

  const [inStockOnly, setInStockOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)

  useEffect(() => {
    dispatch(fetchBicycles())
    dispatch(fetchParts())
    dispatch(fetchAccessories())
    dispatch(getEquipment())
    dispatch(getbikeStation())
  }, [dispatch])

  const allProducts = useMemo(() => {
    const result = []

    if (categories.bicycles && bicycles) {
      result.push(...bicycles.map(item => ({ ...item, productType: 'bicycle' })))
    }

    if (categories.parts && parts) {
      result.push(...parts.map(item => ({ ...item, productType: 'part' })))
    }

    if (categories.accessories && accessories) {
      result.push(...accessories.map(item => ({ ...item, productType: 'accessory' })))
    }

    if (categories.equipment && equipment) {
      result.push(...equipment.map(item => ({ ...item, productType: 'equipment' })))
    }

    if (categories.bikeStation && list) {
      result.push(...list.map(item => ({ ...item, productType: 'bikeStation' })))
    }

    return result
  }, [bicycles, parts, accessories, equipment, list, categories])

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false

      if (inStockOnly && (!product.buying || product.buying <= 0)) return false

      const selectedMaterials = Object.entries(materials)
        .filter(([_, selected]) => selected)
        .map(([material]) => material)

      if (selectedMaterials.length > 0 && product.frameMaterial && !selectedMaterials.includes(product.frameMaterial)) {
        return false
      }

      const selectedColors = colors.filter(color => color.selected).map(color => color.name)
      if (selectedColors.length > 0 && product.color && !selectedColors.includes(product.color)) {
        return false
      }

      return true
    })
  }, [allProducts, priceRange, inStockOnly, materials, colors])

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  const handleCategoryChange = (category) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleMaterialChange = (material) => {
    setMaterials(prev => ({
      ...prev,
      [material]: !prev[material]
    }))
  }

  const handlePriceChange = (e, index) => {
    const newValue = parseFloat(e.target.value)
    const newRange = [...priceRange]
    newRange[index] = newValue
    setPriceRange([...newRange.sort((a, b) => a - b)])
  }

  const handleColorChange = (colorName) => {
    setColors(colors.map(color =>
      color.name === colorName ? { ...color, selected: !color.selected } : color
    ))
  }

  const toggleInStock = () => {
    setInStockOnly(!inStockOnly)
  }

  const resetFilters = () => {
    setCategories({
      'bicycles': true,
      'parts': true,
      'accessories': true,
      'equipment': true,
      'bikeStation': true
    })
    setMaterials({
      'Aluminum': false,
      'Steel': false,
      'Carbon': false
    })
    setColors(colors.map(color => ({ ...color, selected: false })))
    setPriceRange([0, 1600])
    setInStockOnly(false)
    setVisibleCount(12)
  }

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 12)
  }

  return (
    <>
      <Banner />
      <div className='all-catalog'>
        <div
          className={`filter-overlay ${open ? 'active' : ''}`}
          onClick={() => setOpen(false)}
        />

        <div className={`catalog-filter ${open ? 'active' : ''}`}>
          <div className="filter-panel">
            <div className="filter-panel__header">
              <h3>Фильтры</h3>
              <IoClose className="close-filter" onClick={() => setOpen(false)} />
            </div>

            <div className="filter-section">
              <h4 className="filter-section__title">Категории</h4>
              {Object.entries(categories).map(([category, checked]) => (
                <label className="filter-option" key={category}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="checkmark"></span>
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4 className="filter-section__title">Цена (до 1600)</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="1600"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
                <input
                  type="range"
                  min="0"
                  max="1600"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
                <div className="price-values">
                  ${priceRange[0]} - ${priceRange[1]}
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-section__title">Материал</h4>
              {Object.entries(materials).map(([material, checked]) => (
                <label className="filter-option" key={material}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleMaterialChange(material)}
                  />
                  <span className="checkmark"></span>
                  {material}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4 className="filter-section__title">Цвет</h4>
              <div className="color-options">
                {colors.map(color => (
                  <div
                    key={color.name}
                    className={`color-option ${color.selected ? 'selected' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-section__title">Наличие</h4>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={toggleInStock}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">
                  {inStockOnly ? 'Только в наличии' : 'Все товары'}
                </span>
              </label>
            </div>

            <button onClick={resetFilters} className="reset-filters">
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className='products-section'>
          <div className='info-title'>
            <h2>Товары ({filteredProducts.length})</h2>
            <button className='fillter-button' onClick={() => setOpen(!open)}>
              <CiFilter /> Фильтры
            </button>
          </div>
          {visibleProducts.length > 0 ? (
            <>
              <ProductList data={visibleProducts} />
              {visibleCount < filteredProducts.length && (
                <div className="show-more-wrapper">
                  <button className="show-more-button" onClick={handleShowMore}>
                    Показать ещё
                  </button>
                </div>
              )}
            </>
          ) : (
            <NotFoundMessage />
          )}
        </div>
      </div>
    </>
  )
}

export default Catalog
