import React, { Component } from 'react';
function Ul(props) {
  const uls = props.uls;
  const len = uls.length > 10 ? 10 : uls.length;
  const allUls = [];
  for (var i = 0; i < len; i++) {
    allUls.push(<ul key = { i } > <Li index= { i } ele = { uls[i].querySelector('div') } /> </ul>)
  }
  return <div className="resultTable"> { allUls } </div>;
}

function Li(props) {
  var splited = props.ele.querySelector("h3").innerText.split("/");
  var ownerName = splited[0];
  var projectName = splited[1];
  var description = props.ele.querySelector("p").innerText;
  var lastUpdated = props.ele.querySelector("relative-time").innerText;
  // relative-time
  var indexStyle = {
    w: {
      width: "20px",
    }
  };
  // debugger
  return (
    <span>
      <li style = { indexStyle.w }> { props.index + 1 } </li>
      <li> { projectName } </li>
      <li> { ownerName } </li>
      <li> { description } </li>
      <li> { lastUpdated } </li>
    </span>
  );
  // return <li> { projectName } </li><li> { ownerName } </li>;
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
