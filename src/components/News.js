import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{ 
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (str)=> {
        // converting first letter to uppercase
        const capitalized = str.replace(/^./, str[0].toUpperCase());
        return capitalized;
    }
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=405c75fff9444f2a8e103dae8754b42d&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setPage(page + 1);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
    const updateNews = async(page)=>{
        props.setProgress(0);
        console.log(props.apiKey);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;   
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News Panda`;
        updateNews(page);
    }, []);
    
    // handleNclick = async () => {
        //     this.update(this.state.page + 1);
        //     this.setState({
            //         page: this.state.page + 1
            //     });
            //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=405c75fff9444f2a8e103dae8754b42d&page=${this.state.page+1}&pageSize=${props.pageSize}`;
            //     // this.setState({
                //     //     loading:true
                //     // })
    //     // let data=await fetch(url);
    //     // let parsedData= await data.json();
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     page:this.state.page+1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // });
    // }
    // handlePclick = async () => {
    //     this.update(this.state.page - 1);
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=405c75fff9444f2a8e103dae8754b42d&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //     // this.setState({
    //     //     loading:true
    //     // })
    //     // let data=await fetch(url);
    //     // let parsedData= await data.json();
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     page:this.state.page-1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // });
    // }
        console.log("this is render");
        return (
            <div>

                <h2 className="text-center" style={{ margin: '35px 0px',marginTop:'90px'}}>NewsPanda - Top headlines for {capitalizeFirstLetter(props.category)} category</h2>
                {loading&&<Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row">

                            {articles.map((element) => {
                                // console.log(element);
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={(element.title)} description={(element.description)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePclick}>&laquo;  Previous</button>
                    <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNclick}>Next  &raquo;</button>
                </div> */}
            </div>
        )
    }

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News