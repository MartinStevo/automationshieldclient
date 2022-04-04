import React, {useState, useEffect} from "react";
import './App.css';
import {Chart as ChartJS} from 'chart.js/auto'
import {Line} from "react-chartjs-2";

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {apiResponse: ""};
//     }

function App() {

    const [tsList, setTsList] = useState([]);
    const [yList, setYList] = useState([]);

    //callApiFS()
    const callApiFS = async () =>
    {
        fetch("http://localhost:9000/getdatafs/", {
            method: "get",
            dataType: 'json',
        })
            // .then(res => res.text())
            // .then(res => this.setState({apiResponse: res}));
            .then((res) => res.json())
            .then((data) => {
                var tempdataList = [];
                var tempyList = [];
                var tempuList = [];
                var temptsList = [];
                var temptsMqttList = [];
                var tempstateList = [];

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    tempdataList.push(item);
                    tempyList.push(item.y);
                    tempuList.push(item.u);
                    temptsList.push(item.timestamp.value.toString());
                    temptsMqttList.push(item.timestamp_mqtt.value.toString());
                    tempstateList.push(item.state);
                }
                //console.log(data);

                // this.setState({dataList})
                // this.setState({yList})
                // this.setState({uList})
                // this.setState({tsList})
                // this.setState({tsMqttList})
                // this.setState({stateList})

                setTsList(temptsList);
                setYList(tempyList);

                // console.log(this.state.dataList);
                // console.log(this.state.tsList);
                // console.log(this.state.tsMqttList);
                // console.log(this.state.yList);
                // console.log(this.state.uList);
                // console.log(this.state.stateList);

            })

    }

    //callApiMS()
    const callApiMS = async () =>
    {
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

    // componentWillMount() {
    //     this.callApiFS();
    //     this.callApiMS();
    // }
    useEffect(() => {
        callApiFS();
        //callApiMS();
    }, []);

    //render() {
    return (
        <div className="App">

            {/*logo*/}

            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*</header>*/}

            {/*position graph*/}

            <div className={"graph"}>
                <Line data={{
                    labels: tsList,
                    datasets: [
                        {
                            label: "First dataset",
                            data: yList,
                            fill: true,
                            lineTension: 0.18,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        }
                    ]
                }} type={"line"}/>
            </div>

            {/*<div>{this.state.dataList?.map(value =>*/}
            {/*    <p>{value.y}</p>*/}
            {/*)}</div>*/}

            {/*table*/}
            {/*<table className={"tabular"}>*/}
            {/*    <tbody>*/}
            {/*    <tr>*/}
            {/*        <th>Timestamp</th>*/}
            {/*        {this.state.tsList?.map(value =>*/}
            {/*            <td>{value}</td>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <th>Timestamp MQTT</th>*/}
            {/*        {this.state.tsMqttList?.map(value =>*/}
            {/*            <td>{value}</td>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <th>Ball position</th>*/}
            {/*        {this.state.yList?.map(value =>*/}
            {/*            <td>{value.toString()}</td>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <th>Fan operating speed</th>*/}
            {/*        {this.state.uList?.map(value =>*/}
            {/*            <td>{value.toString()}</td>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}


        </div>
    );
    //}
}

export default App;
