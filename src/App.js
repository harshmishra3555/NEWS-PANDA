import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import News from './components/News'

const App =()=> {
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div> 
                <NavBar />
                <LoadingBar
                  color='#f11946'
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                />
              </div>
            }>
              <Route exact path="/" index element={<News setProgress={setProgress} apiKey={apiKey} key="general" country="us" pageSize={6} category="general" />} />
              <Route exact path="business" index element={<News setProgress={setProgress} apiKey={apiKey} key="business" country="us" pageSize={6} category="business" />} />
              <Route exact path="entertainment" index element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" country="us" pageSize={6} category="entertainment" />} />
              <Route exact path="general" index element={<News setProgress={setProgress} apiKey={apiKey} key="general" country="us" pageSize={6} category="general" />} />
              <Route exact path="health" index element={<News setProgress={setProgress} apiKey={apiKey} key="health" country="us" pageSize={6} category="health" />} />
              <Route exact path="science" index element={<News setProgress={setProgress} apiKey={apiKey} key="science" country="us" pageSize={6} category="science" />} />
              <Route exact path="sports" index element={<News setProgress={setProgress} apiKey={apiKey} key="sports" country="us" pageSize={6} category="sports" />} />
              <Route exact path="technology" index element={<News setProgress={setProgress} apiKey={apiKey} key="technology" country="us" pageSize={6} category="technology" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  export default App;