## Inspiration
The pandemic confines us into our personal space, but it also provides new opportunities for health technology. It became easier to track one's nutrition intake since people's food choices become more limited and more controllable. We wanted to design an app that calculates and keeps track of users' nutrition intake when they input into the app the food that they had. We wanted to design an app that helps people live healthier at home. After all, with a healthier body, there comes a stronger immune system, and people can better fight the virus.

## What it does
ProjectNourish is an application (web or phone) that helps a user track their daily nutritional intake. This includes the user being able to manually enter in nutrition values, an item (e.g. an apple), or take a picture of the label and the program will process the image for the necessary information. Users are notified if they don't have enough intake of nutrients (compared to standard daily recommended values), to ensure that the user is consuming as much as their body requires. 

## How We Built it
Our back-end consists of SQL, Python, and Node.js. Our front-end is React.js, Javascript, and CSS. The connection between all of our code is made through Google Cloud, and the Python back-end code integrates the Google Cloud Vision API for OCR Image Processing.

## Challenges We ran into

One challenge we ran into was figuring out how the front-end and the back-end connected. Our app allows users to take a picture of a nutrition label and then parses the information on the nutrition label in order to gather the nutritional data. In order to do so, our front-end needed to format the image data in a way that can be accepted by the back-end. This was a challenge because figuring out how best to format that image data was difficult. To help solve this issue we looked at patterns in the image data and utilized regular expressions to help parse out the key information we needed. 

Another issue we had was figuring out how Google Cloud works. We knew we wanted to use Google Cloud to help with image recognition and database storage, but the challenge was sifting through the tremendous amount of Google Cloud's functionalities to find the right one. And once we found the right tool to use, understanding that tool was it's own challenge. Thankfully, we utilized the amazing DubHack's mentors to understand Google Cloud.

## Accomplishments that We're proud of
We aimed for an image scanner and putting them into the database. Combining APIs and our parsing programs, we can produce accurate and formatted nutritional input from images of nutrition labels. We also design a user-friendly UI featuring secure logins. We are even more proud that our veteran programmers on the team taught industrial standards, such as React, Google Cloud (and its APIs), MySQL to the less experienced in the team.

## What We learned
We gain experience in connecting between the front end and the back end, and how a fully functional application is developed. We also learned to split up a project into different parts, but at the same time have good communication to make a functioning program. Besides that, we also practice our programming skills with a real-world project. 

## What's next for ProjectNourish

We would love to incorporate some data analytics to the Nourish app. For example, we could look at the daily nutritional intake data of the user and do some data analytics to measure whether or not the user is eating healthy. We could also add infographics to display this data on the dashboard so that the user can immediately gauge how well they are doing as soon as they enter the app.

