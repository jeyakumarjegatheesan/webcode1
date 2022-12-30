
const videoCardContainer = document.querySelector('.videocontainer');
let apikey = "AIzaSyChtNTo5Mm_yUy72Bia6K8Xf7A7D32Dv3g";
let videohttp ="https://www.googleapis.com/youtube/v3/videos?";
let channelhttp ="https://www.googleapis.com/youtube/v3/channels?";

fetch(videohttp + new URLSearchParams({
    key: apikey,
    part: 'snippet',
    chart:'mostpopular',
    maxResults:50,
    regionCode: 'IN',
}))
.then(res=>res.json())
.then(data=>{
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    });
})
.catch(err => console.log(err));

const  getChannelIcon = (videodata) =>{
    fetch(channelhttp + new URLSearchParams({
        key:apikey,
        part:'snippet',
        id: videodata.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=> {
    // console.log(data);
    videodata.channelthumbnail = data.items[0].snippet.thumbnails.default.url;
    // console.log(videodata);
    makeVideoCard(videodata);
    })
}
const makeVideoCard =(data)=>{
    videoCardContainer.innerHTML +=`
    <div class="video" onclick="location.href ='https://www.youtube.com/watch?v=${data.id}'" >
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelthumbnail}" class="channelIcon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channelname"${data.snippet.channeltitle}></p>
                </div>
            </div>
    </div>
    `;
    }
// searchbar

const searchInput = document.querySelector('.searchbar');
const searchbtn = document.querySelector('.searchbtn');
let searchlink = "https://www.youtube.com/results?search_query=";
searchbtn.addEventListener('click',() =>{
    if(searchInput.value.length){
        location.href = searchlink + searchInput.value;
    }
})
