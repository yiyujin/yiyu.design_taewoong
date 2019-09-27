

let articles = {};

_get = () => {
    // 20개 까지 우선 출력
    return fetch('https://api.brunch.co.kr/v2/article/@modernmother')
        .then(res => res.json())
        .then(res => res.data.list)
        .catch(err => console.log(err))
}

_getArticle = async () => {
    articles = await _get();
    drawPosts();
}

_getArticle();

drawPosts = () => {
    const posts = document.querySelector('.posts');
    const li_post = document.querySelector('.post');
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    articles.map(post => {
        // get data from url
        const thumb = post.articleImageForDiscover ? post.articleImageForDiscover : post.articleImageList[0].url;
        const title = post.title;
        const subtitle = post.subTitle;
        const date_temp = new Date(post.updateTime);
        const date = monthNames[date_temp.getMonth()] + " " + date_temp.getDay().toString() + "," + date_temp.getFullYear().toString();

        const summary = post.contentSummary;
        const summary_arr = summary.split('.');
        const summary_first = summary_arr[0];
        const summary_last = summary_arr[summary_arr.length - 2];

        const url = "https://brunch.co.kr/@arosaegle/" + post.no;

        // add child
        var p = li_post.cloneNode(true);

        // get tag from html
        const post_url = p.querySelector('.post_url');
        const post_img = p.querySelector('.post_img');
        const post_title = p.querySelector('.post_title');
        const post_subtitle = p.querySelector('.post_subtitle');
        const post_data = p.querySelector('.post_data');
        const post_summary_first = p.querySelector('.post_summary_first');
        const post_summary_last = p.querySelector('.post_summary_last');

        post_url.href = url;
        post_img.style.backgroundImage = "url(" + thumb + ")";
        post_title.innerHTML = title;
        post_subtitle.innerHTML = subtitle;
        post_data.innerHTML = date;
        post_summary_first.innerHTML = "<span>[0] </span>" + summary_first;
        post_summary_last.innerHTML = "<span>[-1] </span>" + summary_last;

        posts.appendChild(p);
    });

    posts.querySelectorAll('.post')[0].remove();
    posts.classList.remove('display-none');

    changeSuttitleWidth();
}

changeSuttitleWidth = () => {
    const post = document.querySelectorAll('.post');
    post.forEach(el => {
        const title = el.querySelector('.post_title');
        const subtitle = el.querySelector('.post_subtitle');
        subtitle.style.width = `calc(100% - ${title.clientWidth}px - 4px)`
    })
}