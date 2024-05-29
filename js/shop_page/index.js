function fetchRelevantCategoriesAndRender(){
    let dataState

    let isChangeOrClearBlock = customYmm.shop_page.selections.year != false &&
    customYmm.shop_page.selections.make != false &&
    customYmm.shop_page.selections.model != false

    const handleChangeInDropdown = (e) => {
        customYmm.shop_page.selections[e.target.getAttribute('data-type')] = e.target.value;
        fetchRelevantCategoriesAndRender();
    }

    const handleGoClick = (e) => {
        fetchRelevantCategoriesAndRender()
    }

    const handleClearSelection = ()=>{
        customYmm.shop_page.selections = {year: false, make: false, model: false}
        fetchRelevantCategoriesAndRender()
    }

    const handleChangeVehicleClick = () => {
        renderShopPageContent(            
            dataState, 
            isChangeOrClearBlock = false, 
            handleChangeInDropdown,
            handleGoClick, 
            handleClearSelection, 
            handleChangeVehicleClick
        )
    }

    let endPoint = customYmm['ymmDomain'] + '/send_categories.php';
    endPoint += `?year=${customYmm.shop_page.selections.year}&make=${customYmm.shop_page.selections.make}&model=${customYmm.shop_page.selections.model}`
    
    fetch(endPoint)
    .then(response => response.json())
    .then(data => {
        dataState = data
        renderShopPageContent(
            dataState, 
            isChangeOrClearBlock, 
            handleChangeInDropdown,
            handleGoClick, 
            handleClearSelection, 
            handleChangeVehicleClick
        )
    })
}