
function displayBrands(){

    if(!document.querySelector('.ymm-brands-filter')) return 

    brandData = customYmm["brands"];
    
    document.querySelector('.ymm-brands-filter').innerHTML = `
        <div class="collapsible-wrapper">
            <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                <h3>Brand</h3>
                <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
            </div>
            <div class="collapsible-content">
                ${brandData.sort((a,b) => a.name.localeCompare(b.name)).map(brand => createBrandItem(brand)).join(' ')}
            </div>
        </div>
    `
}