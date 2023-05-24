
//gives longitude and latitude of the location to the weather api
export async function geocode(zipcode, country) {
    let json;
    let response;
    try {
        const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${country}&appid=9a9189463659c4dd9b3e989bdd6de94e`;

        console.log(url);
        response = await fetch(url);

        console.log(response);

        json = await response.json();


    } catch (error) {
        console.log("here0");


        console.log(error.message);
    }

    console.log(response);

    if (!response.ok) {
        throw Error("INVALID PIN CODE");
    }
    else {
        return json;
    };
};