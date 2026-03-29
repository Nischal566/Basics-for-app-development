import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Code2, Smartphone, Zap, BookOpen, Link as LinkIcon, CheckCircle2, Circle, FileText } from "lucide-react";
import { useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { useNotes } from "@/contexts/NotesContext";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { NotesEditor } from "@/components/NotesEditor";
import { NotesDashboard } from "@/components/NotesDashboard";

interface Week {
  number: number;
  title: string;
  description: string;
  topics: string[];
  project: string;
  software: { name: string; url: string }[];
  youtubeChannels: { name: string; videos: string; url: string }[];
  websites: { name: string; url: string }[];
}

const month1Weeks: Week[] = [
  {
    number: 1,
    title: "HTML Basics",
    description: "Learn core tags, document structure, semantic HTML, and forms. Master the foundational building blocks of web pages.",
    topics: ["HTML tags", "Document structure", "Lists & forms", "Semantic HTML"],
    project: "Bio page with name, photo, hobbies, and social links",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Google Chrome", url: "google.com/chrome" },
      { name: "Notepad++", url: "notepad-plus-plus.org" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "HTML Crash Course (1 hour)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "HTML Basics playlist (3 hours)", url: "youtube.com/@NetNinja" },
      { name: "freeCodeCamp", videos: "HTML Full Course (2 hours)", url: "youtube.com/@freecodecamp" },
    ],
    websites: [
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "W3Schools", url: "w3schools.com/html" },
      { name: "HTML.com", url: "html.com" },
    ],
  },
  {
    number: 2,
    title: "CSS Styling",
    description: "Master selectors, colors, typography, box model, and hover effects. Transform plain HTML into visually appealing pages.",
    topics: ["CSS selectors", "Colors & fonts", "Box model", "Hover effects"],
    project: "Style your Week 1 bio page with cohesive design",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Chrome DevTools", url: "Built into Chrome" },
      { name: "Google Fonts", url: "fonts.google.com" },
      { name: "Coolors.co", url: "coolors.co" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "CSS Crash Course (1.5 hours)", url: "youtube.com/@TraversyMedia" },
      { name: "Kevin Powell", videos: "Learn CSS series (4 hours)", url: "youtube.com/@KevinPowell" },
      { name: "The Net Ninja", videos: "CSS Basics (3 hours)", url: "youtube.com/@NetNinja" },
    ],
    websites: [
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS-Tricks", url: "css-tricks.com" },
      { name: "W3Schools CSS", url: "w3schools.com/css" },
    ],
  },
  {
    number: 3,
    title: "CSS Layouts & Responsive Design",
    description: "Learn Flexbox, CSS Grid, media queries, and responsive design. Create flexible layouts that adapt to any screen size.",
    topics: ["Flexbox", "CSS Grid", "Media queries", "CSS variables"],
    project: "6-card responsive grid (3 cols desktop, 2 tablet, 1 mobile)",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Chrome DevTools", url: "Built into Chrome" },
      { name: "Responsively App", url: "responsively.app" },
      { name: "CSS Grid Generator", url: "cssgrid-generator.netlify.app" },
    ],
    youtubeChannels: [
      { name: "Kevin Powell", videos: "CSS Grid Crash Course (2 hours)", url: "youtube.com/@KevinPowell" },
      { name: "Traversy Media", videos: "Flexbox (20 minutes)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "Responsive Design (3 hours)", url: "youtube.com/@NetNinja" },
    ],
    websites: [
      { name: "CSS-Tricks", url: "css-tricks.com/snippets/css/complete-guide-grid" },
      { name: "Flexbox Froggy", url: "flexboxfroggy.com" },
      { name: "Grid Garden", url: "cssgridgarden.com" },
    ],
  },
  {
    number: 4,
    title: "Git & Portfolio Launch",
    description: "Version control with Git and deploy via GitHub Pages. Share your work with the world and start building your portfolio.",
    topics: ["Git basics", "GitHub setup", "GitHub Pages", "Deployment"],
    project: "Live portfolio URL on GitHub Pages",
    software: [
      { name: "Git", url: "git-scm.com" },
      { name: "GitHub Desktop", url: "desktop.github.com" },
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "GitKraken", url: "gitkraken.com" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "Git & GitHub Crash Course (1 hour)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "Git & GitHub Tutorial (2 hours)", url: "youtube.com/@NetNinja" },
      { name: "freeCodeCamp", videos: "Git for Beginners (1.5 hours)", url: "youtube.com/@freecodecamp" },
    ],
    websites: [
      { name: "GitHub Docs", url: "docs.github.com" },
      { name: "Pro Git Book", url: "git-scm.com/book" },
      { name: "GitHub Learning Lab", url: "lab.github.com" },
    ],
  },
];

const month2Weeks: Week[] = [
  {
    number: 5,
    title: "JavaScript Fundamentals",
    description: "Variables, data types, operators, loops, and functions. Learn the core language concepts essential for every JavaScript developer.",
    topics: ["Variables", "Data types", "Operators", "Loops", "Functions"],
    project: "Celsius converter, even/odd checker, FizzBuzz challenge",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Node.js", url: "nodejs.org" },
      { name: "Chrome DevTools", url: "Built into Chrome" },
      { name: "JSFiddle", url: "jsfiddle.net" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "JavaScript Crash Course (1.5 hours)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "JavaScript Basics (4 hours)", url: "youtube.com/@NetNinja" },
      { name: "Akshay Saini", videos: "Namaste JavaScript (10+ hours)", url: "youtube.com/@akshaymarch7" },
    ],
    websites: [
      { name: "JavaScript.info", url: "javascript.info" },
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Eloquent JavaScript", url: "eloquentjavascript.net" },
    ],
  },
  {
    number: 6,
    title: "DOM Manipulation",
    description: "Select elements, change content, modify styles, and handle events. The DOM is the bridge between JavaScript and HTML.",
    topics: ["DOM selectors", "Content changes", "Event listeners", "Dynamic updates"],
    project: "Interactive color changer with click counter",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Chrome DevTools", url: "Built into Chrome" },
      { name: "Live Server", url: "marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "DOM Manipulation (1 hour)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "DOM Manipulation (2 hours)", url: "youtube.com/@NetNinja" },
      { name: "Web Dev Simplified", videos: "DOM Crash Course (30 minutes)", url: "youtube.com/@WebDevSimplified" },
    ],
    websites: [
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
      { name: "JavaScript.info", url: "javascript.info/dom-nodes" },
      { name: "W3Schools", url: "w3schools.com/js/js_htmldom.asp" },
    ],
  },
  {
    number: 7,
    title: "Arrays, Objects & Fetch API",
    description: "Work with data structures and fetch real data from APIs. Learn JSON, async/await, and how to integrate external data.",
    topics: ["Arrays & objects", "JSON", "Fetch API", "Async/await"],
    project: "Weather card or joke app using free public APIs",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Postman", url: "postman.com" },
      { name: "JSONPlaceholder", url: "jsonplaceholder.typicode.com" },
      { name: "OpenWeather API", url: "openweathermap.org" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "Fetch API Crash Course (30 minutes)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "Async JavaScript (2 hours)", url: "youtube.com/@NetNinja" },
      { name: "Web Dev Simplified", videos: "Fetch API Explained (15 minutes)", url: "youtube.com/@WebDevSimplified" },
    ],
    websites: [
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
      { name: "JavaScript.info", url: "javascript.info/async" },
      { name: "Public APIs", url: "github.com/public-apis/public-apis" },
    ],
  },
  {
    number: 8,
    title: "Month 2 Final Project",
    description: "Build a fully functional to-do list or calculator app. Combine all JavaScript skills to create a complete application.",
    topics: ["Project planning", "Feature implementation", "Testing", "Deployment"],
    project: "Interactive To-Do List or Calculator with localStorage",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Chrome DevTools", url: "Built into Chrome" },
      { name: "GitHub", url: "github.com" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "JavaScript To-Do List App (1 hour)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "JavaScript Projects (3 hours)", url: "youtube.com/@NetNinja" },
      { name: "Web Dev Simplified", videos: "Build a Calculator (30 minutes)", url: "youtube.com/@WebDevSimplified" },
    ],
    websites: [
      { name: "GitHub", url: "github.com" },
      { name: "MDN Web Docs", url: "developer.mozilla.org" },
      { name: "Stack Overflow", url: "stackoverflow.com" },
    ],
  },
];

const month3Weeks: Week[] = [
  {
    number: 9,
    title: "React Basics (Web Path)",
    description: "JSX, components, props, state, and useEffect hooks. React is a JavaScript library for building interactive user interfaces.",
    topics: ["JSX syntax", "Components", "Props", "State management", "Hooks"],
    project: "Simple counter app with increment/decrement buttons",
    software: [
      { name: "Node.js", url: "nodejs.org" },
      { name: "Create React App", url: "create-react-app.dev" },
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "React DevTools", url: "chrome.google.com/webstore" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "React Crash Course (1.5 hours)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "React Tutorial (4 hours)", url: "youtube.com/@NetNinja" },
      { name: "Web Dev Simplified", videos: "React Hooks Explained (15 minutes)", url: "youtube.com/@WebDevSimplified" },
    ],
    websites: [
      { name: "React Official Docs", url: "react.dev" },
      { name: "MDN Web Docs", url: "developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React" },
      { name: "Scrimba", url: "scrimba.com/learn/react" },
    ],
  },
  {
    number: 10,
    title: "Flutter Basics (Mobile Path)",
    description: "Widgets, stateless/stateful components, and state management. Flutter is Google's framework for building beautiful mobile apps.",
    topics: ["Widgets", "Build method", "setState", "Layout widgets", "Material Design"],
    project: "Simple counter or BMI calculator app",
    software: [
      { name: "Flutter SDK", url: "flutter.dev" },
      { name: "Android Studio", url: "developer.android.com/studio" },
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Xcode", url: "App Store" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "Flutter Crash Course (1.5 hours)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "Flutter Tutorial (4 hours)", url: "youtube.com/@NetNinja" },
      { name: "Rivaan Ranawat", videos: "Flutter App Development (2+ hours)", url: "youtube.com/@RivaanRanawat" },
    ],
    websites: [
      { name: "Flutter Official Docs", url: "flutter.dev/docs" },
      { name: "Dart Official Docs", url: "dart.dev/guides" },
      { name: "Pub.dev", url: "pub.dev" },
    ],
  },
  {
    number: 11,
    title: "Capstone Project - Part 1",
    description: "Build a polished, feature-complete application. Choose from quiz apps, movie search, habit trackers, or BMI calculators.",
    topics: ["Advanced patterns", "API integration", "State management", "Testing"],
    project: "Quiz App, Movie Search, Habit Tracker, or BMI Calculator",
    software: [
      { name: "Visual Studio Code", url: "code.visualstudio.com" },
      { name: "Android Studio", url: "developer.android.com/studio" },
      { name: "GitHub", url: "github.com" },
      { name: "Vercel", url: "vercel.com" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "React Project Tutorial (2+ hours)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "React Projects (4+ hours)", url: "youtube.com/@NetNinja" },
      { name: "Rivaan Ranawat", videos: "Flutter Projects (3+ hours)", url: "youtube.com/@RivaanRanawat" },
    ],
    websites: [
      { name: "GitHub", url: "github.com" },
      { name: "Stack Overflow", url: "stackoverflow.com" },
      { name: "MDN Web Docs", url: "developer.mozilla.org" },
    ],
  },
  {
    number: 12,
    title: "Capstone Project - Part 2 & Deployment",
    description: "Complete your capstone project, test thoroughly, and deploy to production. Add to your portfolio.",
    topics: ["Testing & debugging", "Performance optimization", "Deployment", "Portfolio addition"],
    project: "Deploy to GitHub Pages (React) or App Store (Flutter)",
    software: [
      { name: "GitHub", url: "github.com" },
      { name: "Vercel", url: "vercel.com" },
      { name: "Google Play Store", url: "play.google.com" },
      { name: "Apple App Store", url: "apps.apple.com" },
    ],
    youtubeChannels: [
      { name: "Traversy Media", videos: "Deployment Guide (1 hour)", url: "youtube.com/@TraversyMedia" },
      { name: "The Net Ninja", videos: "Deployment (1.5 hours)", url: "youtube.com/@NetNinja" },
      { name: "freeCodeCamp", videos: "Deployment Strategies (2 hours)", url: "youtube.com/@freecodecamp" },
    ],
    websites: [
      { name: "Vercel Docs", url: "vercel.com/docs" },
      { name: "GitHub Pages", url: "pages.github.com" },
      { name: "Google Play Console", url: "play.google.com/console" },
    ],
  },
];

const month4Weeks: Week[] = [
  {
    number: 13,
    title: "Blender Basics & Interface",
    description: "Navigation, object manipulation, and basic scene creation. Blender is a free, professional 3D modeling and animation software.",
    topics: ["Viewport navigation", "Object/Edit mode", "Transformations", "Adding objects"],
    project: "Simple 3D room scene with basic shapes",
    software: [
      { name: "Blender", url: "blender.org" },
      { name: "Blender Manual", url: "docs.blender.org" },
    ],
    youtubeChannels: [
      { name: "Blender Guru", videos: "Blender Beginner Series (2 hours)", url: "youtube.com/@BlenderGuru" },
      { name: "CG Geek", videos: "Blender for Beginners (1.5 hours)", url: "youtube.com/@CGGeek" },
      { name: "Default Cube", videos: "Blender Tips (1+ hour)", url: "youtube.com/@DefaultCube" },
    ],
    websites: [
      { name: "Blender Official", url: "blender.org" },
      { name: "Blender Manual", url: "docs.blender.org" },
      { name: "Blender Artists", url: "blenderartists.org" },
      { name: "Poly Haven", url: "polyhaven.com" },
    ],
  },
  {
    number: 14,
    title: "Modelling & Shading",
    description: "Advanced modeling, UV unwrapping, and materials. Create detailed objects and apply materials for realistic surfaces.",
    topics: ["Edit mode tools", "Proportional editing", "UV unwrapping", "Materials & textures"],
    project: "Stylized product model (headphones, bottle, or sneaker)",
    software: [
      { name: "Blender", url: "blender.org" },
      { name: "Poly Haven", url: "polyhaven.com" },
      { name: "Substance Painter", url: "substance3d.adobe.com" },
    ],
    youtubeChannels: [
      { name: "Blender Guru", videos: "Modeling Tutorial (2 hours)", url: "youtube.com/@BlenderGuru" },
      { name: "CG Geek", videos: "Shading Tutorial (1.5 hours)", url: "youtube.com/@CGGeek" },
      { name: "Grant Abbitt", videos: "Hard-Surface Modeling (2+ hours)", url: "youtube.com/@GrantAbbitt" },
    ],
    websites: [
      { name: "Blender Manual", url: "docs.blender.org" },
      { name: "Poly Haven", url: "polyhaven.com" },
      { name: "Blender Artists", url: "blenderartists.org" },
    ],
  },
  {
    number: 15,
    title: "Lighting, Camera & Rendering",
    description: "Professional lighting setups and high-quality rendering. Master three-point lighting and camera techniques.",
    topics: ["Three-point lighting", "Camera settings", "Render engines", "Output settings"],
    project: "Professional product render with three-point lighting",
    software: [
      { name: "Blender", url: "blender.org" },
      { name: "Poly Haven", url: "polyhaven.com" },
    ],
    youtubeChannels: [
      { name: "Blender Guru", videos: "Lighting Tutorial (1.5 hours)", url: "youtube.com/@BlenderGuru" },
      { name: "CG Geek", videos: "Rendering (1 hour)", url: "youtube.com/@CGGeek" },
      { name: "Default Cube", videos: "Professional Lighting (1+ hour)", url: "youtube.com/@DefaultCube" },
    ],
    websites: [
      { name: "Blender Manual", url: "docs.blender.org" },
      { name: "Poly Haven", url: "polyhaven.com" },
    ],
  },
  {
    number: 16,
    title: "Animation & Final Portfolio Piece",
    description: "Create a polished 10-second product showcase animation. Bring your 3D models to life with professional motion graphics.",
    topics: ["Timeline & keyframes", "Graph Editor", "Camera animation", "Video export"],
    project: "10-second product animation with camera movement and text",
    software: [
      { name: "Blender", url: "blender.org" },
      { name: "FFmpeg", url: "ffmpeg.org" },
    ],
    youtubeChannels: [
      { name: "Blender Guru", videos: "Animation Tutorial (2 hours)", url: "youtube.com/@BlenderGuru" },
      { name: "CG Geek", videos: "Motion Graphics (1.5 hours)", url: "youtube.com/@CGGeek" },
      { name: "Default Cube", videos: "Animation Tips (1+ hour)", url: "youtube.com/@DefaultCube" },
    ],
    websites: [
      { name: "Blender Manual", url: "docs.blender.org" },
      { name: "FFmpeg", url: "ffmpeg.org/documentation.html" },
    ],
  },
];

function WeekCard({ week }: { week: Week }) {
  const [expanded, setExpanded] = useState(false);
  const { isWeekCompleted, toggleWeekCompletion } = useProgress();
  const completed = isWeekCompleted(week.number);

  return (
    <Card className={`transition-all ${completed ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-600/50' : 'bg-slate-900 border-slate-700'} cursor-pointer hover:border-blue-600`}
      onClick={() => setExpanded(!expanded)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWeekCompletion(week.number);
                }}
                className="flex-shrink-0 mt-1"
              >
                {completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-600 hover:text-slate-400" />
                )}
              </button>
              <div>
                <CardTitle className={`text-white ${completed ? 'line-through opacity-75' : ''}`}>
                  Week {week.number}: {week.title}
                </CardTitle>
                <CardDescription className="text-slate-400">{week.description}</CardDescription>
              </div>
            </div>
          </div>
          <ChevronRight className={`h-5 w-5 text-blue-400 transition-transform flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6 border-t border-slate-700 pt-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Topics Covered</h4>
            <div className="flex flex-wrap gap-2">
              {week.topics.map((topic) => (
                <span key={topic} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Hands-On Project</h4>
            <p className="text-slate-300 bg-slate-800 p-3 rounded border border-slate-700">{week.project}</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4" /> Recommended Software
            </h4>
            <div className="space-y-2">
              {week.software.map((soft) => (
                <a key={soft.name} href={`https://${soft.url}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors group">
                  <span className="text-slate-300 group-hover:text-white">{soft.name}</span>
                  <LinkIcon className="h-4 w-4 text-slate-600 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> YouTube Channels
            </h4>
            <div className="space-y-2">
              {week.youtubeChannels.map((channel) => (
                <a key={channel.name} href={`https://${channel.url}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors group">
                  <div>
                    <div className="text-slate-300 group-hover:text-white font-medium">{channel.name}</div>
                    <div className="text-xs text-slate-500">{channel.videos}</div>
                  </div>
                  <LinkIcon className="h-4 w-4 text-slate-600 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <LinkIcon className="h-4 w-4" /> Learning Websites
            </h4>
            <div className="space-y-2">
              {week.websites.map((site) => (
                <a key={site.name} href={`https://${site.url}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors group">
                  <span className="text-slate-300 group-hover:text-white">{site.name}</span>
                  <LinkIcon className="h-4 w-4 text-slate-600 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/20">
                  <Zap className="h-4 w-4" />
                  4 Months • 16 Weeks • 100% Free
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  Master App Development in 4 Months
                </h1>
                <p className="text-xl text-slate-300">
                  A comprehensive, structured curriculum for NEB Class 12 students. Learn web development, mobile development, and 3D design with real projects and industry resources.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Download PDF
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-400">16</div>
                  <div className="text-sm text-slate-400">Weeks</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-sm text-slate-400">Projects</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-400">3</div>
                  <div className="text-sm text-slate-400">Paths</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">Web Development</div>
                      <div className="text-sm text-slate-400">HTML, CSS, JavaScript, React</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Mobile Development</div>
                      <div className="text-sm text-slate-400">Flutter, Dart, App Deployment</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-orange-400" />
                    <div>
                      <div className="font-semibold text-white">3D Design</div>
                      <div className="text-sm text-slate-400">Blender, Modeling, Animation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Dashboard Toggle */}
      <section className="px-4 py-6 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="mx-auto max-w-6xl">
          <Button
            onClick={() => setShowDashboard(!showDashboard)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {showDashboard ? 'Hide Progress Dashboard' : 'View Progress Dashboard'}
          </Button>
        </div>
      </section>

      {/* Progress Dashboard */}
      {showDashboard && (
        <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-transparent border-b border-slate-700">
          <div className="mx-auto max-w-6xl">
            <ProgressDashboard />
          </div>
        </section>
      )}

      {/* Roadmap Overview */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-12">Your Learning Path</h2>

          <Tabs defaultValue="month1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-900 border border-slate-700">
              <TabsTrigger value="month1" className="data-[state=active]:bg-blue-600">
                Month 1
              </TabsTrigger>
              <TabsTrigger value="month2" className="data-[state=active]:bg-blue-600">
                Month 2
              </TabsTrigger>
              <TabsTrigger value="month3" className="data-[state=active]:bg-blue-600">
                Month 3
              </TabsTrigger>
              <TabsTrigger value="month4" className="data-[state=active]:bg-blue-600">
                Month 4
              </TabsTrigger>
            </TabsList>

            <TabsContent value="month1" className="space-y-4 mt-8">
              <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-600/20 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">HTML & CSS - Building the Visual Web</h3>
                <p className="text-slate-300">Learn the foundation of web development with semantic HTML and modern CSS techniques.</p>
              </div>
              <div className="space-y-3">
                {month1Weeks.map((week) => (
                  <WeekCard key={week.number} week={week} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="month2" className="space-y-4 mt-8">
              <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">JavaScript - Making Things Interactive</h3>
                <p className="text-slate-300">Master the language of the web and build interactive applications with real data.</p>
              </div>
              <div className="space-y-3">
                {month2Weeks.map((week) => (
                  <WeekCard key={week.number} week={week} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="month3" className="space-y-4 mt-8">
              <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-600/20 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">React or Flutter - Building Modern Apps</h3>
                <p className="text-slate-300">Choose your path: web with React or mobile with Flutter. Build complete applications.</p>
              </div>
              <div className="space-y-3">
                {month3Weeks.map((week) => (
                  <WeekCard key={week.number} week={week} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="month4" className="space-y-4 mt-8">
              <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-600/20 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">3D Graphic Design - Blender</h3>
                <p className="text-slate-300">Create professional 3D models, animations, and visualizations from scratch.</p>
              </div>
              <div className="space-y-3">
                {month4Weeks.map((week) => (
                  <WeekCard key={week.number} week={week} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/5 to-purple-600/5 border-y border-slate-700">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="text-lg text-slate-300">
            This roadmap provides everything you need to master app development. All resources are free. All you need is consistency and dedication.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Download Full Roadmap (PDF)
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600">
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Curriculum</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Month 1: HTML & CSS</a></li>
                <li><a href="#" className="hover:text-blue-400">Month 2: JavaScript</a></li>
                <li><a href="#" className="hover:text-blue-400">Month 3: React/Flutter</a></li>
                <li><a href="#" className="hover:text-blue-400">Month 4: Blender</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">YouTube Channels</a></li>
                <li><a href="#" className="hover:text-blue-400">Learning Websites</a></li>
                <li><a href="#" className="hover:text-blue-400">Software Tools</a></li>
                <li><a href="#" className="hover:text-blue-400">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400">Troubleshooting</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>App Development Roadmap Pro © 2026 • All resources are free and open-source</p>
            <p className="mt-2">Reading this roadmap already puts you ahead of 95% of your peers. Now it's time to build.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
