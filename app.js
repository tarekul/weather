const GETRequest = (url, cb) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', response => {
        //console.log(typeof response.currentTarget.response);
        const dataObj = JSON.parse(response.currentTarget.response)
        cb(dataObj)
    })
    request.send();
}

const getGifs = (search, cb) => {
    if (search === "" || search.trim() === "") {
        return;
    }

    //console.log(search);

    const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}`;

    GETRequest(URL, dataObj => {
        const allGif = dataObj.data //Array of gif objects, length 25
        cb(allGif);
    })
}

const state = {
    locations: [],
    gifys: {
        //'partly-cloudy-day': 'https://media2.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif'
    }
}

const getWeather = (lat, lng, cb) => {
    const URL_BASE = 'https://wt-taqqui_karim-gmail_com-0.sandbox.auth0-extend.com/darksky'
    const api_key = `0eb0617d0e71980e6b2f2163c66d4702`;
    const url = `${URL_BASE}?api_key=${api_key}&lat=${lat}&lng=${lng}`

    GETRequest(url, data => {
        const stringdata = data.res.text
        const objdata = JSON.parse(stringdata);
        cb(objdata);


    })
}


getdayName = (datetime) => {
    const days = ['Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'Sun']
    const dayValue = new Date(datetime * 1000).getDay();
    return days[dayValue] + 'day'


}


objToHTML = (hi, lo, desc, day, icon) => {
    //random gif out of 25 for that icon
    const rand = Math.floor(Math.random() * state.gifys[icon].length)
    
    return `<div class="column">
   <div class="ui fluid card">
       <div class="image">
           <img src="${state.gifys[icon][rand].images.original.url}">
       </div>
       <div class="content">
           <a class="header">${hi}&#8457;/${lo}&#8457;</a>
           <span class="date">${day}</span>
           <div class="description">
               ${desc}
           </div>
       </div>
   </div>
</div>`
}

render = (state) => {
    const body = document.querySelector('.js-container')
    body.innerHTML = '';
    state.locations.forEach(city => {
        let js_parent_div = '<div class="js_parent_div ui five column grid">'
        for (let i = 0; i < 5; i++) {
            daily = city.forecast[i]
            let forecast_columns = ''
            const {
                hi,
                lo,
                desc,
                day,
                icon
            } = daily


            forecast_columns += objToHTML(hi, lo, desc, day, icon)
            js_parent_div += forecast_columns
        }

        js_parent_div += '</div>'
        //console.log(js_parent_div)
        body.innerHTML += js_parent_div
        //console.log(body);

    });

}

const searchBtn = document.querySelector('.js-search');
const locationInput = document.querySelector('.js-input');

searchBtn.addEventListener('click', e => {
    if (locationInput.value.trim() != '') {
        console.log(0)
        console.log(e);
        const val = locationInput.value;
        locationInput.value = "";

        const parts = val.split(',');
        const lat = parts[0].trim();
        const lng = parts[1].trim();

        getWeather(lat, lng, objdata => {
            console.log(1)
            //console.log(objdata);
            const lat = objdata.latitude;
            const lng = objdata.longitude;

            const forecasts = objdata.daily.data
            //console.log(forecasts);

            //Will hold all 5 forecasts object 
            const forecastsForState = []
            const iconsNeeded = []

            for (let dailyforcast of forecasts) {
                const dayForcast = {}

                dayForcast.icon = dailyforcast.icon
                iconsNeeded.push(dayForcast.icon);
                console.log(iconsNeeded);

                dayForcast.hi = dailyforcast.temperatureHigh
                dayForcast.lo = dailyforcast.temperatureLow
                dayForcast.desc = dailyforcast.summary
                dayForcast.lastUpdated = dailyforcast.time

                const datetime = dailyforcast.time
                dayForcast.day = getdayName(datetime);

                forecastsForState.push(dayForcast)
            }

            const city = {}
            city.lat = lat
            city.lng = lng
            city.forecast = forecastsForState

            state.locations.push(city)

            let counter = 0;
            console.log(iconsNeeded);

            iconsNeeded.forEach(icon => {
                getGifs(icon, allgifs => {
                    counter++;
                    const rand = Math.floor(Math.random() * allgifs.length)
                    state.gifys[icon] = allgifs

                    if (counter === 5) {
                        render(state)
                    }
                })
            })

            //console.log(state);
            // console.log(4)
            // render(state)

            console.log('STATE', state);



        })
    }

})