
//gives weather based on longitude and latitude of the place

export async function forecast(lat, lon) {
    let json;
    let response;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a9189463659c4dd9b3e989bdd6de94e`;

        // console.log(url);
        response = await fetch(url);

        // console.log(response);

        json = await response.json();


    } catch (error) {
        console.log("here");
        console.log(error.message);
    };

    if (!response.ok) {
        throw Error("INVALID PIN CODE");
    } else {
        return json;
    };
};