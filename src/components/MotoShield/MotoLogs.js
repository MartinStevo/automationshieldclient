import React, {useState, useEffect} from "react";
import '../../App.css';
import {Chart as ChartJS} from 'chart.js/auto'
import {Line} from "react-chartjs-2";

function MotoLogs() {

    const [dataList, setDataList] = useState([]);
    const [yList, setYList] = useState([]);
    const [uList, setUList] = useState([]);
    const [aList, setAList] = useState([]);
    const [vList, setVList] = useState([]);
    const [tsList, setTsList] = useState([]);
    const [tsMqttList, setTsMqttList] = useState([]);
    const [stateList, setStateList] = useState([]);

    const callApi = async () => {
        fetch("http://localhost:9000/getmotologs", {
            method: "get",
            dataType: 'json',
        })
            .then((res) => res.json())
            .then((data) => {

                console.log("here");
                console.log(data);

                var tempDataList = [];
                var tempYList = [];
                var tempUList = [];
                var tempAList = [];
                var tempVList = [];
                var tempTsList = [];
                var tempTsMqttList = [];
                var tempStateList = [];

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    tempDataList.push(item);
                    tempYList.push(item.y);
                    tempUList.push(item.u);
                    tempAList.push(item.a);
                    tempVList.push(item.v);
                    tempTsList.push(item.timestamp.value.toString());
                    tempTsMqttList.push(item.timestamp_mqtt.value.toString());
                    tempStateList.push(item.state);
                }

                setDataList(tempDataList);
                setYList(tempYList);
                setUList(tempUList);
                setAList(tempAList);
                setVList(tempVList);
                setTsList(tempTsList);
                setTsMqttList(tempTsMqttList);
                setStateList(tempStateList);

            })

    }

    useEffect(() => {
        callApi();
    }, []);

    const Table = () => (
        <table className={"tabular"}>
            <tbody>
            <tr>
                <th>Timestamp</th>
                {tsList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            <tr>
                <th>Timestamp MQTT</th>
                {tsMqttList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            <tr>
                <th>Voltage drop across a resistor</th>
                {yList?.map(value =>
                    <td>{value.toString()}</td>
                )}
            </tr>
            <tr>
                <th>Motor load</th>
                {uList?.map(value =>
                    <td>{value.toString()}</td>
                )}
            </tr>
            <tr>
                <th>Engine rpm </th>
                {aList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            <tr>
                <th>Motor speed </th>
                {vList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            </tbody>
        </table>
    )

    return (
        <div className="logs">
            <div className={"graph"}>
                <Line data={{
                    labels: tsList,
                    datasets: [
                        {
                            label: "motor speed",
                            data: vList,
                            fill: true,
                            lineTension: 0.18,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        }
                    ]
                }} type={"line"}/>
            </div>

            <div className={"graph"}>
                <Line data={{
                    labels: tsList,
                    datasets: [
                        {
                            label: "engine rpm",
                            data: aList,
                            fill: true,
                            lineTension: 0.18,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        }
                    ]
                }} type={"line"}/>
            </div>

            <br/><br/>
            <div className="table">
                <Table></Table>
            </div>
        </div>

    );
}

export default MotoLogs;
