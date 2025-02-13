// Tech icons
import iconReact from "../assets/icons/React.svg";
import iconRuby from "../assets/icons/Ruby.svg";
import iconRails from "../assets/icons/Rails.svg";
import iconPostgres from "../assets/icons/PostgresSQL.svg";
import iconWebpack from "../assets/icons/Webpack.svg";
import iconSass from "../assets/icons/Sass.svg";
import iconHtml from "../assets/icons/HTML5.svg";
import iconCss from "../assets/icons/CSS3.svg";
import iconJs from "../assets/icons/JavaScript.svg";
import iconRedux from "../assets/icons/Redux.svg";
import iconMui from "../assets/icons/Mui.svg";
import iconFigma from "../assets/icons/Figma.svg";
import iconThreejs from "../assets/icons/threejs.svg";

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
};

const projects = () => {
  return [
    {
      title: "GimDev",
      description:
        "My personal web development blog is built using Rails, Hotwire, Stimulus, and Three.js, providing a dynamic",
      speed: 0.5,
      link: "https://gimdev-lingering-sun-6640.fly.dev/",
      tech: [
        techStack.Ruby,
        techStack.Rails,
        techStack.Postgres,
        techStack.Sass,
      ],
    },
    {
      title: "Memory",
      description:
        "React based browser game. The game tests players memory by randomly shuffling Pokemon card and asking them to click on each one only once.",
      speed: 0.5,
      link: "https://pokemon-theta-eosin.vercel.app/",
      tech: [
        techStack.Ruby,
        techStack.Rails,
        techStack.React,
        techStack.Postgres,
        techStack.Sass,
        techStack.Js,
        techStack.Css,
        techStack.Html,
        techStack.Mui,
      ],
    },
    {
      title: "Flyaway",
      description:
        "Inspired by Skyscanner and Google Flight Search, Flyaway is a flight search and booking app that allows users to find and book flights based on their departure and destination cities.",
      speed: 1,
      link: "https://flyaway-rails-react.fly.dev/",
      tech: [
        techStack.React,
        techStack.Js,
        techStack.Html,
        techStack.Css,
        techStack.Sass,
        techStack.Redux,
        techStack.Mui,
        techStack.Figma,
      ],
    },
    {
      title: "Odinbook",
      description:
        "Odinbook is a Ruby on Rails social media app that allows users to view profiles, create posts, and interact through comments, follows, and likes.",
      speed: 1,
      link: "https://theodinbook.fly.dev/",
      tech: [
        techStack.Html,
        techStack.Css,
        techStack.Sass,
        techStack.Rails,
        techStack.Ruby,
        techStack.Postgres,
        techStack.Figma,
        techStack.Three,
        techStack.Webpack,
      ],
    },
  ];
};
export default projects;
