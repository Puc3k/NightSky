# NightSky - The application for generating night sky images
## General Info
The project is a React.js application for generating and sharing images of the night sky. The application utilizes AI technology to generate images based on parameters specified by the user.

## Features:
- Generating images based on specific parameters using AI
- Share your art with community

## Setup:
- Clone repository
- Install dependencies using ``npm install``
- Run development server:
```
cd server
npm run start
cd client
npm run dev
```

## How to use:
The user can enter their preferences, such as: star level, fog destiny, cloud cover and moon phase
and then click the Generate("Generuj") button to see some magic!
The user can also enter a custom prompt or generate  a random one.

Once the image is generated, the user can share it with the NightSky community by
clicking the share button.

## Components
The main components of the application are:
- CreatePost: Main component responsible for collecting information about user
  and generating image
- FormRadio: Component used to display radio options to the user. It can display
  a different number of columns depend of options provided
- FormSlider: Component used to display a slider, the user can adjust the values to
  set their preferences
- FormField: Component used to display a form field
- Loader: Component used to display a loading indicator when an image is generated

## API
The application uses two API endpoints:
- /api/v1/dalle: Used to generate an image based on user-specific parameters
- /api/v1/post: Used to post the generated image
