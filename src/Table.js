import React, { Component } from 'react';
class Ul extends Component {
  constructor(props) {
    super(props);
    this.uls = props.uls;
    this.onUlClicked = this.onUlClicked.bind(this);
  }
  onUlClicked (e) {
    window.open(e.currentTarget.dataset.url);
  }
  render() {
    const uls = this.uls;
    const len = uls.length > 10 ? 10 : uls.length;
    const allUls = [];
    for (var i = 0; i < len; i++) {
      var url = JSON.parse(this.uls[i].querySelector("h3 a").dataset.hydroClick).payload.result.url;
      allUls.push(<ul data-url = { url } onClick =  { this.onUlClicked } key = { i } > <Li index= { i } ele = { uls[i].querySelector('div') } /> </ul>)
    }
    return (
      <div className="resultTable"> { allUls } </div>
    );
  }
}
class Li extends Component {
  constructor(props) {
    super(props);
    this.ele = props.ele;
    this.index = props.index;
    this.splited = props.ele.querySelector("h3").innerText.split("/");
    this.ownerName = this.splited[0];
    this.projectName = this.splited[1];
    this.description = props.ele.querySelector("p").innerText;
    this.lastUpdated = props.ele.querySelector("relative-time").innerText;
    this.indexStyle = {
      w: {
        width: "20px",
      }
    };
  }
  render() {
    return (
      <span>
        <li style = { this.indexStyle.w }> { this.index + 1 } </li>
        <li> { this.projectName } </li>
        <li> { this.ownerName } </li>
        <li> { this.description } </li>
        <li> { this.lastUpdated } </li>
      </span>
    );
  }
}
function Tablecontent(ele) {
  var uls = ele.ele.querySelectorAll(".repo-list > div");
  return (
    <Ul uls = { uls } />
  );
}
class Table extends Component {
  constructor(props) {
    super(props);
    this.body = new DOMParser().parseFromString(props.content, 'text/html');
  }
  render() {
    return (
      <Tablecontent ele = { this.body }/>
    );
  }
}

export default Table;
