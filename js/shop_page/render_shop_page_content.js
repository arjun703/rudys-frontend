function renderShopPageContent(
    dataState, 
    isChangeOrClearBlock, 
    handleChangeInDropdown, 
    handleGoClick, 
    handleClearSelection, 
    handleChangeVehicleClick
){

    const navigateToChildrenListCategory = (nav)=>{

    }


    const generateHref = (c) => {
        if(parseInt(c.parent_id) === 0 ){
            return `#nav_${c.url}`
        }else{
            return `/collections/${c.url}`
        }
    }

    const categoryCard = (c) => {
        return`
            <div class="shop-page-category-card-wrapper parent-category-wrapper cm_vehicle-categories__topline-wrapper">
                <a 
                    href="${generateHref(c)}" 
                    class="cm_vehicle-categories__topline-link" 
                    title="${c.name}"
                >
                    <img 
                        alt="Seat Upholstery and Trim Accessories" 
                        class="cm_vehicle-categories__topline-image cm_vehicle-categories_category-image" 
                        src="${c.image}"
                    />
                    <div class="cm_vehicle-categories__topline-title">
                        ${c.name}
                    </div>
                </a>
            </div>
        `
    }

    document.querySelector(customYmm['shopPageWrapper']).innerHTML = `
        <div class="page-width">
            ${  !isChangeOrClearBlock ?
                `
                    <div class = "ymm-form-shop-page ymm-form-search-page">
                        <div class = "shop-page-ymm-form-container search-page-ymm-form-container">
                            ${
                                !isChangeOrClearBlock && `
                                    <div class = "shop-page-shop-your-vehicle">
                                        <h3>Select Your Vehicle</h3>
                                    </div>
                                ` || ''
                            }
                            
                            <div class="ymm-form-container">
                                <div class="ymm-form-select-items">
                                    <div class="year ymm-form-select">
                                        <select 
                                            data-type="year"
                                            class="ymm-select-shop-page select-year ymm-select ${ (dataState.years.length > 0 && customYmm.shop_page.selections.make == false )? 'ymm-select-selected' :''}"
                                        >
                                            <option>Year</option>
                                            ${
                                                dataState.years.map(({key, label}) => {
                                                    return`
                                                        <option 
                                                            value="${key}"
                                                            ${parseInt(customYmm.shop_page.selections.year) === parseInt(key) ? 'selected': ''}
                                                        >
                                                                ${label}
                                                        </option>
                                                    `
                                                }).join('')
                                            }
                                        </select>
                                    </div>
                    
                                    <div class="make ymm-form-select">
                                        <select 
                                            data-type="make"
                                            class="ymm-select-shop-page select-make ymm-select ${ (dataState.makes.length > 0 && customYmm.shop_page.selections.make == false )? 'ymm-select-selected' :''}"
                                        >
                                            <option>Make</option>
                                            ${
                                                dataState.makes.map(({key, label}) => {
                                                    return`
                                                        <option
                                                            ${customYmm.shop_page.selections.make === key ? 'selected': ''}
                                                            value="${key}"
                                                        >
                                                            ${label}
                                                        </option>
                                                    `
                                                }).join('')
                                            }
                                        </select>
                                    </div>
                
                                    <div class="model ymm-form-select">
                                        <select 
                                            data-type="model"
                                            class="ymm-select-shop-page select-model ymm-select ${ (dataState.models.length > 0 && customYmm.shop_page.selections.model == false )? 'ymm-select-selected' :''}"
                                        >
                                            <option>Model</option>
                                            ${
                                                dataState.models.map(({key, label}) => {
                                                    return`
                                                        <option
                                                            ${customYmm.shop_page.selections.model === key ? 'selected': ''}
                                                            value="${key}"
                                                        >
                                                            ${label}
                                                        </option>
                                                    `
                                                }).join('')
                                            }
                                        </select>
                                    </div>
                                </div>
                            
                                <div class="ymm-button-holder-wrapper">
                                    <div class="ymm-button-holder">
                                        <div class = "ymm-clear-btn">
                                            <button 
                                                class ="shop-page-clear-selection button button-secondary btn-clear" 
                                            >
                                                ${ customYmm['clearBthText'] } 
                                            </button>
                                        </div>
                                        <div class = "ymm-go-btn">
                                            <button 
                                                class ="shop-page-go-btn button button-primary btn-go"
                                            > 
                                                Go 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `: `
                    <div class = "ymm-shop-page ymm-change-or-clear ymm-mt-2 ymm-mb-2 d-flex ymm-justify-content-between">
                        <div class = "ymm-change-or-clear__title">
                            <h4>
                                ${customYmm.shop_page.selections.year} 
                                ${customYmm.shop_page.selections.make}
                                ${customYmm.shop_page.selections.model}
                                <span>parts</span>
                            </h4>
                        </div>
                        <div class = "change-clear-btn-wrapper d-flex ymm-ju stify-content-around">
                            <div class = "change-vehicle-wrapper">
                                <button  
                                    class = "shop-page-change-vehicle search-page-change-vehicle-btn button button-primary btn-change"
                                >
                                    Change
                                </button>
                            </div>
                            <div class = "clear-selection-wrapper">
                                <button  
                                    class="shop-page-clear-selection search-page-change-vehicle-btn button button-secondary btn-clear"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                `
            }
        </div>
        <div class="category-wrappers">
            <div class="parent-category-wrappers  page-width cm_vehicle-categories_category-wrapper-repeater cm_vehicle-categories__topline cmRepeater_hierarchicalGroups">
                ${
                    dataState.categories.filter(c => c.children.length > 0).map(cc => categoryCard(cc)).join('')
                }
            </div>
            <div class="child-categories">
            ${
                dataState.categories.filter(c => c.children.length > 0).map(c => {
                    return`
                        <div class="category-wrapper" id="nav_${c.url}">
                            <div class="cm_vehicle-categories_category-wrapper page-width">
                                <h1 class="cm_vehicle-categories_category-wrapper-title">${c.name}</h1>
                                <div class="cm_vehicle-categories_category-repeater  cmRepeater_subvalues">
                                    ${
                                        c.children.map(cc => categoryCard(cc)).join('')
                                    }
                                </div>
                            </div>
                        </div>
                    `
                }).join('')
            }
            </div>
        </div>
    `
    
    Array.from(document.querySelectorAll('.ymm-select-shop-page')).forEach(selectTag => {
        selectTag.addEventListener('change', (event) => {
            handleChangeInDropdown(event)
        })
    })

    Array.from(document.querySelectorAll('.shop-page-clear-selection')).forEach(clearBtn => {
        clearBtn.addEventListener('click', (event) => {
            handleClearSelection(event)
        })
    })

    Array.from(document.querySelectorAll('.shop-page-change-vehicle')).forEach(clearBtn => {
        clearBtn.addEventListener('click', (event) => {
            handleChangeVehicleClick(event)
        })
    })

    Array.from(document.querySelectorAll('.shop-page-go-btn')).forEach(clearBtn => {
        clearBtn.addEventListener('click', (event) => {
            handleGoClick(event)
        })
    })

}