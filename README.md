
## Week 1 Assignment: Flixster

Submitted by: **Tanya Chisepo**

Estimated time spent: **~24** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](ADD_LINK_HERE)

### Application Features

#### Core Features

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### Stretch Features

- [x] Deploy website using GitHub Pages.
- [x] Allow user to view more details about a movie within a popup.
- [ ] Improve the user experience through CSS & animation.
- [ ] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [ ] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

<img src="https://github.com/Talia04/flixster-project/raw/main/FlixsterWalkthrough.gif" alt="Flixster Walkthrough" width="100%">


### Reflection

- Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I found the giphy lab to be very helpful since I used what I learned about APIs to help me complete my project. I had to build on the little I learnt on that lab which esseantially got me started on the FLixster project. Also, the mini demo on git really helped a lot as well, because I was able to do all my commits and code pushes based off of the quick session on using git on the terminal

- If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
-I would have gone on to add functionality that would allow the user to click on a movie card to view additional info about a movie while clearing the display of other movies. The user would also be able to exit out of the selected movie and go back to the rest of the movies, essentially picking up where they left off
-I would also go on to allow user to pick movie categories
Another, possibly more complicated functionality would be to allow filtered against different criteria such as votes, release date etc

- Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Add your response here
-I think my implementation of the core features went well. I managed to display a list of movies,load more movies, search movies using a keyword, exit out of the search and return to original movie display. I was also able to add a display pop-up for the movie description that appears when a user hovers over a movie cars for about 3 seconds. I think there is still lots of room for improvement on that feature, concerning the way it appears in the UI and its positioning. Overally, the UI looks ok, but some elements may need further polishing, such as the Search button and the search input box. 


### Open-source libraries used

- ChatGPT for most questions
- W3Schools website

### Shout out

I distinctly remember Diogo helped me twice to fix bugs in my code when it was not working as intended
I got help from several of my peers but it is hard to remember who helped with what exactly. Most of us were working collaboratively. I vaguely remember Daniel helping me out with the API key for the movies, Emmanuella helped me with hosting my page using github pages, and for the most part, some of my peers helped me answer some quick questions that helped me complete this project