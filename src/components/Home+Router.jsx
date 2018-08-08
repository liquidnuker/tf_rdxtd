// router with route config
// ======================================================/
import {HashRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

// route components
// ======================================================/

function Home({match}) {
  return (
  <div>   
    <h2>HomePage</h2>   
    <p>match.url: {match.url}</p>
  </div>
  )  
}

function About({match}) {
  return (
  <div>   
    <h2>About</h2>   
    <p>match.url: {match.url}</p>
  </div>
  )  
}

function Projects({ routes, match }) {
  return (
  <div>   
      <h2>Projects</h2>   
      <p>match.url: {match.url}</p>
      <ul>
        <li><Link to="/projects/subroute1">SubRoute1</Link></li>
      </ul>

      <switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}

      {/*temp redirect for invalid SubRoute. todo: SubRoute404*/}
      <Redirect to="/projects" />
      </switch>
      
    </div>
    )
}

function ProjectSub1({match}) {
  return (
    <div>    
      <p>ProjectSub1</p> 
      <p>match.url: {match.url}</p>
    </div>  
  );
}

function Contact ({ routes, match }) {
  return (
  <div>
    <h2>Contact</h2>
    <p>match.url: {match.url}</p>
    <ul>
      <li><Link to="/contact/subroute1">SubRoute1</Link></li>
      <li><Link to="/contact/subroute2">SubRoute2</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
  )
}

function ContactSub1({match}) {
  return (
    <div>    
      <p>ContactSub1</p> 
      <p>match.url: {match.url}</p>
    </div>  
  );
}

function ContactSub2({match}) {
  return (
    <div>    
      <p>ContactSub2</p> 
      <p>match.url: {match.url}</p>
    </div>  
  );
}

function Global404({match}) {
  return (
    <div>
      <p>global404</p>
    </div>
  );
}

// route config
// ======================================================/
const routes = [
  { path: '/about',
    component: About
  },
  { path: '/projects',
    component: Projects,
    routes: [
      { path: '/projects/subroute1',
        component: ProjectSub1
      }
    ]
  },
  { path: '/contact',
    component: Contact,
    routes: [
      { path: '/contact/subroute1',
        component: ContactSub1
      },
      { path: '/contact/SubRoute2',
        component: ContactSub2
      }
    ]
  },
  // { path: '/pt/:item',
  //   component: ParamTester1
  // }, 
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// ======================================================/
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

export default function Home_Router() {
  return(
    <Router>
    <div>
      <p>Main Linker</p>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/*<li><Link to="/pt/itemName1">ParamTester1</Link></li>*/}
      </ul>

      <Switch>
        {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
        ))}

        {/*for homepage exact path, redirect, global404*/}
        <Route exact path="/" component={Home}/>
        <Redirect from="/1111" to="/"/>
        <Route component={Global404}/>
      </Switch>

    </div>
  </Router>
  );
}

// ReactDOM.render(
//   <Home_Router />,
//   document.getElementById('root')
// );



