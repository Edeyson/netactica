function extractData() {
    let categories = [];
    
    document.querySelectorAll('.dnnClear.ui-tabs-panel').forEach(panel => {
        let categoryName = panel.querySelector('h3#tabs-titles').textContent.trim();
        let pasarela = panel.querySelector("table").id == "ptpasarela"? true:false;

        let rows = panel.querySelectorAll('tbody .rest-row');
        
        let data = [];
        rows.forEach(row => {
            let columns = row.querySelectorAll('td');
            if(pasarela){
                data.push({
                    proveedor: columns[0].querySelector('a').textContent.trim(),
                    mercado: columns[1].textContent.trim(),
                    tipo: columns[2].textContent.trim(),
                    mediospago: columns[3].textContent.trim(),
                    estado: columns[4].textContent.trim(),
                    preferencial: columns[5].textContent.trim(),
                    link: columns[0].querySelector('a').href,
                    logo: columns[0].querySelector('img').src
                });
            }else{
                data.push({
                    proveedor: columns[0].querySelector('a').textContent.trim(),
                    mercado: columns[1].textContent.trim(),
                    tipo: columns[2].textContent.trim(),
                    estado: columns[3].textContent.trim(),
                    preferencial: columns[4].textContent.trim(),
                    link: columns[0].querySelector('a').href,
                    logo: columns[0].querySelector('img').src
                });
            }
        });
        
        categories.push({ nombre: categoryName, datos: data });
    });
    
    return JSON.stringify(categories, null, 2);
}

console.log(extractData());
