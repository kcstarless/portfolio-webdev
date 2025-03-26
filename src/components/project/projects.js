// Project images
import imageWeather from "../../assets/project_images/umbrella.png";
import imageOdinbook from "../../assets/project_images/odinbook.png";
import imageBattleship from "../../assets/project_images/battleship.png";
import imageFlyaway from "../../assets/project_images/flyaway.png";
import imagePokemon from "../../assets/project_images/pokemon.png";
import imageGimdev from "../../assets/project_images/gimdev.png";

// Thumb images
import thumbFlyaway from "../../assets/project_images/flyaway_thumb.png";
import thumbOdinbook from "../../assets/project_images/odinbook_thumb.png";
import thumbUmbrella from "../../assets/project_images/umbrella_thumb.png";
import thumbBattleship from "../../assets/project_images/battleship_thumb.png";
import thumbPokemon from "../../assets/project_images/pokemon_thumb.png";
import thumbGimdev from "../../assets/project_images/gimdev_thumb.png";

// Tech icons
import iconReact from "../../assets/icons/React.svg";
import iconRuby from "../../assets/icons/Ruby.svg";
import iconRails from "../../assets/icons/Rails.svg";
import iconPostgres from "../../assets/icons/PostgresSQL.svg";
import iconWebpack from "../../assets/icons/Webpack.svg";
import iconSass from "../../assets/icons/Sass.svg";
import iconHtml from "../../assets/icons/HTML5.svg";
import iconCss from "../../assets/icons/CSS3.svg";
import iconJs from "../../assets/icons/JavaScript.svg";
import iconRedux from "../../assets/icons/Redux.svg";
import iconMui from "../../assets/icons/Mui.svg";
import iconFigma from "../../assets/icons/Figma.svg";
import iconThreejs from "../../assets/icons/threejs.svg";
import iconStimulus from "../../assets/icons/Stimulus.png";

// Current Project Images
import kcmDesign from "../../assets/project_images/kcm_design.png";

const techStack = {
  React: { icon: iconReact, name: "React" },
  Ruby: { icon: iconRuby, name: "Ruby" },
  Rails: { icon: iconRails, name: "Rails" },
  Postgres: { icon: iconPostgres, name: "Postgres" },
  Webpack: { icon: iconWebpack, name: "Webpack" },
  Sass: { icon: iconSass, name: "SASS" },
  Html: { icon: iconHtml, name: "HTML" },
  Css: { icon: iconCss, name: "CSS" },
  Js: { icon: iconJs, name: "JavaScript" },
  Redux: { icon: iconRedux, name: "Redux" },
  Mui: { icon: iconMui, name: "Material UI" },
  Figma: { icon: iconFigma, name: "Figma" },
  Three: { icon: iconThreejs, name: "Three.js" },
  Stimulus: { icon: iconStimulus, name: "Stimulus" },
};

//** Project file containing all the projects and it's details */

const projects = () => {
  return [
    {
      id: 1,
      year: 2023,
      name: "UMBRELLA",
      short: "Real-time weather data",
      tech_stack: [
        techStack.React,
        techStack.Js,
        techStack.Html,
        techStack.Css,
        techStack.Sass,
      ],
      site_link: "https://kcstarless.github.io/weather-app/",
      github_link: "https://github.com/kcstarless/weather-app",
      image: imageWeather,
      thumb: thumbUmbrella,
      description:
        "The Weather Umbrella project is a JavaScript app that uses the Visual Crossing API to display real-time weather data. It employs async functions for efficient API calls and processes JSON data to show weather forecasts. The app is built with reusable components for scalability and robustness.",
    },

    {
      id: 2,
      year: 2024,
      name: "BATTLESHIP",
      short: "Classic board game",
      tech_stack: [techStack.Js, techStack.Html, techStack.Css],
      site_link: "https://kcstarless.github.io/battleship/",
      github_link: "https://github.com/kcstarless/battleship",
      image: imageBattleship,
      thumb: thumbBattleship,
      description:
        "The Battleship project is a JavaScript game that recreates the classic Battleship board game. Players place ships on a grid and take turns firing missiles to sink each other's ships. It features a responsive design, real-time updates, and showcases object-oriented programming, event handling, and DOM manipulation.",
    },

    {
      id: 3,
      year: 2024,
      name: "POKEMON",
      short: "Memory game",
      tech_stack: [
        techStack.React,
        techStack.Js,
        techStack.Html,
        techStack.Css,
        techStack.Sass,
        techStack.Redux,
        techStack.Mui,
        techStack.Figma,
      ],
      site_link: "https://pokemon-theta-eosin.vercel.app/",
      github_link: "https://github.com/kcstarless/pokemon",
      image: imagePokemon,
      thumb: thumbPokemon,
      description:
        "React based browser game. The game tests players memory by randomly shuffling Pokemon card and asking them to click on each one only once. The game keeps track of the player's current and best score. The project demonstrates the use of React components, state management, event handling and CSS to create an interactive and engaging user experience.",
    },

    {
      id: 4,
      year: 2023,
      name: "ODINBOOK",
      short: "Social media app",
      tech_stack: [
        techStack.Ruby,
        techStack.Rails,
        techStack.Postgres,
        techStack.Stimulus,
        techStack.Sass,
        techStack.Html,
        techStack.Css,
        techStack.Js,
      ],
      site_link: "https://theodinbook.fly.dev",
      github_link: "https://theodinbook.fly.dev",
      image: imageOdinbook,
      thumb: thumbOdinbook,
      description:
        "Odinbook is a Ruby on Rails social media app that allows users to view profiles, create posts, and interact through comments, follows, and likes. It uses OmniAuth and Devise for authentication, Active Record for database interactions, and Turbo and Stimulus for dynamic UI updates. Mailer handles notifications, and SASS ensures a modern, responsive design.",
    },

    {
      id: 5,
      year: 2025,
      name: "GIMDEV",
      short: "Personal blog site",
      tech_stack: [
        techStack.Html,
        techStack.Css,
        techStack.Sass,
        techStack.Rails,
        techStack.Stimulus,
        techStack.Ruby,
        techStack.Postgres,
        techStack.Figma,
        techStack.Three,
        techStack.Webpack,
      ],
      site_link: "https://gimdev-lingering-sun-6640.fly.dev/",
      github_link: "https://github.com/kcstarless/gimdev",
      image: imageGimdev,
      thumb: thumbGimdev,
      description:
        "My personal web development blog is built using Rails, Hotwire, Stimulus, and Three.js, providing a dynamic, interactive platform where users can create, update, and delete posts. The site features authentication, ensuring that only authorized users can manage their content. I specifically wanted to experiment with Three.js for 3D rendering on the web, adding an immersive visual element to the blog. This project not only allows me to share my thoughts and experiences but also helps me track my progress in learning web development, especially with new technologies like Three.js.",
    },

    {
      id: 6,
      year: 2024,
      name: "FLYAWAY",
      short: "Real-time flight booking",
      tech_stack: [
        techStack.Ruby,
        techStack.Rails,
        techStack.React,
        techStack.Postgres,
        techStack.Stimulus,
        techStack.Sass,
        techStack.Js,
        techStack.Css,
        techStack.Html,
        techStack.Mui,
      ],
      site_link: "https://flyaway-rails-react.fly.dev/",
      github_link: "https://github.com/kcstarless/flyaway",
      image: imageFlyaway,
      thumb: thumbFlyaway,
      description:
        "Inspired by Skyscanner and Google Flight Search, Flyaway is a flight search and booking app that allows users to find and book flights based on their departure and destination cities. The app utilizes the Amadeus API to fetch real-time flight data, presenting the results in a clean and user-friendly format. Users can filter flights by price, airline, and departure time, and view detailed flight information. Flyaway combines a Ruby on Rails API backend with a React frontend to deliver a seamless experience for flight search and booking.",
    },

    {
      id: 7,
      year: 2025,
      name: "King Charles Market",
      type: "Informational & E-commerce",
      details: `Reimagining the Queen Victoria Market website by preserving its original content and functionality while infusing it with a fresh, modern design. Although I've completed several projects before, none ever felt truly complete—this project is my chance to build a fully featured, polished experience. Inspired by Canal Street Market by Zeor.nyc, I'm adopting a similar design aesthetic for QVM.
              
              I've chosen to build this on Ruby on Rails 8 with Turbo and Stimulus. Initially, I considered NEXT.js and React.js, but I felt that the project didn't require heavy state management or intensive user interactions. Instead, I opted for a simple, single-stack solution. Turbo and Stimulus offer just the right amount of JavaScript for smooth, responsive interactions, while Rails provides a solid backbone and of course, my goto SASS rounds out the stack.`,
      goal: "This is the proejct goal",
      design: "Multiple color design with accordion type menu",
      images: [kcmDesign],
      challenges: "This is the project challenges",
      keyFeatures: "This is the project key features",
      outcome: "This is the project outcome",
      duration: "20 hours in develpment",
      tech_stack: [
        techStack.Ruby,
        techStack.Rails,
        techStack.Postgres,
        techStack.Sass,
        techStack.Stimulus,
        techStack.Html,
      ],
      site_link: "https://kingcharlesmarket.herokuapp.com/",
      github_link: "https://github.com/kcstarless/flyaway",
      image: imageFlyaway,
      thumb: thumbFlyaway,
      description:
        "King Charles Market is a Ruby on Rails e-commerce site that allows users to buy and sell products. It features a user-friendly interface for browsing products, adding items to a shopping cart, and checking out. Users can create accounts, manage their profiles, and view order history. The site uses Active Record for database interactions, SASS for styling, and Stimulus for dynamic UI updates. The project showcases my skills in full-stack web development, including front-end design, back-end logic, and database management.",
    },
  ];
};

export default projects;
