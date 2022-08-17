function scrollTo(e) {
    e.preventDefault();
    const anchor = e.target;

    if(anchor.nodeName != 'A'){
        return;
    }
    let sectionId = anchor.getAttribute('href');
        let selectedSection = document.querySelector(`${sectionId}`);
    
    selectedSection.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    
}

export { scrollTo }