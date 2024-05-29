function displaySearchModalInMobile(){
    document.querySelector('#cm-mobile-search-box').addEventListener('click', ()=> {
        const searchModal=`
            <div 
                class="searchbox-modal-mobile cm_dialog SearchBoxDialog" 
                id="cm_SearchBoxDialog"
            >
                <div data-focus-lock-disabled="false">
                    <div class="cm_search-box-root__dialog cm_search-box-root">
                        <div class="clear-self cm_search-box_container">
                            <div class="dialog-container">
                                <div class="search search-modal__form dialog-content">
                                    <div class="dialog-header">
                                        <div class="dialog-title">Search</div>
                                        <div class="searchbox-modal-mobile-close-icon cm_search-box-dialog_close-button close">
                                            <svg class="cm_icon cm_icon-times" height="20px" role="image" viewBox="0 0 22 22"><path d="M1,1L21,21M21,1L1,21"></path></svg>
                                        </div>
                                    </div>
                                    <div class="cm_search-box_form-container">
                                        <div data-autofocus-inside="true">
                                            <input 
                                                type="text" 
                                                autocomplete="off"
                                                class="search_input_mobile search_input search__input cm_searchInput nav-root" 
                                                placeholder="Search for..." 
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            title="Search" 
                                            aria-label="search button" 
                                            class="search_submit cm_search-box_submit search__button field__button" 
                                            data-cm-role="add-query"
                                        >
                                            <svg class="cm_icon icon icon-search" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="18" height="18.002" viewBox="0 0 18 18.002"><path id="Path_255" data-name="Path 255" d="M17.589-.151,13.38-4.359a7.31,7.31,0,0,0,1.176-5.087,7.353,7.353,0,0,0-6.288-6.243A7.319,7.319,0,0,0,.061-7.481,7.351,7.351,0,0,0,6.3-1.192a7.309,7.309,0,0,0,5.087-1.176L15.6,1.84A1.407,1.407,0,0,0,17.589-.151ZM2.781-8.437a4.505,4.505,0,0,1,4.5-4.5,4.505,4.505,0,0,1,4.5,4.5,4.505,4.505,0,0,1-4.5,4.5A4.5,4.5,0,0,1,2.781-8.437Z" transform="translate(0 15.75)"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ` 
        let modal = document.createElement('div')
        modal.innerHTML = searchModal
        modal.id = "wrapper-for-searchbox-modal-mobile"
        document.body.appendChild(modal)
        document.querySelector('.search_submit').addEventListener('click', () => {
            const searchValue = document.querySelector('.search_input_mobile').value 
            if(searchValue.length > 0){
                window.location.href = customYmm["siteURL"] + '/search/' + '?sq='+searchValue  
            }
        })
        document.querySelector('.searchbox-modal-mobile-close-icon').addEventListener('click', ()=> {
            modal.remove()
        })
    })
}