function displayCustomFieldsAndAssignListeners(){

    customYmm['custom_fields'].map(cf => cf.name_key).forEach(key => {
        if (typeof customYmm["customFieldsSelections"][key] === "undefined") {
            customYmm["customFieldsSelections"][key] = [];
        }
    });

    customYmm['custom_fields'] = customYmm['custom_fields']
        .map(cf => ({...cf, sort_order: customYmm['filter_settings'].filter(fs => fs.filter_key === cf.name_key)[0]?.sort_order || 1 }))
        .sort((a, b) => a.sort_order - b.sort_order);
    
    customYmm['custom_fields']
    .filter(cf => !customYmm.selectKeys.includes(cf.name_key))
    .forEach((custom_field) => {
         
        const newDiv = document.createElement('div') 
        newDiv.className = "ymm-filter-group"
        newDiv.setAttribute('data-filter-key', custom_field.name_key)
        newDiv.innerHTML = `
                <div class="collapsible-wrapper${ window.innerWidth < 1024 && customYmm["customFieldsSelections"][custom_field.name_key].length == 0 ? ' collapsible-collapsed' : '' }">
                    
                    <div class="collapsible-title-icon custom-fields-collapsible-summary">
                        <h3>${custom_field.name}</h3>
                        <div class="collapsible-toggle-icon minus-icon" >${returnArrowLeft()}</div>
                        <div class="collapsible-toggle-icon plus-icon" >${returnArrowDown()}</div>
                    </div>

                    <div class="collapsible-content">
                        ${custom_field.values.sort((a,b) => a.value_key.localeCompare(b.value_key))
                        .filter(({value_key}) => value_key !== "nan" && value_key !== "" )
                        .map(({value_key, value, product_count, name_key}, index) => {
                            return`
                                <div class="input-and-label${index > 4 ? ' surplus-item':''}">
                                    <input 
                                        ${customYmm["customFieldsSelections"][name_key].includes(value_key) ? 'checked' : '' } 
                                        name = "cb-filter" 
                                        data-cf = "${name_key}" 
                                        class = "cb-filter cb-filter-custom-fields" 
                                        type = "checkbox" 
                                        id = "cb-${name_key}-${value_key}" 
                                        data-value-key = "${value_key}" 
                                    >
                                    <label for="cb-${name_key}-${value_key}"  class="form-label--checkbox">
                                        <span class="brand-name">${value} (${product_count})</span>
                                    </label>
                                </div>                    
                            `
                        })
                        .join(' ')}

                        ${
                            custom_field.values.length  > 5 && `
                                <div class="show-more-items">+ Show More</div>
                            ` || ''
                        }
                    </div>
                </div>
       `   

        document.querySelector('.ymm-filters-wrapper-inner').appendChild(newDiv)

    })
 
    if(document.querySelector('.show-more-items')){
        Array.from(document.querySelectorAll('.show-more-items')).forEach(showMoreItem => {
            showMoreItem.addEventListener('click', (event) => {
                const elem  = event.target
                elem.closest('.collapsible-content').classList.toggle('surplus-items-displayed')
                if(elem.closest('.collapsible-content.surplus-items-displayed')){
                    elem.innerText = "- Show Less"
                }else{
                    elem.innerText = "+ Show More"
                }
            })
        })
    }

    if(document.querySelector('.custom-fields-collapsible-summary')){
        Array.from(document.querySelectorAll('.custom-fields-collapsible-summary')).forEach(collapsibleSummaryItem => {
            collapsibleSummaryItem.addEventListener('click', (event) => {
                const elem  = event.target
                elem.closest('.collapsible-wrapper').classList.toggle('collapsible-collapsed')
            })
        })
    }

    Array.from(document.querySelectorAll('.cb-filter-custom-fields')).forEach(input => {
        input.addEventListener('change', () => {

            if(typeof customYmm['customFieldsSelections'][input.getAttribute('data-cf')] == 'undefined' ){
                customYmm['customFieldsSelections'][input.getAttribute('data-cf')] = [];
            }
        
            if(input.checked){
                customYmm['customFieldsSelections'][input.getAttribute('data-cf')].push(input.getAttribute('data-value-key'));
            }else{
                customYmm['customFieldsSelections'][input.getAttribute('data-cf')] = 
                customYmm['customFieldsSelections'][input.getAttribute('data-cf')]
                .filter(v => v !== input.getAttribute('data-value-key'));
            }
    
            setURLparams()
            customYmm.currentPage = 1
            fetchProductsAndRender(append =false )
    
        })
    
    })
    
}