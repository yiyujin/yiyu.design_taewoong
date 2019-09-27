window.onload = function(){
    let projects;
    makePjBg();
}

let isDetailPage = false;

// get projects
getPj = () => {
    return fetch('./src/projects/projects.json')
    .then(res => res.json())
    .then(data => data.projects)
    .catch(err => console.log(err))
}

// change numbering fnc
changeNumber = (index) => {
    if (index < 10) {
        return "0" + index;
    } else {
        return index;
    }
}
    
// fill project bg
makePjBg = async () =>{

    projects = await getPj();
    const project = document.querySelector('.project');
    const wrap_projects = document.querySelector('.wrap-projects');

    wrap_projects.addEventListener('click', handlePortfolioClick);

    projects.map(el => {
        let project_clone = project.cloneNode(true);
        project_clone.querySelector('.title').innerHTML = el.title;
        project_clone.querySelector('.descript').innerHTML = el.descript;

        const imageURL = `url(./src/projects/${el.title}/thumbnail.png)`;
        project_clone.style.backgroundImage = imageURL;

        project_clone.contents = el.contents;

        // width_x2
        if(el.widthx2){
            project_clone.classList.add('width_x2');
        }
        wrap_projects.appendChild(project_clone);
    })

    wrap_projects.querySelector('.project').remove();

    handleHideGuides();
}

handleHideGuides = () => {
    hidePjGuides_top();
    hidePjGuides_right();
    hidePjGuides_left();
}

handlePortfolioClick = (e) => {
    showDetail(e);
    blockBodyScroll();
}

// showDetail
showDetail = (e) => {
    isDetailPage = !isDetailPage;
    const sec_detail = document.querySelector('#sec-detail');
    sec_detail.style.display = "block";

    const title = e.target.querySelector('.title').innerHTML;
    const target_project = projects.find(el => {
        return el.title == title;
    })

    // draw header
    const detail_title = document.querySelector('.detail-title');
    const detail_descript = document.querySelector('.detail-descript');

    detail_title.innerHTML = target_project.title;
    detail_descript.innerHTML = target_project.descript;

    // draw contents
    const con_detail = document.querySelector('.con-detail');
    let count_img = 0;
    target_project.contents.map(list => {
        
        let el = undefined;
        if(list.type=="text"){
            el = document.createElement('p');
        }else if(list.type == "img"){
            count_img++;

            el = document.createElement('img');
            el.alt = list.src;
            const imgURL = `src/projects/${target_project.title}/img-${changeNumber(count_img)}.png`;
            el.src = imgURL;
        }

        el.innerHTML = list.src;
        el.className = 'detail-list';
        con_detail.appendChild(el);
    })
}

blockBodyScroll = () => {
    const body = document.querySelector('body');
    body.style.overflow = "hidden";
}

makeBodyScroll = () => {
    const body = document.querySelector('body');
    body.style.overflow = "auto";
}

handleClose = () => {
    scrollToTop();
    cleanDetail();
    hideDetail();
    makeBodyScroll();
}

cleanDetail = () => {
    const con_detail = document.querySelector('.con-detail');
    con_detail.innerHTML = "";
}

scrollToTop = () => {
    const sec_detail = document.querySelector('#sec-detail');
    sec_detail.scrollTo(0,0);
}

// hideDetail
hideDetail = () => {
    isDetailPage = !isDetailPage;
    const sec_detail = document.querySelector('#sec-detail');
    sec_detail.style.display = "none";
}

const btn_close = document.querySelector('.btn-close');
btn_close.addEventListener('click', handleClose);



// hide roject guide on top
hidePjGuides_top = () =>{
    const projects = document.querySelectorAll('.project');
    let count = 0;
    projects.forEach(function (e) {
        console.log(e);
        if (count < 4) {
            const targets = e.querySelectorAll('.top');
            console.log(targets);
            const targets_x2 = e.querySelectorAll('.top-line');
            
            targets.forEach(function (target) {
                target.style.display = "none";
            })
            targets_x2.forEach(function (target) {
                target.style.display = "none";
            })
            if(e.classList.contains('width_x2')){
                count++;
            }
        }else{
            return;
        }
        count++;
    })
}

// hide project guide on right
hidePjGuides_right = () =>{
    const projects = document.querySelectorAll('.project');
    let count = 0;
    projects.forEach(function (e) {
        if(e.classList.contains('width_x2')){
            count++;
        }

        if (count % 4 == 3) {
            const targets = e.querySelectorAll('.right');
            
            targets.forEach(function (target) {
                target.style.display = "none";
            })
        }
        count++;
    })
}

hidePjGuides_left = () =>{
    const projects = document.querySelectorAll('.project');
    let count = 0;
    projects.forEach(function (e) {
        

        if (count % 4 == 0) {
            const targets = e.querySelectorAll('.left');
            
            targets.forEach(function (target) {
                target.style.display = "none";
            })
        }
        if(e.classList.contains('width_x2')){
            count++;
        }
        count++;
    })
}
