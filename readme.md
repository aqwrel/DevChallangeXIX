![Dev_challenge_cover](https://raw.githubusercontent.com/aqwrel/DevChallangeXIX/main/assets/Dev_challenge_cover.jpg)

# Online Round Task. Frontend | DEV Challenge XIX

[Watch the result](https://devchallenge-aqwrel.vercel.app/)

https://devchallenge-aqwrel.vercel.app/

## Task description

Since 2014, the [Center for Civil Liberties](https://ccl.org.ua/en/about-the-ccl/)  has been helping to protect people's rights and release from prison military prisoners, including civilians, soldiers who defended their land, and political prisoners who opposed Putin.

Thousands of people have been saved by the Center for Civil Liberties. During the war, the center defused more than 10,000 war crimes committed by the Russian military on the territory of Ukraine.

Your task. Develop the mechanics of the front-end part of the interactive map of crimes during the war based on the collected database. This project’s idea is to spread the news to the rest of the world about unjustified aggression against the Ukrainian nation. Create an animation of the block with a map, timeline and statistical data.

The user at the input receives an array with data. The map (svg, canvas, or anything other than 3rd party libraries) should have crime incidents mapped according to geolocation as red dots.

Statistical data need to be splitted by  affected_type. Translates for types you can find in names.json file. Language needs to be related to browser language, by default english 

☝️ Championship participants are not allowed to use third party solutions/libraries, only Vanilla JS.

#### Under the map there is an interactive timeline in the form of "columns":
* Each division corresponds to a date (from)
* The statistics on the left are the number of crimes (affected_number) on the current date, broken down by category (affected_type).
* The height of the bar depends on the number of crimes (affected_number) per period, and must be calculated according to the data.
* The map can be responses.
* We show 100 divisions on the timeline. We take the last 100.

#### The bottom timeline is interactive:

* If you click on one of the columns, the map should display all cases from the beginning of the war to this day. (the appearance of points on the map is animated from: no point to showing all points)
* The play button plays the animation from the selected day to the current day.
* When you click the Play button, the animation will be replaced with a pause.

![map](https://raw.githubusercontent.com/aqwrel/DevChallangeXIX/main/assets/readmeMap.png)
The finished solution is a web application that takes an array of data and an object with translates as input, and outputs a map with animation controls.

#### Evaluation criteria 

|  Evaluation criteria | Points |
|---|---|
|  **Technical assessment** | 180 |
| The map displays all data |  55 |
|  Map and timeline animation |  55 |
|  Display and animation of statistical data |  35 |
|  Player control (start, pause) |  35 |
|  **Expert assessment** |  76 |
|  Code quality |  76 |
|  **Bonus points** |  128 |
|  Selection of a point on the timeline with the correct display of data |  64 |
|  Response map |  64 |

##### My score is 329