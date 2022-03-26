import React from "react";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callApiFS() {
        fetch("http://localhost:9000/getdatafs/", {
            method: "get",
            dataType: 'json',
        })
            // .then(res => res.text())
            // .then(res => this.setState({apiResponse: res}));
            .then((res) => res.json())
            .then((data) => {
                var dataList = [];
                var yList = [];
                var uList = [];
                var tsList = [];
                var tsMqttList = [];
                var stateList = [];

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    dataList.push(item);
                    yList.push(item.y);
                    uList.push(item.u);
                    tsList.push(item.timestamp);
                    tsMqttList.push(item.timestamp_mqtt);
                    stateList.push(item.state);
                }
                //console.log(data);
                this.setState({dataList})
                this.setState({yList})
                this.setState({uList})
                this.setState({tsList})
                this.setState({tsMqttList})
                this.setState({stateList})
                // console.log(this.state.dataList);
                // console.log(this.state.tsList);
                // console.log(this.state.tsMqttList);
                // console.log(this.state.yList);
                // console.log(this.state.uList);
                // console.log(this.state.stateList);

            })

    }

    callApiMS() {
        fetch("http://localhost:9000/getdatams/", {
            method: "get",
            dataType: 'json',
        })

            .then((res) => res.json())
            .then((data) => {
                var msList = [];

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    msList.push(item);
                }
                //console.log(data);
                this.setState({msList})
                console.log(this.state.msList);

            })

    }

    componentWillMount() {
        this.callApiFS();
        this.callApiMS();
    }

    render() {
        return (
            <div className="App">

                {/*logo*/}

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                {/*<div>{this.state.dataList?.map(value =>*/}
                {/*    <p>{value.y}</p>*/}
                {/*)}</div>*/}

                {/*table*/}
                <table className={"tabular"}>
                    <tbody>
                    <tr>
                        <th>Timestamp</th>
                        {this.state.tsList?.map(value =>
                            <td>{value.value.toString()}</td>
                        )}
                    </tr>
                    <tr>
                        <th>Timestamp MQTT</th>
                        {this.state.tsMqttList?.map(value =>
                            <td>{value.value.toString()}</td>
                        )}
                    </tr>
                    <tr>
                        <th>Ball position</th>
                        {this.state.yList?.map(value =>
                            <td>{value.toString()}</td>
                        )}
                    </tr>
                    <tr>
                        <th>Fan operating speed</th>
                        {this.state.uList?.map(value =>
                            <td>{value.toString()}</td>
                        )}
                    </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}

export default App;
