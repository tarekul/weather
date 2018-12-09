class LocationObj {
    constructor(obj={}){
        this.obj = obj;
    }

    saveDayInfo(day,icon,highTemp,lowTemp){
        this.obj.day = day
        this.obj.icon = icon;
        this.obj.highTemp = highTemp;
        this.obj.lowTemp = lowTemp;
    }

    getInfo(){
        return this.obj
    }
}

const test = new LocationObj()
test.saveDayInfo('monday', 'cloudy','45','10')
//console.log(test.getInfo())

const idk = {
    'monday' : test
}

//console.log(idk.monday.getInfo());


getWeatherdata = (callback) => {
    const API_KEY = 'b55f77ffb3323f908811d7d76875c00b'
    const LAT = '40.7128'
    const LNG = '74.0060'
    const url = `https://wt-taqqui_karim-gmail_com-0.sandbox.auth0-extend.com/darksky?api_key=${API_KEY}&lat=${LAT}&lng=${LNG}`    
    //const url =`https://api.darksky.net/forecast/b55f77ffb3323f908811d7d76875c00b/37.8267,-122.4233`
    
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', e => {
        const info = JSON.parse(e.currentTarget.response);
        const data = JSON.parse((info.res.text));
        //console.log(data.timezone = 'America/New_York');
        //console.log(data);
        callback(data)
    })
    request.send();

}

updateState = fulldata =>{
    //console.log(fulldata.daily.data);
    
    const weeklydata = fulldata.daily.data
    const mon = {}
    const tue = {}
    const wed = {}
    const thu = {}
    const fri = {}
    const sat = {}
    const sun = {}
    const mon2 = {}

    let everyday = {}
    
    const dayArray  = [mon,tue,wed,thu,fri,sat,sun,mon2]
    const dayArray2 = ['mon','tue','wed','thu','fri','sat','sun','mon2']
    weeklydata.forEach((day,i) => {
        const icon = day.icon
        const lowtemp = day.temperatureLow
        const hightemp = day.temperatureHigh

        let dayObj = new LocationObj()
        dayObj.saveDayInfo(dayArray[i],icon,lowtemp,hightemp)

        everyday[dayArray2[i]] = dayObj;
        
        
       
        
        
    });

    state.new_york = everyday;
    render(state)
    

    
}

state = {

    
}

const objToHtml = (day,icon,lowtemp,hightemp) =>{
    return `<div class="col-3">
    <p>${day}<p>
    <p>${icon}<p>
    <p>${lowtemp}<p>
    <p>${hightemp}</p>
    </div>`
}

render = state =>{
    const js_row1 = document.querySelector('.js-row1')
    const js_row2 = document.querySelector('.js-row2')
    
    const low_high_icon = state.new_york.mon.getInfo();

    //objToHtml('monday',low_high_icon.icon,low_high_icon.lowTemp,low_high_icon.highTemp)
    js_row1.innerHTML += objToHtml('monday',low_high_icon.icon,low_high_icon.lowTemp,low_high_icon.highTemp)

    let low_high_icon2 = state.new_york.tue.getInfo();
    
    js_row1.innerHTML += objToHtml('tuesday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.wed.getInfo();
    
    js_row1.innerHTML += objToHtml('wednesday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.thu.getInfo();
    
    js_row1.innerHTML += objToHtml('thursday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.fri.getInfo();
    
    js_row2.innerHTML += objToHtml('friday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.sat.getInfo();
    
    js_row2.innerHTML += objToHtml('saturday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.sun.getInfo();
    
    js_row2.innerHTML += objToHtml('sunday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)

    low_high_icon2 = state.new_york.mon2.getInfo();
    
    js_row2.innerHTML += objToHtml('umday',low_high_icon2.icon,low_high_icon2.lowTemp,low_high_icon2.highTemp)
}


getWeatherdata(updateState)

console.log(state);
