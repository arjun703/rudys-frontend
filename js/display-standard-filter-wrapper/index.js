function displayStandardFilterWrapper(){

    const standarFilters = {
        'searchauto.brand': "ymm-brands-filter",
        'searchauto.category': "ymm-categories-filter",
        'searchauto.price': "ymm-prices-filter"
    }

    const tempFilterSettings = customYmm['filter_settings'].filter(fs => customYmm['custom_fields'].map(cf => cf.name_key).includes(fs.filter_key) || Object.keys(standarFilters).includes(fs.filter_key))

    tempFilterSettings.forEach(a => { // ensuring fitler_settings are in sort order

        if(!Object.keys(standarFilters).includes(a.filter_key)){return}

        var key = a.filter_key
        var className = standarFilters[key]

        let order = parseInt(a.sort_order)
        
        // Create the new div element you want to insert
        const newDiv = document.createElement('div');
        newDiv.className=className 
        newDiv.setAttribute('data-filter-key', key)
        newDiv.classList.add('ymm-filter-group')
    
        if(order === 1){
    
            const existingDiv = document.querySelector('.ymm-filters-wrapper-inner');
    

            // Insert the new div as the first child of the existing div
            existingDiv.prepend(newDiv);
    
        }else{
    
            const currentIndex = tempFilterSettings.findIndex(obj => obj.filter_key === key);
            
            const prevFilterKey = tempFilterSettings[currentIndex - 1].filter_key 
            
            // console.log(`div[data-filter-key="${prevFilterKey}"]`)
            
            if(prevFilterKey){
                // Select the existing div with the specified data attribute
                const existingDiv = document.querySelector(`div[data-filter-key="${prevFilterKey}"]`);
    
                if(existingDiv){
                    
                    // Insert the new div right after the existing one
                    existingDiv.insertAdjacentElement('afterend', newDiv);
                    
                }
    
            }
    
        }

    })

}