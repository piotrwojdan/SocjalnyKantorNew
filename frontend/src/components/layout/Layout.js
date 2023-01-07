import classes from './Layout.module.css'
import MainNavigation from "./MainNavigation"
import React from 'react';

//wydzielenie tego layout pozwala nam wyświetlać linki w nav bar
// a na dole wyświetlać listę postów zformatowąną za pomocą uniwersalnego layout
function Layout(props){
  return (<div>
    <MainNavigation/>
    <main className={classes.main}>{props.children}</main>
  </div>
  );
}

export default Layout;