
class Functions  {
    static windSpeedToKM(windSpeed) {
        //input parameter is meters/s 
        let KMH = (windSpeed * 3.6).toFixed(2);
        return KMH;
      }

    static windOrigin (windDirection) {
        //This is where the wind is coming from.
        const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        let direction = directions[(windDirection / 22.5).toFixed(0)];
        return direction;
    }
    static windDirectionArrow (windDirection) {
        //This is where the wind is blowing to. If we get 360 degrees, it is coming from the north, but blowing south. 
        const directionArrows = ["↓","↙", "↙", "↙", "←", "↖", "↖", "↖", "↑", "↗", "↗", "↗", "→", "↘", "↘", "↘", "↓"];
        let direction = directionArrows[(windDirection / 22.5).toFixed(0)];
        return direction;
    }
    static temp_rat(temp){
        let rat = 1
        if(temp >= 15 && temp <= 25){
            rat = 5
        }
        else if(temp >= 12 && temp <= 28){
            rat = 4
        }
        else if(temp >=10 && temp <= 30){
            rat = 3
        }
        else if(temp >=5 && temp <= 35){
            rat = 2
        }
        else if(temp >= 40 || temp <= 0){
            rat = 1
        }
        return rat * 0.47
    }
    static hum_rat(humidity){
        let rat = 1
        if(humidity <= 20){
            rat = 5
        }
        else if(humidity <= 40){
            rat = 4
        }
        else if(humidity <= 60){
            rat = 3
        }
        else if(humidity <= 80){
            rat = 2
        }
        else {
            rat = 1
        }
        return rat * 0.26
    }
    static pre_rat(precip){
        let rat = 1
        if(precip <= 2.5){
            rat = 5
        }
        else if(precip <= 7.6){
            rat = 4
        }
        else if(precip <= 50){
            rat = 3
        }
        else if(precip <= 100){
            rat = 2
        }
        else {
            rat = 1
        }
        return rat * 0.21
    }
    static windsp_rat(wsp){
        let rat = 1;
        let wspkm = parseFloat(this.windSpeedToKM(wsp));
        if (wspkm >= 5 && wspkm <= 20){
            rat = 5;
        }
        else if (wspkm < 5){
            rat = 2;
        }
        else if (wspkm <= 35){
            rat = 4;
        }
        else if (wspkm <= 50){
            rat = 3;
        }
        else{
            rat = 1;
        }
        return rat * 0.06;
    }
    static rat_calc(t,h,p,w){
        let f_rat = this.temp_rat(t) + this.hum_rat(h) + this.pre_rat(p) + this.windsp_rat(w);
        return f_rat.toFixed(1);
    }

}
export default Functions;