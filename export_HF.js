function onInit() {
    // agrega libreria jsZip
    let jszip = document.createElement('script');
    let FileSaver = document.createElement('script');
    jszip.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js';
    FileSaver.src = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js";
    jszip.async = true;
    FileSaver.async = true;
    
    document.body.append(jszip,FileSaver);
    
    setTimeout(() => {
        // inicia la exportacion 
        exportHeader();
        exportFooter();
        exportWpage();
        exportStyleCatmandu();
        download(); 
    }, 1000);
}
const LOGO = document.querySelector('#dnn_dnnLOGO_imgLogo');
function splitE(params) {
    if (params.split('?')) {
        return params.split('?')[0];
    } else {
        return params;
    }
}
function download() {
    var zip = new JSZip();
    let UserService = `${$UserService}`.toLowerCase();
    let BranchCode = `${$BranchCode}`.toLowerCase();
    var folderUserService = zip.folder(`${UserService}`);
    let html_resurces = folderUserService.folder(`htmlresources`);
    let html_resurces_catmandu = folderUserService.folder(`htmlresourcescatmandu`);
    let sucursal = html_resurces.folder(`${UserService}-${BranchCode}`);
    let sucursal__waitingpage = sucursal.folder(`waitingpage`);
    let sucursalCatmandu = html_resurces_catmandu.folder(`${UserService}-${BranchCode}`);
    sucursal.file('header.html',localStorage.getItem('header'));
    sucursal.file('footer.html',localStorage.getItem('footer'));
    sucursal.file('style.css',localStorage.getItem('style'));
    sucursal__waitingpage.file('waitingpage.html',localStorage.getItem('wpage'));
    sucursal__waitingpage.file('waitingpage-mobile.html',localStorage.getItem('wpageMobile'));
    sucursalCatmandu.file('header.html',localStorage.getItem('header'));
    sucursalCatmandu.file('footer.html',localStorage.getItem('footer'));
    sucursalCatmandu.file('waitingpage.html',localStorage.getItem('wpage'));
    sucursalCatmandu.file('waitingpage-mobile.html',localStorage.getItem('wpageMobile'));
    sucursalCatmandu.file('style.css',localStorage.getItem('style'));
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, `${$BranchCode}.zip`);
    });
}
    function exportHeader() {
        let headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
        headerContainer.innerHTML = 
        `
        <link id="cssHeaderNs" href="" rel="stylesheet" type="text/css">
        <link id="cssFooterNs" href="" rel="stylesheet" type="text/css">
        <link id="cssSkinNs" href="" rel="stylesheet" type="text/css">
        <header></header>
        `
        header_export = document.querySelector('header');
        header_export.querySelectorAll('a').forEach( a => {
            if (a.href != "#") {
                a.href = a.href
            }
            if (a.parentElement.className.includes('_navbar__item--active')){
                a.parentElement.classList.remove("_navbar__item--active");
            }
            
        })
        header_export.querySelectorAll('img').forEach( img => {
            img.src = splitE(img.src);
        } )
        let linkcss1 = document.querySelector('link[href*="/assets/css/header--"]');
        let linkcss2 = document.querySelector('link[href*="/assets/css/footer--"]');
        let linkcss3 = document.querySelector('link[href*="/assets/css/utilitybootstrap"]');
        let misReservasUrl = header_export.querySelector('a[href*="dnnMYBOOKINS"]');
        linkcss1.href = splitE(linkcss1.href);
        linkcss2.href = splitE(linkcss2.href);
        linkcss3.href = splitE(linkcss3.href);
        misReservasUrl.href = `${$UrlDomainNS}/NetFulfillment/Login.aspx?UserService=${$UserService}&BranchCode=${$BranchCode}&ContextApp=CMS&Culture=${$CurrentCulture}`;
        headerContainer.querySelector('#cssHeaderNs').href = linkcss1.href;
        headerContainer.querySelector('#cssFooterNs').href = linkcss2.href;
        headerContainer.querySelector('#cssSkinNs').href = linkcss3.href;
        headerContainer.querySelector('header').outerHTML = header_export.outerHTML;
        // se descarga el header 
        localStorage.setItem('header',headerContainer.outerHTML);
    }
    function exportFooter() {
        footer_export = document.querySelector('footer');
        footer_export.querySelectorAll('a').forEach( a => {
            if (a.href != "#") {
                a.href = a.href
            }     
        } )
        footer_export.querySelectorAll('img').forEach( img => {
            img.src = splitE(img.src);
        } )
        let script1 = document.body.querySelector('script[src*="header_footer.js"]');
        script1.src = splitE(script1.src);
        let scriptDataHead = script_datahead();
        footer_export.append(script1,scriptDataHead);
        
        localStorage.setItem('footer',footer_export.outerHTML);
    }
    function exportWpage() {
        var fileName = "wpage";
        function reqListener () {
            let div = document.createElement('div');
            div.innerHTML = this.responseText;
            div.querySelector('#cssHeaderWpage').href = document.querySelector('link[href*="/assets/css/header--"]').href;
            div.querySelector('#cssSkinWpage').href = document.querySelector('link[href*="/assets/css/skin"]').href;
            let script = script_datahead();
            div.appendChild(script);
            localStorage.setItem(fileName,div.innerHTML);
        }    
        function reqListenerMobile () {
            fileName = "wpageMobile";
            let div = document.createElement('div');
            div.innerHTML = this.responseText;
            div.querySelector('#cssHeaderWpage').href = document.querySelector('link[href*="/assets/css/header--"]').href;
            div.querySelector('#cssSkinWpage').href = document.querySelector('link[href*="/assets/css/skin"]').href;
            let script = script_datahead();
            div.appendChild(script);
            localStorage.setItem(fileName,div.innerHTML);
        }          
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "/portals/0/assets_for_all_results/export_header_footer/waitingpage.html");
        oReq.send();
        //mobile
        var oReqM = new XMLHttpRequest();
        oReqM.addEventListener("load", reqListenerMobile);
        oReqM.open("GET", "/portals/0/assets_for_all_results/export_header_footer/waitingpage-mobile.html");
        oReqM.send();
    }
function script_datahead(){
    let favicon = document.querySelector('link[rel="SHORTCUT ICON"]');
    if (favicon) favicon.href = splitE(favicon.href);
    let script = document.createElement('script');
    script.innerHTML = 
        `
        document.title = "${LOGO.alt}";
        $('head').append('${favicon.outerHTML || ''}');
        `;
    return script;
}
function exportStyleCatmandu() {
    $.get("/portals/0/assets_for_all_results/export_header_footer/style.css", function(data) {
        const cssVariables = [
            '--net-color-primary',
            '--net-color-secundary',
            '--net-color-terciary',
            '--net-color-sucess',
            '--net-color-danger',
            '--net-color-warning',
            '--net-color-info',
            '--net-color-light',
            '--net-color-dark',
            '--net-btn-bg-primary',
            '--net-btn-bg-primary-hover',
            '--color-header-link',
            '--color-header-link-hover',
            '--color-header-transparent-link',
            '--color-header-transparent-link-hover',
            '--net-color-link',
            '--net-color-link-hover',
            '--color-1',
            '--color-2',
            '--color-3'
        ];
        let cssRootVariables = ':root {\n';
        cssVariables.forEach(variable => {
            const value = getCSSVariable(variable);
            cssRootVariables += `  ${variable}: ${value};\n`;
        });
        cssRootVariables += '}\n';
        let lines = data.split('\n');
        lines.splice(2, 0, cssRootVariables);
        data = lines.join('\n');

        console.log(data);
        localStorage.setItem('style', data);
    });
}

function exportStyleNetfullfillment(){
    
}

onInit();


function getCSSVariable(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

