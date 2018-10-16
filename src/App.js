import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import './css/index.css';
const rpc = require('./rpc');
function scrapContent (domain) {
  document.getElementsByClassName("header")[0].style.display = "block";
  var gitrepos = document.getElementById("gitrepos");
  var resultTable = gitrepos.getElementsByClassName("resultTable");
  if (resultTable.length) {
    ReactDOM.unmountComponentAtNode(gitrepos);
  }
  rpc._rpc({
    method: "scrap_git_Data",
    data: {
      domain: domain,
    }
  }).then(function (res) {
    ReactDOM.render(<Table content = { res }/>, document.getElementById('gitrepos'));
  });
}
class SearchBtn extends Component {
  constructor(props) {
    super(props);
    this.searchName = this.searchName.bind(this);
  }
  searchName(e) {
    scrapContent(document.getElementsByClassName("searchInput")[0].value);
  }
  render() {
    return (<button onClick={ this.searchName } className="searchBtn">Search</button>);
  }
}
class SearcInput extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(e) {
    if (e.key === "Enter") {
      scrapContent(e.currentTarget.value);
    }
  }
  render() {
    return (<input autoFocus={ true } onKeyDown={ this.onSearch } className="searchInput" type="text"></input>);
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <SearcInput />
        <SearchBtn />
      </div>
    );
  }
}

export default App;
